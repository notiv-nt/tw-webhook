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
  res.send(
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/NuAKnbIr6TE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
  );
  console.dir(process.env);
});

app.post(':id', (req, res) => {
  const token = process.env.TELEGRAM_TOKEN;
  const chatId = req.params.id;

  const msg = encodeURIComponent(`Alert: ${req.body}`);

  console.log(`Send ${chatId}, msg`);

  axios.post(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${msg}`);
  res.send('ok');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// BOT
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, `Your webhook url: ${process.env.APP_URL}/${chatId}`);
});
