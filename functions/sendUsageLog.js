const { EmbedBuilder } = require('discord.js');
const { logChannelID } = require('../config.json');
const { verifyUserRoles } = require('./verifyUserRoles');


async function sendUsageLog(authr, targetUsr, commandUsed) {
    console.log(authr)

    let authorised = await verifyUserRoles(authr)

    let logEmbed = new EmbedBuilder()
    .setTitle("Point Command Used")
    .setDescription("Green = Allowed\nRed = Unauthorised")
    .setThumbnail(authr.user.displayAvatarURL())
    .setColor(authorised === true ? "Green" : "Red")
    .addFields(
        { name: 'Command User', value: `<@${authr.id}>`, inline: true},
        { name: 'Command Target', value: `<@${targetUsr.id || targetUsr}>`, inline: true},
        { name: "Command Used", value: commandUsed, inline: true}
    )

    await client.channels.cache.get(logChannelID).send({embeds: [logEmbed]})
}

module.exports = { sendUsageLog };