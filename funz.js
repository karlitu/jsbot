"use strict";
const {Client, Discord} = require("discord.js");
const {MessageEmbed} = require("discord.js");

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

module.exports = {
  create_embed: create_embed,
};