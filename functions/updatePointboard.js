const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const { showcaseChannelID } = require('../config.json')
const setupModel = require('../Schemas/freshSchema');

async function updatePointLog() {
    try {
        
        let pointLogEmbed = await client.channels.cache.get(showcaseChannelID).messages.fetch(fs.readFileSync(require.resolve('../commands/moderation/msg.txt'), {'encoding': 'utf-8'}))
        if(!pointLogEmbed) return new error("No point log embed detected");
        
        let newPointEmbed = new EmbedBuilder()
        .setTitle("Week " + fs.readFileSync(require.resolve('../commands/moderation/week.txt'), {"encoding": 'utf-8'}).toString())
        .setDescription('Points are going to be updated every time you attend something')
        .addFields(
        { name: 'User', value: '0', inline: true},
        { name: 'Points', value: '0', inline: true})
        
        newPointEmbed.data.fields[0].value = ''
        newPointEmbed.data.fields[1].value = ''

        for await (const doc of setupModel.find()) {
            newPointEmbed.data.fields[0].value += `\n<@${doc.userID}>`
            newPointEmbed.data.fields[1].value += `\n${doc.points}`
        }
        newPointEmbed.data.fields[0].name = "User - " + await setupModel.countDocuments({})

        await pointLogEmbed.edit({embeds: [newPointEmbed]})
    
    } catch(error) {
        console.log(`- ⚠ Error updating point display embed -\n${error}`)
        throw error;
    }
}

module.exports = { updatePointLog };