const { Client } = require("discord.js");
const ytdl = require("ytdl-core");
const ytSearch = require('yt-search');
const { createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const f = require("./funz.js");
const client = new Client({
    intents:[
        "Guilds",
        "GuildMessages",
        "DirectMessages",
        "GuildVoiceStates",
        "MessageContent",
    ]
});
const { token } = require('C:\\Users\\user\\OneDrive\\Documenti\\jsbot-main\\config.json');
const {
    prefix
} = require('./data.json')

let videoURL = null;

client.login(token)
client.on("ready", () => {
    console.log("online")
    client.on("messageCreate", async msg => {
        let message = msg.content;
        if (message.startsWith(prefix)){
            command = f.split_arg(message)
            console.log(command);
            switch (command[0]) {
                case "join":
                    connection = f.joins(msg);
                    connection;
                    break;
                case "exit":
                    console.log("exit");
                    f.exits(msg, connection);
                    break;

                case "test":
                    connection = f.joins(msg);
                    connection;
                    videoURL = 'https://www.youtube.com/watch?v=nCzFtdZpMu8';
                    ytdl.getInfo(videoURL).then(info => {
                        console.log('Titolo:', info.videoDetails.title);
                        console.log('Autore:', info.videoDetails.author.name);
                        console.log('Durata (secondi):', info.videoDetails.lengthSeconds);
                        
                        const stream = ytdl(videoURL, { filter: 'audioonly' });
                        const resource = createAudioResource(stream, { inlineVolume: true });
                        resource.volume.setVolume(3);
                        
                        const player = createAudioPlayer();
                        player.play(resource);
                        connection.subscribe(player);
                        
                    });
                    break;

                    case "play":
                        connection = f.joins(msg);
                        connection;
                        videoURL = command[1];
                        ytdl.getInfo(videoURL).then(info => {
                            console.log('Titolo:', info.videoDetails.title);
                            console.log('Autore:', info.videoDetails.author.name);
                            console.log('Durata (secondi):', info.videoDetails.lengthSeconds);
                        });
                        const stream = ytdl(videoURL, { filter: 'audioonly' });
                        const resource = createAudioResource(stream, { inlineVolume: true });
                        resource.volume.setVolume(3);
                        
                        const player = createAudioPlayer();
                        player.play(resource);
                        connection.subscribe(player);
                        break;

                default:
                    break;
            }
        }
    });
})
