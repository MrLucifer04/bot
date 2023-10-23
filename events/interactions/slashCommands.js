const { Client, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
    name: "interactionCreate",
    /**
     * @param {ChatInputCommandInteraction} interaction 
     */

    execute(interaction, client) {
        if(!interaction.isChatInputCommand() && !interaction.isMessageContextMenuCommand() && !interaction.isUserContextMenuCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if(!command) return interaction.reply({ content: "Command outdated or invalid.", ephemeral: true });

        
        if(command.developer && interaction.user.id !== '827110358992289813')
        return interaction.reply({ content: "This command is developer-only.", ephemeralL: true });


        command.execute(interaction, client)
    }
}