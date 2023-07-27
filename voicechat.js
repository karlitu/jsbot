const {Client, Discord} = require("discord.js");
const client = new Client({
    intents:[
        "GUILDS",
        "GUILD_MESSAGES",
        "DIRECT_MESSAGES"
    ]
});
const {
    prefix,
    token,
    test_id
} = require('./config.json');


const { joinVoiceChannel } = require('@discordjs/voice');

const connection = joinVoiceChannel({
	channelId: channel.id,
	guildId: channel.guild.id,
	adapterCreator: channel.guild.voiceAdapterCreator,
});



client.on("ready", () => {
    const channel = client.channels.get("mychannelid");
    if (!channel) return console.error("The channel does not exist!");
    channel.joinVoiceChannel().then(connection => {
      // Yay, it worked!
      console.log("Successfully connected.");
    }).catch(e => {
      // Oh no, it errored! Let's log it to console :)
      console.error(e);
    });
  });