require('dotenv').config();

const http = require('http');
const express = require('express');
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const app = express();
const PORT = parseInt(process.env.PORT, 10) || 5100;

bot.start((ctx) => {
  ctx.reply(`Your webhook url:\nhttps://${process.env.APP_DOMAIN}/t/${ctx.chat.id}`);
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.text());
app.use(express.static('public'));

app.get('/t/:id', (req, res) => {
  res.send(`<script>document.write('Paste this url to the "Webhook URL" field: ' + location.href);</script>`);
});

app.post('/t/:id', (req, res) => {
  console.log(`Sending ${req.params.id}, ${req.body}`);
  bot.telegram.sendMessage(req.params.id, req.body).catch(console.log).then(console.log);
  res.send('ok');
});

function main() {
  const httpServer = http.createServer(app).listen(PORT, () => console.log(`HTTP Server running on port ${PORT}`));

  bot.launch();

  ['SIGINT', 'SIGTERM'].forEach((code) => {
    process.once(code, () => {
      bot.stop(code);
      httpServer?.close();
    });
  });
}

main();
