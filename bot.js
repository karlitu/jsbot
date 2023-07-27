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
    let connection = null;
    let ok = null
    
    client.on("messageCreate", async msg => {
        let message = msg.content;
        if (message.startsWith('§')){
            message = message.substring(1);
            switch (message) {
                case "join":
                    console.log("joined");
                    const channel = msg.member.voice.channel;
                    connection = joinVoiceChannel({
                        channelId: channel.id,
                        guildId: channel.guild.id,
                        adapterCreator: channel.guild.voiceAdapterCreator,
                    });
                    ok = f.create_embed(0xff00ff, "VoiceConnection", "bot is connect")
                    msg.channel.send({ embeds: [ok] });
                    connection;
                    break;
                case "exit":
                    console.log("exit");
                    ok = f.create_embed(0xff00ff, "VoiceConnection", "bot is disconnect")
                    msg.channel.send({ embeds: [ok] });
                    connection.destroy();
                        break;
                default:
                    break;
            }    
        }
    });
})
