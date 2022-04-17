const TelegramApi = require('node-telegram-bot-api')
// tut krch zapros delayem na api

const token = '5365548668:AAGo8aVHHAdTNH5LlOgoO0cfD5TJ4BJhe5Q'
const {gameOption, againOption} = require('./options')
// tut dayem botu dalshe rulit 
const bot = new TelegramApi(token, {polling:true})

//analog baziy dannix ejji
const chats = {}

//  tut krch my delaem knopochki
// json toka prinimayetsya na buttons i stringify priobrozovivaet na knopopochki

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'загадываем число ты найди от 0 до 9')
    const num = Math.floor(Math.random()*10)
    chats[chatId] = num;
        return bot.sendMessage( chatId , " найдите число", gameOption)
        // tut krch zapros posle regena 
}

const start = ()=> {
// tut deystviya tipa 
bot.on ("message", async msg =>{
    const text = msg.text;
    const chatId = msg.chat.id;
 if (text === '/start'){

bot.setMyCommands([
{command: '/start', description: 'начальное приветсвие'},
{command: '/info', description: 'получить информацию  о пользовотеле'},
{command: '/game', description: 'давай поиграем'}


])

    // seychas stikery budem uzat ------------ chat id + link to sticker 
    await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/422/93d/42293d5f-7cd5-49f6-a8fd-939f71b06a83/8.jpg')
     return bot.sendMessage(chatId, `добро пожаловать в мой первый бот!`)
}
 if (text === '/info'){
 return   bot.sendMessage(chatId, `добро пожаловать ${msg.from.first_name}`)
}
if (text === '/about'){
   return bot.sendMessage(chatId, `твой юзернаме ${msg.from.username}`)
    
}
    // igra poshla -------- floor okruglyaet red bull okrilyaet)
    if (text  === '/game') {

        return startGame(chatId);



    //     await bot.sendMessage(chatId, 'загадываем число ты найди от 0 до 9')
    // const num = Math.floor(Math.random()*10)
    // chats[chatId] = num;
    //     return bot.sendMessage(chatId, " найдите число", gameOption)
    //     // tut krch zapros posle regena 


    //  skopirovana vverx potomu chto chotby zanovo nachat igru 
}

    return bot.sendMessage(chatId, 'еей чел я тебя не понимаю')

})
bot.on ('callback_query', async msg=> {
    const data = msg.data
    const chatId =msg.message.chat.id
    if (data === '/again') {
        return startGame(chatId);
    }
    if (data === chats[chatId]) {
        return bot.sendMessage(chatId, `поздравляю ты угадал правильно это ${chats[chatId]}`, againOption)
    }   else {
        return bot.sendMessage(chatId, `извини чел ты не угадал. Бот загадал ${chats[chatId]}`, againOption)
    }
})
}
start()