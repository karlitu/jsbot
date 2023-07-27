const {Client, Discord, MessageEmbed} = require("discord.js");
const f = require("./funz.js");
const ytdl = require("ytdl-core");
const { createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const{ Distube } = require("@discordjs/distube");

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
                    connection = f.joins(msg);
                    break;
                case "exit":
                    console.log("exit");
                    f.exits(msg);
                    break;
                case "test":
                    const videoURL = 'https://www.youtube.com/watch?v=kJQP7kiw5Fk';
                    // Ottenere informazioni sul video
                    ytdl.getInfo(videoURL).then(info => {
                        console.log('Titolo:', info.videoDetails.title);
                        console.log('Autore:', info.videoDetails.author.name);
                        console.log('Durata (secondi):', info.videoDetails.lengthSeconds);
                        
                        // Scaricare l'audio in qualsiasi formato
                        const audioFormat = ytdl.chooseFormat(info.formats, { filter: 'audioonly' });
                        const audioURL = audioFormat.url;
                        
                        const stream = ytdl(audioURL, { filter: 'audioonly' });
                        const player = createAudioPlayer();
                        const resource = createAudioResource(stream);
                        
                        
                        async function play(resource, player) {
                            await player.play(resource);
                            connection.subscribe(player);                            
                        }
                        
                       
                        play(stream, player);
                        
                    });
                    break;
                default:
                    break;
            }
        }
    });
})
