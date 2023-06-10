require('dotenv').config();

const fs = require('fs');
const http = require('http');
const https = require('https');

const { app } = require('./app');
const { bot } = require('./bot');

function main() {
  let httpServer = http.createServer(app).listen(80, () => console.log('HTTP Server running on port 80'));
  let httpsServer = null;

  if (process.env.NODE_ENV === 'production') {
    // https://itnext.io/node-express-letsencrypt-generate-a-free-ssl-certificate-and-run-an-https-server-in-5-minutes-a730fbe528ca
    const credentials = {
      key: fs.readFileSync(`/etc/letsencrypt/live/${process.env.APP_DOMAIN}/privkey.pem`, 'utf8'),
      cert: fs.readFileSync(`/etc/letsencrypt/live/${process.env.APP_DOMAIN}/cert.pem`, 'utf8'),
      ca: fs.readFileSync(`/etc/letsencrypt/live/${process.env.APP_DOMAIN}/chain.pem`, 'utf8'),
    };

    httpsServer = https.createServer(credentials, app);
    httpsServer.listen(443, () => console.log('HTTPS Server running on port 443'));
  }

  bot.launch();

  ['SIGINT', 'SIGTERM'].forEach((code) => {
    process.once(code, () => {
      bot.stop(code);
      httpServer?.close();
      httpsServer?.close();
    });
  });
}

main();
