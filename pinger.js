const {Telegraf} = require('telegraf');
const cron = require('node-cron');

const bot = new Telegraf('5969450728:AAHbEVQ6YwLW7TycCYS6RPCaDTRGrBXMGrQ');

let users = []

bot.command('start',async (ctx) => {
  if (!users.includes(ctx.chat.id )) {
    users.push(ctx.chat.id)
    bot.telegram.sendMessage(ctx.chat.id, 'Registered to service.', {})
    console.log('Registered', ctx.chat.username)
    cron.schedule('*/15  * * * *', async () => {
      const data = await ping()
      if (!data) {
        console.log((new Date).toISOString())
        console.log(ctx.from)
        bot.telegram.sendMessage(ctx.chat.id, '🚨Alert, data is missing!!🚨', {})
      }
    });
  }
})

const ping = async () => {
  const data = await fetch('https://eshop.svetluska.cz/fotografie/max/oko-kabelove-4-2-0-5-2mm-3886202.jpg').then(response =>  response.headers.get("content-length") == 0)
  return String(data)
}

bot.command('stop',async (ctx) => {
  if (users.includes(ctx.chat.id )) {
    console.log('UnRegistered', ctx.chat.username)
    users = users.filter(it => it != ctx.chat.id)
    console.log('Users amount:', users.length)
    bot.telegram.sendMessage(ctx.chat.id, 'Succesfully unregistered', {})
  } else {
    bot.telegram.sendMessage(ctx.chat.id, 'Not registered.', {})
  }
})

bot.launch();