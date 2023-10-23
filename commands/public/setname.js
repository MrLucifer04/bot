const { ChatInputCommandInteraction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const tictactoe = require('discord-tictactoe');

module.exports = {
    name: "setname",
    description: "Use this to change your username",
    options: [
        {
            name: "name",
            description: "Roblox Name | Timezone",
            type: ApplicationCommandOptionType.String,
        },
    ],
    /**
    * @param {ChatInputCommandInteraction} interaction
    */
    
    async execute(interaction) {

        let newName = interaction.options.getString('name', true);

        try {

        await interaction.member.setNickname(newName, `User Request | Nickname changed from ${interaction.member.displayName || interaction.member.user.username}`)
        await interaction.reply({content: `Nickname was changed to \`${newName}\` from \`${interaction.member.nickname || interaction.member.user.username}`, ephemeral: true} )
        } catch(err) { interaction.reply({content: "Missing Permission", ephemeral: true} )};


    }
}