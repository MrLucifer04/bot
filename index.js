console.clear()

const { Client, Collection, Discord } = require("discord.js");
const {  token } = require("./config.json");
const { loadEvents } = require("./handlers/eventHandler");
module.exports = client = new Client({
    intents:
    [
        "Guilds",
        "GuildMessages",
        "MessageContent",
        "GuildMembers",
        "GuildMessageReactions",
        "DirectMessages",
        "GuildVoiceStates",
    ]
});

client.events = new Collection();
client.subCommands = new Collection();
client.commands = new Collection();

loadEvents(client);

client.login(token)