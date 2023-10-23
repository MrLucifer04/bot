const { ChatInputCommandInteraction, EmbedBuilder, Embed, ApplicationCommandOptionType, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: "log",
    description: "Log (...)",
    options: [
        {
            name: "type",
            description: "Your type of event.",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: "Training",
                    value: "training",
                },
                {
                    name: "Sparring Session",
                    value: "sparring",
                },
                {
                    name: "Flame",
                    value: "flame",
                }
            ],
        },
        {
            name: "message_link",
            description: "Link to event message (optional)",
            type: 3,
        }
    ],

    /**
    * @param {ChatInputCommandInteraction} interaction
    */
    
    async execute(interaction) {

        let eventType = interaction.options.get('type').value;
        let date = interaction.options.getString('date');
        let time = interaction.options.getString('time');
        let messageLink = interaction.options.getString('message_link')
        if(!messageLink) messageLink = "N/A"
        

        let showcaseEmbed = new EmbedBuilder()
        .setAuthor({ name: interaction.member.nickname || interaction.member.user.username, iconURL: interaction.member.displayAvatarURL() })
        .setColor("#ff0000")

        .addFields(
        { name: `Event Type`,  value: `${dict[eventType].name}`, inline: true})
        .setFooter({ text: `ID: ${interaction.member.user.id}`})
        
        await interaction.reply({ embeds: [showcaseEmbed], ephemeral: false, fetchReply: true})
        msg.react('<:MTR1:1118725128159760424>')
    }
}