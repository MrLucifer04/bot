const { UserContextMenuCommandInteraction, EmbedBuilder, Embed, ApplicationCommandType } = require('discord.js');
const config = require('../../config.json')
const moment = require('moment');

const { verifyUserRoles } = require('../../functions/verifyUserRoles');

module.exports = {
    name: "User Info",
    type: ApplicationCommandType.User,

    /**
    * @param {UserContextMenuCommandInteraction} interaction
    */
    
    async execute(interaction) {
        let authorised = verifyUserRoles(interaction.member)
        if(!authorised) return interaction.reply({content: "You are not allowed to use this command.", ephemeral: true})

        await interaction.deferReply({ephemeral: true})

        let trget = await interaction.guild.members.fetch(interaction.targetId)

        let userEmbed = new EmbedBuilder()
        .setAuthor({ name: trget.displayName || trget.user.username, iconURL: trget.displayAvatarURL() })
        .setThumbnail(trget.displayAvatarURL())
        .setColor("DarkButNotBlack")
        .setDescription("ID: `" + interaction.targetId + "`")
        .addFields(
            { name: "Username", value: trget.user.username, inline: true},
            { name: "Creation Date", value: `<t:${moment(trget.user.createdAt).format("X")}:D>`, inline: true},
            { name: "Join Date", value: `<t:${moment(trget.joinedAt).format("X")}:D>`, inline: true},
            {name: `Roles [${trget.roles.cache.size - 1}]`, value: trget.roles.cache.map(r => `${r}`).slice(0,-1).join(', '), inline: false})
        
        .setFooter({ text: `Command : User Info`})

        await interaction.followUp({ embeds: [userEmbed], ephemeral: true})
    }   
}