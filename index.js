const express = require('express');
const axios = require('axios');
const PORT = process.env.PORT || 5000;
const app = express();
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.get('*', (req, res) => {
  res.send('works');
  console.dir(process.env);
});

app.post('*', (req, res) => {
  const token = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const msg = encodeURIComponent(`Alert: ${req.body}`);

  axios.post(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${msg}`);
  res.send('ok');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// BOT
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, `Your webhook url: ${chatId}`);
});
