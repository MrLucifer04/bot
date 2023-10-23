const ascii = require('ascii-table')
const { loadFiles } = require('../functions/fileLoader');

async function loadCommands(client) {
    console.time("Commands Loaded")

    const cmdArray = new Array();

    await client.commands.clear();
    await client.subCommands.clear();

    let commandsArray = [];

    const Files = await loadFiles("commands");

    Files.forEach((file) => {
        const command = require(file);

        if(command.subCommands)
        return client.subCommands.set(command.subCommand, command);
        
        
        
        client.commands.set(command.name, command);

        commandsArray.push(command);

        cmdArray.push({ Command: command.name, Status: "✅"})
        if(!command.name) 
        return cmdArray.push({ Command: command.name, Status: "❎"})
    })

    client.application.commands.set(commandsArray);

    console.table(cmdArray, ["Command", "Status"])
    console.info("\n\x1b[36m%s\x1b[0m", "Loaded Commands");
    console.timeEnd("Commands Loaded");
}

module.exports = { loadCommands };