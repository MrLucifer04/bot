const { Events, Client, GuildMember } = require('discord.js');
const { loadCommands } = require("../../handlers/commandHandler");
const mongoose = require('mongoose');
const config = require('../../config.json');

module.exports = {
    name: Events.GuildMemberUpdate,
    on: true,

    /**
     * 
     * @param {GuildMember} oldMember
     * @param {GuildMember} newMember 
     * @param {Client} client 
     */
    async execute(oldMember, newMember, client) {
        const welcomeChannel = client.channels.cache.get('905381491964542990')
        if(oldMember.roles.cache.has('1066783335004782653') && !oldMember.roles.cache.has('905932078779080796') && newMember.roles.cache.has('905932078779080796')) {
            await welcomeChannel.sendTyping();
            setTimeout(async () => {
                await welcomeChannel.send(`<@${newMember.user.id}>`+ " **Welcome to __MTR__!**\nMake sure to read <#905383635396476948> | <#954110078703792268>\nType `!rules` to be sent a copy of the ranking rules.");
            }, 2000)
        }
    }
}