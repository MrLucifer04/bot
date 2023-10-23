const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    name: "credits",
    description: "Displays bot developer credits",

    /**
    * @param {ChatInputCommandInteraction} interaction
    */
    
    async execute(interaction) {

            let profileEmbed = new EmbedBuilder()
            .setDescription("This bot is made by MrJ (<@827110358992289813>).")


            interaction.reply({ embeds: [profileEmbed], ephemeral: true})

    }
}