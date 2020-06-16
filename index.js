const express = require('express');
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
  console.log(req.body);
  res.send('ok');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
