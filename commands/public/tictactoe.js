const { ChatInputCommandInteraction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const tictactoe = require('discord-tictactoe');

module.exports = {
    name: "tictactoe",
    description: "Play a game of tictactoe!",
    options: [
        {
            name: "opponent",
            description: "Choose an opponent. Blank = bot",
            type: ApplicationCommandOptionType.User,
        },
    ],
    /**
    * @param {ChatInputCommandInteraction} interaction
    */
    
    async execute(interaction) {
    
        if(!interaction.channel.id === '1130522066429427833') return interaction.reply({content: "Use this command in <#1130522066429427833>.", ephemeral: true})


        const game = new tictactoe({language: 'en', commandOptionName: 'opponent', aiDifficulty: 'Hard'})
        game.handleInteraction(interaction)   

    }
}