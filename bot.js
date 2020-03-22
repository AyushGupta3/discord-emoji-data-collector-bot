const Discord = require("discord.js")
const bot = new Discord.Client()
const log = console.log
const token = ''
const fs = require("fs")

const getData = () => JSON.parse(fs.readFileSync("./emoji_data.json"))

bot.on("ready", () =>{
    log('Online')
    if(!fs.existsSync("emoji_data.json")){
        fs.writeFileSync("./emoji_data.json", JSON.stringify({}))
    }
})

bot.on("message", msg => {
    
})

bot.login(token)