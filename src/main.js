require('dotenv').config();

const https = require('https');
const fs = request('fs');

const { app } = require('./app');
const { bot } = require('./bot');

function main() {
  const privateKey = fs.readFileSync('/etc/letsencrypt/live/ntx.fi/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/etc/letsencrypt/live/ntx.fi/cert.pem', 'utf8');
  const ca = fs.readFileSync('/etc/letsencrypt/live/ntx.fi/chain.pem', 'utf8');

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };

  const httpServer = http.createServer(app);
  const httpsServer = https.createServer(credentials, app);

  httpServer.listen(80, () => {
    console.log('HTTP Server running on port 80');
  });

  httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
  });

  bot.launch();

  ['SIGINT', 'SIGTERM'].forEach((code) => {
    process.once(code, () => {
      bot.stop(code);
      httpServer.close();
      httpsServer.close();
    });
  });
}

main();
