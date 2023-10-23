const { Client, Message, EmbedBuilder, Collection, PermissionsBitField } = require("discord.js");
const noblox = require('noblox.js');
const {DateTime } = require('luxon');
const { inspect } = require("util");
const fs = require('fs').promises;

module.exports = {
    name: "messageCreate",
    /**
     * @param {Client} client
     * @param {Message} message
     */

    async execute(message, client) {
        if(message.content.toLowerCase().includes("welcome") && message.content.includes("MTR") && !message.author.bot)  {
            await message.channel.sendTyping()
            setTimeout(() => {
                return message.channel.send(`${message.mentions.users.map(mention => `<@${mention.id}>`).join(" ")} **Welcome to MTR!**\nMake sure to read <#905383635396476948> | <#954110078703792268>\n` + "Type `!rules` to be sent a copy of the ranking rules.");
            }, 2000)
        };
        if(message.author.bot) return;

        let wl = ["827110358992289813", "206647119824683009","346689043741802499"]

        if(wl.includes((message.author.id).toString()) && message.content.toLowerCase() == "shutdown") {
            await message.channel.send("`Shutting down...`")
            process.exit();
        }

        let prefix = "!";
        const args = message.content.slice(1).split(" ");
        const command = args[0].toLowerCase()

        if(!message.content.startsWith(prefix)) return;
        

        if(command === `rules`) {
            let ruleEmbed = new EmbedBuilder()
            .setTitle("Ranking Rules & Guidelines")
            .setColor("White")
            .setDescription("Firstly, you must address our Emperor as 'My Emperor' or 'Emperor'\n\nYou must address Princes as 'My Prince' or 'Prince'.\nFor Princesses, refer to them as 'My Princess' or 'Princess'.\n\nAlso, you must always address HR's properly depending on their rank.\nCaptains being 'Sir' or 'Ma'am' depending on gender and Generals being referred to as just 'General'.\n\n You are not allowed to attack any members ranking in either Flame (Private+) or Wind (Pupil+). We are neutral with Wind.\nBreaking this rule will result in demotion to 'Citizen.'\n\nIn case you are attacked by the aforementioned ranks, you must provide record it and send it to a Flame HR (Captain+).\n\nRock and Liquid rankers are KOS (Kill on Sight), this means no teaming with them or attending their events. Kill them.\n\nIf you are caught teaming with Rock or Liquid rankers, you will be demoted to 'Citizen.'\n\nYou must not join any unofficial Elemental Adventure groups.\nIf caught, you will be demoted to 'Citizen.'\n\nYou must not 'double rank' (rank in 2 nations or more). This will also lead to a demotion in both nations.\n\nWhen a HR (Captain+) is in your server, you must report to them for duty. Drop what you were previously doing.\n\nYou are NOT allowed to change your uniform unless you leave the Flame Empire. You also cannot receive the rank of Corporal without a helmet.\n\nLastly, failure to be in any Fleet or Division when you are promoted to Soldier+ will result in a demotion back to 'Citizen.'\n\n**HAVE FUN!**")
            
            try {
            return await message.author.send({embeds: [ruleEmbed]})
            } catch(err) { message.channel.reply("❌ Are your DMs off?")}
        }

        if(command === `eval`) {
            if(!message.author.id === '827110358992289813') return;
            const code = args.join(" ").slice(command.length);
            if(!code) return message.reply("Provide code.");
            console.log(code)
            try {
                const result = await eval('async () => ' + code)()
                let output = result;

                if(typeof result !== 'string') {
                    output = inspect(result)
                }
            } catch (error) {
                message.reply("Error evaluating ", error)
            }
        }

        if(command === `purge`) {
            if(!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages, true)) return message.reply("You do not have permission.")
            if(!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply("I do not have permission.")
            let purgeAmt = parseInt(args[1])
            purgeAmt = purgeAmt + 1;

            if(!message.deletable) return message.channel.send("I do not have perms to delete messages.\n`Permission: Manage_Messages`");
            message.channel.bulkDelete(purgeAmt)
        }


        //                      FireLord,               Prince,                  Rvy,               Overseers,         Senior Officer,           Offier,             Instructor            Elite Guard
        let ignoreRoles = ['955494078697603083', '1053088358676566036', '905434154693460018', '905383756083372033', '926828526873751572', '905383835422826566', '906340269031579678', '1134133414287650936']
        
        if(command === `transfers`) {
            if(!message.member.roles.cache.has('905383756083372033') && !message.member.roles.cache.has('905434154693460018') && message.author.id !== '827110358992289813') return await message.channel.reply("You are not allowed to use this command.");

            let fleetEmbed = new EmbedBuilder()
            fleetEmbed.setTitle("Current Fleet Transfers")
            fleetEmbed.setColor("DarkButNotBlack")

            await client.guilds.cache.get('905381491964542987').members.fetch()

            let MTR = client.guilds.cache.get('905381491964542987').roles.cache.get('1131702552719794237')
            let NF = client.guilds.cache.get('905381491964542987').roles.cache.get('1118526254400933930')
            let WHF = client.guilds.cache.get('905381491964542987').roles.cache.get('1118526225544118282')
            let EHF = client.guilds.cache.get('905381491964542987').roles.cache.get('1118526168543527044')
            let SRF = client.guilds.cache.get('905381491964542987').roles.cache.get('1118525888045269002')
            let SOF = client.guilds.cache.get('905381491964542987').roles.cache.get('1124744467639959733')
            let unassigned = client.guilds.cache.get('905381491964542987').roles.cache.get('1136458242919252128')

            
            fleetEmbed.addFields(
                { name: `**MTR - ${(await checkRoles()).length}}**`, value: (await checkRoles()).map(uID => `<@${uID}>`).join(`\n- `), inline: true},
                { name: `**SOF - ${SOF.members.size}**`, value: SOF.members.size >=1 ? SOF.members.map(m => `<@${m.user.id}>`).join(`\n- `) : "[None]", inline: true},
                { name: `**WHF - ${WHF.members.size}**`, value: WHF.members.size >=1 ? WHF.members.map(m => `<@${m.user.id}>`).join(`\n- `) : "[None]", inline: true},
                { name: `**NF - ${NF.members.size}**`, value: NF.members.size >=1 ? NF.members.map(m => `<@${m.user.id}>`).join(`\n- `) : "[None]", inline: true},
                { name: `**EHF - ${EHF.members.size}**`, value: EHF.members.size >=1 ? EHF.members.map(m => `<@${m.user.id}>`).join(`\n- `) : "[None]", inline: true},
                { name: `**SRF - ${SRF.members.size}**`, value: SRF.members.size >=1 ? SRF.members.map(m => `<@${m.user.id}>`).join(`\n- `) : "[None]", inline: true},
                { name: `**Unassigned - ${unassigned.members.size}**`, value: unassigned.members.size >=1 ? unassigned.members.map(m => `<@${m.user.id}>`).join('    ') : "[None]", inline: false},
            )

            async function checkRoles() { 
                let verifiedUsers = []
                MTR.members.filter(member => {
                    /*for each member: */
                    if(!member.roles.cache.some(role => ignoreRoles.includes(role.id))) {
                        verifiedUsers.push(member.user.id)
                    }

                })
                return verifiedUsers;
            }
            await message.channel.send({embeds: [fleetEmbed] })
        }


        if(command === `list`) {
            const requiredRoles = ['905434154693460018', '905383756083372033', '926828526873751572']
            if (!requiredRoles.some(roleID => message.member.roles.cache.has(roleID)) && message.author.id !== '827110358992289813') {
                return;
            }

            const ehfMembers = require.resolve('../../fleetmembers/ehf.json');
            const nfMembers = require.resolve('../../fleetmembers/nf.json');
            const sofMembers = require.resolve('../../fleetmembers/sof.json');
            const srfMembers = require.resolve('../../fleetmembers/srf.json');
            const whfMembers = require.resolve('../../fleetmembers/whf.json');

            if(!args[1]) return message.reply({content: "`Please specify a Fleet or Division.`\n`ALL MTR EHF NF SOF, SRF WHF`"});
            switch(args[1].toLowerCase()) {
                case 'mtr':
                    listMtr();
                    break;
                case 'ehf':
                    listEhf();
                    break;
                case 'nf':
                    listNf();
                    break;
                case 'sof':
                    listSof();
                    break;
                case 'srf':
                    listSrf();
                    break;
                case 'whf':
                    listWhf();
                    break;
                case 'all':
                    listAll();
                    break;
                default:
                    return message.reply({content: "`Please specify a Fleet or Division.`\n`ALL MTR EHF NF SOF, SRF WHF`"});
            }



            async function listMtr() {
            await client.guilds.cache.get('905381491964542987').members.fetch();
            const gld = await client.guilds.cache.get('905381491964542987').fetch();

            const general = gld.roles.cache.get('905434154693460018');
            const overseers = gld.roles.cache.get('905383756083372033');
            const seniors = gld.roles.cache.get('926828526873751572');
            const officers = gld.roles.cache.get('905383835422826566');
            const instructors = gld.roles.cache.get('906340269031579678');
            const graduates = gld.roles.cache.get('905383864053137478');
            const students = gld.roles.cache.get('905932078779080796');
            
            let totalMembers = general.members.size + overseers.members.size + seniors.members.size + officers.members.size
            + instructors.members.size + graduates.members.size + students.members.size;

            let mtrEmbed = new EmbedBuilder()
            .setDescription(`**Total MTR Members** - ${totalMembers}`)
            .setColor("DarkButNotBlack")
            .setThumbnail("https://cdn.discordapp.com/emojis/1118725128159760424.webp?size=96&quality=lossless")
            .addFields(
                {name: "Division Overseer", value: general.members.size >= 1 ? general.members.map(m => `<@${m.user.id}>`).join("\n") : "[None]", inline: true},
                {name: "Overseers", value: overseers.members.size >= 1 ? overseers.members.map(m => `<@${m.user.id}>`).join("\n") : "[None]", inline: true},
                {name: "Senior Officers", value: seniors.members.size >= 1 ? seniors.members.map(m => `<@${m.user.id}>`).join("\n") : "[None]", inline: true},
                {name: "Officers", value: officers.members.size >= 1 ? officers.members.map(m => `<@${m.user.id}>`).join("\n") : "[None]", inline: true},
                {name: "Instructors", value: instructors.members.size >= 1 ? instructors.members.map(m => `<@${m.user.id}>`).join("\n") : "[None]", inline: true},
                {name: "Graduates", value: graduates.members.size >= 1 ? graduates.members.map(m => `<@${m.user.id}>`).join("\n") : "[None]", inline: true},
                {name: `Students - ${students.members.size}`, value: students.members.size >= 1 ? students.members.map(m => `<@${m.user.id}>`).join("  ") : "[None]", inline: true}
            )
            await message.reply({ embeds: [mtrEmbed] });
            console.log("[Listed MTR]")
        }

            async function listEhf() { 
                const data = await fs.readFile(ehfMembers, 'utf-8');
                const jsonData = JSON.parse(data)

                const ehfEmbed = new EmbedBuilder()
                .setDescription(`**Eastern Hemisphere Fleet** - ${jsonData.members.length + jsonData.hrs.length}`)
                .setColor("DarkButNotBlack")
                .setThumbnail("https://cdn.discordapp.com/emojis/1016128981914886234.webp?size=96&quality=lossless")
                .addFields(
                    {name: "HRs", value: jsonData.hrs.map(hr => "`"+hr+"`").join(" ")},
                    {name: `Members - ${jsonData.members.length}`, value: jsonData.members.map(member => "`"+member+"`").join("\n- ")}
                )
                await message.channel.send({embeds: [ehfEmbed] });
                console.log("[Listed EHF]")
            }

            async function listNf() {
                const data = await fs.readFile(nfMembers, 'utf-8');
                const jsonData = JSON.parse(data)

                const nfEmbed = new EmbedBuilder()
                .setDescription(`**Northern Fleet** - ${jsonData.members.length + jsonData.hrs.length}`)
                .setColor("DarkButNotBlack")
                .setThumbnail("https://cdn.discordapp.com/emojis/1062851054305288314.webp?size=96&quality=lossless")
                .addFields(
                    {name: "HRs", value: jsonData.hrs.map(hr => "`"+hr+"`").join(" ")},
                    {name: `Members - ${jsonData.members.length}`, value: jsonData.members.map(member => "`"+member+"`").join("\n- ")}
                )
                await message.channel.send({embeds: [nfEmbed] });
                console.log("[Listed NF]")
            }

            async function listSof() {
                const data = await fs.readFile(sofMembers, 'utf-8');
                const jsonData = JSON.parse(data)

                const sofEmbed = new EmbedBuilder()
                .setDescription(`**Special Operations Fleet** - ${jsonData.members.length + jsonData.hrs.length}`)
                .setColor("DarkButNotBlack")
                .setThumbnail("https://cdn.discordapp.com/emojis/1016128964034572338.webp?size=96&quality=lossless")
                .addFields(
                    {name: "HRs", value: jsonData.hrs.map(hr => "`"+hr+"`").join(" ")},
                    {name: `Members - ${jsonData.members.length}`, value: jsonData.members.map(member => "`"+member+"`").join("\n- ")}
                )
                await message.channel.send({embeds: [sofEmbed] });
                console.log("[Listed SOF")
            }

            async function listSrf() {
                const data = await fs.readFile(srfMembers, 'utf-8');
                const jsonData = JSON.parse(data)

                const srfEmbed = new EmbedBuilder()
                .setDescription(`**Southern Raiders Fleet** - ${jsonData.members.length + jsonData.hrs.length}`)
                .setColor("DarkButNotBlack")
                .setThumbnail("https://cdn.discordapp.com/emojis/1071177404430700716.webp?size=96&quality=lossless")
                .addFields(
                    {name: "HRs", value: jsonData.hrs.map(hr => "`"+hr+"`").join(" ")},
                    {name: `Members - ${jsonData.members.length}`, value: jsonData.members.map(member => "`"+member+"`").join("\n- ")}
                )
                await message.channel.send({embeds: [srfEmbed] });
                console.log("[Listed SRF]")
            }

            async function listWhf() {
                const data = await fs.readFile(whfMembers, 'utf-8');
                const jsonData = JSON.parse(data)

                const whfEmbed = new EmbedBuilder()
                .setDescription(`**Western Hemisphere Fleet** - ${jsonData.members.length + jsonData.hrs.length}`)
                .setColor("DarkButNotBlack")
                .setThumbnail("https://cdn.discordapp.com/emojis/1016131690814513243.webp?size=96&quality=lossless")
                .addFields(
                    {name: "HRs", value: jsonData.hrs.map(hr => "`"+hr+"`").join(" ")},
                    {name: `Members - ${jsonData.members.length}`, value: jsonData.members.map(member => "`"+member+"`").join("\n- ")}
                )
                await message.channel.send({embeds: [whfEmbed] });
                console.log("[Listed WHF]")
            }

            async function listAll() {
                listEhf();
                listNf();
                listSof();
                listSrf();
                listWhf();
            }

        }



        if(command === `account`) {
            
            if(!args[1]) return noAcc();
            
            let userN = args[1]
            console.log(userN)

            async function noAcc() {
                let eEmbed = new EmbedBuilder()
                .setDescription("**Couldn't find account.\n\nMake sure you are using a valid username.\nIf this error is false and persists, contact <@827110358992289813>.**")
                .setColor("Red")
                
                return message.reply({ embeds: [eEmbed] })
            }

            try {
                let accId = await noblox.getIdFromUsername(userN)
                if(!accId) return noAcc();

                let accName = await noblox.getUsernameFromId(accId)
                
                let fEmbed = new EmbedBuilder()
                .setDescription("Fetching Account Details...")
                .setColor("DarkButNotBlack")
                let msg = await message.reply({ embeds: [fEmbed] })

                /* Raw Data */
                let playerInfo = await noblox.getPlayerInfo(accId)
                let groups = await noblox.getGroups(accId)
                let badges = await noblox.getPlayerBadges(accId, 10000, "Asc")
                
                let goodBadges = 0;
                let badgesChecked = 0;
                
                badges.map(b => {
                    badgesChecked += 1;
                    if (b.statistics.winRatePercentage < 0.5) goodBadges += 1;
                });



                let thumbnail = await noblox.getPlayerThumbnail(accId, "150x150", "png", true, "bust")

                /* Converted Data */
                let friendCount = playerInfo.friendCount
                let followerCount = playerInfo.followerCount
                let followingCount = playerInfo.followingCount

                const start = DateTime.fromISO(playerInfo.joinDate.toISOString())
                const end = DateTime.now();
                const diff = end.diff(start, ['years', 'months']).toObject()

                let groupIds = [];
                groups.forEach(group => groupIds.push(group.Id))


                let url = `https://www.roblox.com/users/${accId}/profile`
                let profileEmbed = new EmbedBuilder()
                .setAuthor({ name: `${accName} | ${accId}`, iconURL: thumbnail[0].imageUrl, url: url})
                .setDescription("`" + `Profile Links:` +"` "+`[[Gamepasses]](https://www.roblox.com/users/${accId}/inventory/#!/game-passes)  [[Badges]](https://www.roblox.com/users/${accId}/inventory/#!/badges)`)
                .setColor("DarkButNotBlack")
                .setThumbnail(thumbnail[0].imageUrl)
                .setFields(
                    { name: `Friends ${friendCount >= 70 ? `<:checkicon:1163494461012197426>` : `❌`}`, value: `${friendCount}`, inline: true },
                    { name: `Followers ${followerCount >= 6 ? `<:checkicon:1163494461012197426>` : `❌`}`, value: `${followerCount}`, inline: true},
                    { name: `Following ${followingCount >= 6 ? `<:checkicon:1163494461012197426>` : `❌`}`, value: `${followingCount}`, inline: true},

                    { name: "Groups", 
                        value: `
                        ${groupIds.includes(139559) ? "Elemental Adventure" : ""}
                        ${groupIds.includes(3048893) ? "Flame Empire" : ""}
                        ${groupIds.includes(3048896) ? "Wind Wanderers" : ""}
                        ${groupIds.includes(3048889) ? "Rock Realm" : ""}
                        ${groupIds.includes(3048888) ? "Liquid Dynasty" : ""}
                        ${groupIds.includes(12220737) ? "[ATLA] Red Lotus" : ""}
                        ${groupIds.includes(12220754) ? "[ATLA] White Lotus" : ""}`, inline: true
                    },

                    { name: `Badges ${badges.length >= 96 ? `<:checkicon:1163494461012197426>` : `❌`}`, value: `${Math.round((badges.length / 30))} Pages`, inline: true},
                    { name: "Age", value: "`" + `${diff.years} Years, ${parseInt(diff.months)} Months` + "`", inline: true},

                )
                .setFooter({iconURL: client.user.displayAvatarURL(), text: "MrJ's bot"})

                setTimeout(() => { 
                msg.edit({ embeds: [profileEmbed]})

                }, 500)

                let badgeEmbed = new EmbedBuilder()
                .setColor("DarkButNotBlack")
                .setDescription(`Badges: ${goodBadges} of ${badgesChecked} met the criteria.`)

                message.channel.send({embeds: [badgeEmbed]})
            } catch(err) { message.reply({content: "`" + `${err}` + "`"}); console.log(err)}
            
        }

    }
};