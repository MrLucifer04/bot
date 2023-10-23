const { loadCommands } = require("../../handlers/commandHandler");
const mongoose = require('mongoose');
const config = require('../../config.json');

module.exports = {
    name: 'ready',
    once: true,

    async execute(client) {
        loadCommands(client)
        console.log(`${client.user.username} is online`)
        client.user.setPresence({
            status: 'dnd',
        })
        client.user.setActivity('NF', {type: 'LISTENING'})
        await mongoose.connect(config.mongodbURL, {
            autoIndex: false,
            useNewUrlParser: true,
        })

        if(mongoose.connect) {
            console.log('✅  Database Connected')
        }

    }
}