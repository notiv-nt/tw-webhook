const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.start((ctx) => {
  const chatId = ctx.chat.id;
  ctx.reply(`Your webhook url:\n${process.env.APP_URL}/${chatId}`);
});

module.exports = {
  bot,
};
