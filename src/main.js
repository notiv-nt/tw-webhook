require('dotenv').config();

const { app } = require('./app');
const { bot } = require('./bot');

function main() {
  const PORT = process.env.PORT || 5000;

  const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  bot.launch();

  ['SIGINT', 'SIGTERM'].forEach((code) => {
    process.once(code, () => {
      bot.stop(code);
      server.close();
    });
  });
}

main();
