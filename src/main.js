require('dotenv').config();

const { app } = require('./app');
const { bot } = require('./bot');

function main() {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  bot.launch();
}

main();
