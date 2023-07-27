const {Client, Discord} = require("discord.js");
const {MessageEmbed} = require("discord.js");
const f = require("./funz.js");
const client = new Client({
    intents:[
        "GUILDS",
        "GUILD_MESSAGES",
        "DIRECT_MESSAGES"
    ]
});
const {
    token,
} = require('./config.json');
const { 
    joinVoiceChannel,
} = require('@discordjs/voice');


client.login(token)
client.on("ready", () => {
    console.log("online") 
    
    client.on("messageCreate", async msg => {
        let message = msg.content;
        if (message.startsWith('§')){
            command = f.split_arg(message)
            console.log(command);
            switch (command[0]) {
                case "join":
                    console.log("joins");
                    f.joins(msg);
                    break;
                case "exit":
                    console.log("exit");
                    f.exits(msg);
                    break;
                default:
                    break;
            }
        }
    });
})
