const Discord = require("discord.js")
const moment = require('moment')
const bot = new Discord.Client()
const log = console.log
require('dotenv').config()
const token = process.env.TOKEN
const fs = require("fs")

const getData = () => JSON.parse(fs.readFileSync("./emoji_data.json"))
const updateData = arr => {
    if (! Array.isArray(arr)) return;
    const data = getData()
    arr.map(val => {
        let time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        let emoji = data.find(v => v.emoji === val)
        if (emoji == null){
            data.push({
                emoji: val,
                count: 1,
                last_used: time
            })
            
        }else{
            emoji.count++
            emoji.last_used = time
        }
        
    })
    data.sort((a, b) => b.count - a.count)
    fs.writeFileSync('./emoji_data.json', JSON.stringify(data, null, 4))
}


bot.on("ready", () =>{
    log('Online')
    if(!fs.existsSync("emoji_data.json")){
        fs.writeFileSync("./emoji_data.json", JSON.stringify([], null, 4))
    }
})

bot.on("message", msg => {
    if (msg.author.id == 691156659376095264) return;
    const exp = /<:\w+:\d+>/g
    const matches = msg.content.match(exp)
    updateData(matches)
    if (msg.content === "emoji stats"){
        let data = getData().splice(0,9)
        let embed = new Discord.RichEmbed()
        .setTitle("TOP 10 EMOJIS")
        let emojis = []
        let counts = []
        let dates = []
        data.map(o => {
           emojis.push(o.emoji)
           counts.push(o.count)
           dates.push(o.last_used)
        })
        embed.addField("Emojis:", emojis.join("\n"), true)
        embed.addField("Counts:", counts.join("\n"), true)
        embed.addField("Last Used", dates.join("\n"), true)
        msg.channel.sendEmbed(embed)
    }
})

bot.login(token)