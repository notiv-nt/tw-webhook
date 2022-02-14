const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.text());

app.get('*', (req, res) => {
  res.send(`<iframe width="560" height="315" src="https://www.youtube.com/embed/NuAKnbIr6TE" frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
});

app.post('/:id', (req, res) => {
  const token = process.env.TELEGRAM_TOKEN;
  const chatId = req.params.id;

  const msg = encodeURIComponent(`Alert: ${req.body}`);

  console.log(`Send ${chatId}, ${msg}`);

  axios.post(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${msg}`);
  res.send('ok');
});

module.exports = {
  app,
};
