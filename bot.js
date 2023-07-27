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
    
    client.on("messageCreate", async msg => {
        if (msg.content.startsWith('§')){
            
            if (msg.content.endsWith("join")){
                console.log("joined");
                const channel = msg.member.voice.channel;
                console.log(channel.id);
                connection = joinVoiceChannel({
                    channelId: channel.id,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator,
                });
                const ok = f.create_embed(0xff00ff, "VoiceConnection", "bot is connect")
                msg.channel.send({ embeds: [ok] });
                connection;
            };
            if (msg.content.endsWith("exit")){
                console.log("exit");
                const ok = f.create_embed(0xff00ff, "VoiceConnection", "bot is disconnect")
                msg.channel.send({ embeds: [ok] });
                connection.destroy();
            }

        }
    });
});
