const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { showcaseChannelID } = require('../../config.json')
const fs = require('fs');
const setupModel = require('../../Schemas/freshSchema');
const { verifyUserRoles } = require('../../functions/verifyUserRoles');

module.exports = {
    name: "setup",
    description: "Initializes point log.",

    /**
    * @param {ChatInputCommandInteraction} interaction
    */
    
    async execute(interaction) {

        //let authorised = await verifyUserRoles(interaction.member)
        //if(!authorised) return interaction.reply({content: "You do not have permission to use this command.", ephemeral: true})

        interaction.deferReply({ephemeral: true})

        let guildId = '905381491964542987'
        await client.guilds.cache.get('905381491964542987').members.fetch();

        let overseers = client.guilds.cache.get(guildId).roles.cache.get('905383756083372033');
        let seniorofficers = client.guilds.cache.get(guildId).roles.cache.get('926828526873751572')
        let officers = client.guilds.cache.get(guildId).roles.cache.get('905383835422826566');
        let instructors = client.guilds.cache.get(guildId).roles.cache.get('906340269031579678');
        let graduates = client.guildId.cache.get(guildId).roles.cache.get('905383864053137478');
        let students = client.guilds.cache.get(guildId).roles.cache.get('905932078779080796');


        let week = fs.readFileSync(require.resolve('./week.txt'), {'encoding': 'utf-8'})
        console.log(week)
        week = parseInt(week)

        fs.writeFileSync(require.resolve('./week.txt'), (week += 1).toString()), {'encoding': 'utf-8'};

        let pointEmbed = new EmbedBuilder()
        .setTitle("Week " + fs.readFileSync(require.resolve('./week.txt'), {"encoding": 'utf-8'}).toString())
        .setDescription('Data is updated when new logs are submitted')
        .addFields({ name: 'User', value: '0', inline: true}, { name: 'Attended', value: '0', inline: true})

        pointEmbed.data.fields[0].value = ''
        pointEmbed.data.fields[1].value = ''

        await setupModel.deleteMany() 

        await Promise.all(students.members.map(async m => {
            let userDoc = await setupModel.create({
                userID: m.user.id,
                attended: 0
            });
            await userDoc.save();
        }))
        await Promise.all(graduates.members.map(async m => {
            let userDoc = await setupModel.create({
                userID: m.user.id,
                attended: 0
            });
            await userDoc.save();
        }))
        await Promise.all(officers.members.map(async m => {
            let userDoc = await setupModel.create({
                userID: m.user.id,
                attended: 0
            });
            await userDoc.save();
        }))
        await Promise.all(seniorofficers.members.map(async m => {
            let userDoc = await setupModel.create({
                userID: m.user.id,
                attended: 0
            });
            await userDoc.save();
        }))
        await Promise.all(overseers.members.map(async m => {
            let userDoc = await setupModel.create({
                userID: m.user.id,
                attended: 0
            });
            await userDoc.save();
        }))


        for await (const doc of setupModel.find()) {
            pointEmbed.data.fields[0].value += `\n<@${doc.userID}>`
            pointEmbed.data.fields[1].value += `\n${doc.attended}`
        }

        await client.channels.cache.get(showcaseChannelID).send({embeds: [pointEmbed],  content: `@everyone\n`})
        .then(async (msg) => {
            await msg.react('✔')
            fs.writeFileSync(require.resolve('./msg.txt'), msg.id, {'encoding': 'utf-8'});
            console.log(msg.id)
        })

        interaction.editReply({content: "New log sent.", ephemeral: true})
    }
}