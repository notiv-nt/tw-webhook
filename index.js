const express = require('express');
const axios = require('axios');
const PORT = process.env.PORT || 5000;
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.get('*', (req, res) => {
  res.send('works');
});

app.post('*', (req, res) => {
  const token = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  axios.post(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(req.body)}`);
  res.send('ok');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
