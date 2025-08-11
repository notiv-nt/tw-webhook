import 'dotenv/config';
import http from 'http';
import express from 'express';
import cors from 'cors';
import { Telegraf } from 'telegraf';
import path from 'path';

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 5100;
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.start((ctx) => {
  ctx.reply(`Your webhook url:\nhttps://${process.env.APP_DOMAIN}/t/${ctx.chat.id}`);
});

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.text());
app.use(express.static(path.resolve('./public')));

app.get('/proxy', async (req, res) => {
  res.send(await fetch(decodeURIComponent(req.query.url)).then((r) => r.text()));
});

app.get('/t/:id', (req, res) => {
  res.send(`<script>document.write('Paste this url to the "Webhook URL" field: ' + location.href);</script>`);
});

app.post('/t/:id', (req, res) => {
  console.log(`Sending ${req.params.id}, ${req.body}`);
  bot.telegram.sendMessage(req.params.id, req.body).catch(console.log).then(console.log);
  res.send('ok');
});

const orders = {
  /* [any_key]: any[] */
};
app.get('/o/:path(*)', (req, res) => res.json(orders[req.params.path] || []));
app.post('/o/:path(*)', (req, res) => {
  orders[req.params.path] = req.body;
  return res.json(null);
});

app.all('/log', (req, res) => {
  console.log(req.headers);
  console.log(JSON.stringify(req.body));
  return res.json(null);
});
app.get('*', (req, res) => res.send(new Date().toString()));

function main() {
  const httpServer = http.createServer(app).listen(PORT, () => console.log(`HTTP Server running on port ${PORT}`));

  if (process.env.TELEGRAM_TOKEN) {
    bot.launch();
  } else {
    console.log('TELEGRAM_TOKEN is not set');
  }

  ['SIGINT', 'SIGTERM'].forEach((code) => {
    process.once(code, () => {
      httpServer?.close();
      bot.stop(code);
    });
  });
}

main();
