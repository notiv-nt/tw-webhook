require('dotenv').config();

const https = require('https');
const fs = request('fs');

const { app } = require('./app');
const { bot } = require('./bot');

function main() {
  const PORT = parseInt(process.env.PORT, 10) || 5000;

  let server;

  if (port === 443) {
    server = https
      .createServer({ key: fs.readFileSync('./key.pem'), cert: fs.readFileSync('./cert.pem') }, app)
      .listen(PORT, () => console.log(`Listening on ${PORT}`));
  } else {
    server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  }

  bot.launch();

  ['SIGINT', 'SIGTERM'].forEach((code) => {
    process.once(code, () => {
      bot.stop(code);
      server.close();
    });
  });
}

main();
