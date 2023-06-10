const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.start((ctx) => {
  const chatId = ctx.chat.id;
  ctx.reply(`Your webhook url:\nhttps://${process.env.APP_DOMAIN}/t/${chatId}`);
});

module.exports = {
  bot,
};
