const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.start((ctx) => {
  console.dir(ctx);
  // const chatId = msg.chat.id;
  // // send back the matched "whatever" to the chat
  // bot.sendMessage(chatId, `Your webhook url:\n ${process.env.APP_URL}/${chatId}`);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

module.exports = {
  bot,
};
