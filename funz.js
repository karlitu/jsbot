"use strict";
const {Client, Discord} = require("discord.js");
const {MessageEmbed} = require("discord.js");
let connection = null;
let ok = null;

const { 
    joinVoiceChannel,
} = require('@discordjs/voice');


function create_embed(color, title, description) {
    const emb = new MessageEmbed()
    .setColor(color)
    .setTitle(title)
    .setDescription(description)
    .setAuthor(
        {
            name: "puttane",
            iconURL: "https://cdn.discordapp.com/attachments/1073986264983937145/1117875655141498961/letter_p.png",
        }
    )
    .setFooter(
        {
            text: "developoed by puttane",
            iconURL: "https://cdn.discordapp.com/attachments/1073986264983937145/1117876395369041941/letter_p.gif"
        }
    )
  return emb;
}

function joins(message) {
    const channel = message.member.voice.channel;
    connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });
    connection;
    ok = create_embed(0xff00ff, "VoiceConnection", "bot is connect")
    message.channel.send({ embeds: [ok] });

    return connection;
}

function exits(message) {
    ok = create_embed(0xff00ff, "VoiceConnection", "bot is disconnect")
    message.channel.send({ embeds: [ok] });
    connection.destroy();
}

function split_arg(message) {
    message = message.substring(1);
    const args = message.trim().split(/ +/);
    return args
}

module.exports = {
  create_embed: create_embed,
  joins: joins,
  exits: exits,
  split_arg: split_arg,
};