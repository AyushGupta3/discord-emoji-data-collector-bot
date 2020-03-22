const Discord = require("discord.js")
const bot = new Discord.Client()
const log = console.log
const token = ''
const fs = require("fs")

const getData = () => JSON.parse(fs.readFileSync("./emoji_data.json"))
const updateData = arr => {
    if (! Array.isArray(arr)) return;
    const data = getData()
    arr.map(val => {
        if (!(val in data)){
            data[val] = 1;
        }
        else {
            data[val]++
        }
    })
    fs.writeFileSync('./emoji_data.json', JSON.stringify(data, null, 4))
}


bot.on("ready", () =>{
    log('Online')
    if(!fs.existsSync("emoji_data.json")){
        fs.writeFileSync("./emoji_data.json", JSON.stringify({}, null, 4))
    }
})

bot.on("message", msg => {
    const exp = /<:\w+:\d+>/g
    const matches = msg.content.match(exp)
    updateData(matches)
    if (msg.content === "emoji stats"){
        msg.channel.send(JSON.stringify(getData(), null, 4))
    }
})

bot.login(token)