require('dotenv').config();

const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const app = express();

bot.start((ctx) => {
  ctx.reply(`Your webhook url:\nhttps://${process.env.APP_DOMAIN}/t/${ctx.chat.id}`);
});

// bot.inlineQuery('print', (ctx) => { console.dir(ctx) })

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.text());
app.use(express.static('public'));

app.get('/t/:id', (req, res) => {
  res.send(`<script>document.write('Paste this url to the "Webhook URL" field: ' + location.href);</script>`);
});

// app.get('*', (req, res) => {
//   res.send(`<iframe width="560" height="315" src="https://www.youtube.com/embed/NuAKnbIr6TE" frameborder="0"
//     allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
// });

app.post('/t/:id', (req, res) => {
  console.log(`Sending ${req.params.id}, ${req.body}`);
  bot.telegram.sendMessage(req.params.id, req.body).catch(console.log).then(console.log);
  res.send('ok');
});

function main() {
  const PORT = parseInt(process.env.PORT, 10) || 5100;

  let httpServer = http.createServer(app).listen(PORT, () => console.log(`HTTP Server running on port ${PORT}`));
  let httpsServer = null;

  if (process.env.NODE_ENV === 'production') {
    try {
      // https://itnext.io/node-express-letsencrypt-generate-a-free-ssl-certificate-and-run-an-https-server-in-5-minutes-a730fbe528ca
      const credentials = {
        key: fs.readFileSync(`/etc/letsencrypt/live/${process.env.APP_DOMAIN}/privkey.pem`, 'utf8'),
        cert: fs.readFileSync(`/etc/letsencrypt/live/${process.env.APP_DOMAIN}/cert.pem`, 'utf8'),
        ca: fs.readFileSync(`/etc/letsencrypt/live/${process.env.APP_DOMAIN}/chain.pem`, 'utf8'),
      };

      httpsServer = https.createServer(credentials, app);
      httpsServer.listen(443, () => console.log('HTTPS Server running on port 443'));
    } catch (e) {
      if (e.code === 'ENOENT') {
        console.error('No certificate found, skipping HTTPS server');
      }
    }
  }

  bot.launch();

  ['SIGINT', 'SIGTERM'].forEach((code) => {
    process.once(code, () => {
      bot.stop(code);
      httpServer?.close();
      httpsServer?.close();
    });
  });
}

main();
