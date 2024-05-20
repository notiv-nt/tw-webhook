import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.start((ctx) => {
  ctx.reply(`Your webhook url:\nhttps://${process.env.APP_DOMAIN}/t/${ctx.chat.id}`);
});

export default bot;
