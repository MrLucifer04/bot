const { ChatInputCommandInteraction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const { showcaseChannelID } = require('../../config.json')
const fs = require('fs').promises;
const setupModel = require('../../Schemas/freshSchema');
const { verifyUserRoles } = require('../../functions/verifyUserRoles');

module.exports = {
    name: "edit",
    description: "...",
    options: [
        {
            name: 'fleet',
            description: 'choose a fleet',
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: 'EHF',
                    value: 'ehf',
                },
                {
                    name: 'NF',
                    value: 'nf',
                },
                {
                    name: 'SOF',
                    value: 'sof',
                },
                {
                    name: 'SRF',
                    value: 'srf',
                },
                {
                    name: 'WHF',
                    value: 'whf',
                },

            ],
        },
        {
            name: 'category',
            description: '...',
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: "HR",
                    value: 'hrs',
                },
                {
                    name: 'Member',
                    value: 'members',
                },
            ],
        },
        {
            name: 'type',
            description: '...',
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: 'add',
                    value: 'add',
                },
                {
                    name: 'remove',
                    value: 'remove',
                },
                {
                    name: 'replace',
                    value: 'replace',
                },
            ],
        },
        {
            name: 'old_name',
            description: 'name to replace',
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "new_name",
            description: 'new name to replace old_name',
            type: ApplicationCommandOptionType.String,
        },
    ],

    /**
    * @param {ChatInputCommandInteraction} interaction
    */
    
    async execute(interaction) {
        if(!interaction.member.roles.cache.has('905383756083372033') && !interaction.member.roles.cache.has('905434154693460018') && interaction.user.id !== '827110358992289813') return await interaction.reply({content: "You are not allowed to use this command.", ephemeral: true});

        let fleet = interaction.options.get('fleet', true).value;
        let category = interaction.options.get('category', true).value;
        let type = interaction.options.get('type', true).value;

        let old_name = interaction.options.getString('old_name');
        let new_name = interaction.options.getString('new_name');

        if(type === 'replace' || type === 'add' && !new_name) return await interaction.reply({content: "You chose to edit the list, but did not choose a new value to replace the old one.", ephemeral: true});

        const ehfFile = require.resolve('../../fleetmembers/ehf.json');
        const nfFile = require.resolve('../../fleetmembers/nf.json');
        const sofFile = require.resolve('../../fleetmembers/sof.json');
        const srfFile = require.resolve('../../fleetmembers/srf.json');
        const whfFile = require.resolve('../../fleetmembers/whf.json');

        await interaction.deferReply({ephemeral: true, fetchReply: true})
        switch(fleet) {
            case 'ehf':
                switch(type) {
                    case 'remove':
                        removeItemFromArrayInJSONFile(ehfFile, category, old_name.toLowerCase());
                        break;
                    case 'replace':
                        editItemInJSONFile(ehfFile, category, old_name, new_name.toLowerCase());
                        break;
                    case 'add':
                        addItemToJSONFile(ehfFile, category, new_name.toLowerCase());
                        break;
                }
                break;
            case 'nf':
                switch(type) {
                    case 'remove':
                        removeItemFromArrayInJSONFile(nfFile, category, old_name.toLowerCase());
                        break;
                    case 'replace':
                        editItemInJSONFile(nfFile, category, old_name, new_name.toLowerCase());
                        break;
                    case 'add':
                        addItemToJSONFile(nfFile, category, new_name.toLowerCase());
                        break;
                }
                break;
            case 'sof':
                switch(type) {
                    case 'remove':
                        removeItemFromArrayInJSONFile(sofFile, category, old_name.toLowerCase());
                        break;
                    case 'replace':
                        editItemInJSONFile(sofFile, category, old_name, new_name.toLowerCase());
                        break;
                    case 'add':
                        addItemToJSONFile(sofFile, category, new_name.toLowerCase());
                        break;
                }
                break;
            case 'srf':
                switch(type) {
                    case 'remove':
                        removeItemFromArrayInJSONFile(srfFile, category, old_name.toLowerCase());
                        break;
                    case 'replace':
                        editItemInJSONFile(srfFile, category, old_name, new_name).toLowerCase();
                        break;
                    case 'add':
                        addItemToJSONFile(srfFile, category, new_name.toLowerCase());
                        break;
                }
                break;
            case 'whf':
                switch(type) {
                    case 'remove':
                        removeItemFromArrayInJSONFile(whfFile, category, old_name.toLowerCase());
                        break;
                    case 'replace':
                        editItemInJSONFile(whfFile, category, old_name, new_name.toLowerCase());
                        break;
                    case 'add':
                        addItemToJSONFile(whfFile, category, new_name.toLowerCase());
                        break;
                }
                break;
        }
        async function removeItemFromArrayInJSONFile(filePath, targetArray, itemToRemove) {
            try {
                // Read the JSON data
                const data = await fs.readFile(filePath, 'utf8');

                // Parse the JSON data
                const jsonData = JSON.parse(data);

                // Ensure the target array exists
                if (jsonData[targetArray] && Array.isArray(jsonData[targetArray])) {
                    // Find the index of the item to remove
                    const indexToRemove = jsonData[targetArray].indexOf(itemToRemove);

                    if (indexToRemove !== -1) {
                        // Remove the item from the array
                        jsonData[targetArray].splice(indexToRemove, 1);

                        // Save the updated JSON data back to the file
                        await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));
                        console.log(`${fleet} Removed "${itemToRemove}" from the "${targetArray}" array.`)
                        return await interaction.editReply({content: `Successfully removed ${itemToRemove} from the list.`, ephemeral: true});
                    } else {
                        console.log(`The item "${itemToRemove}" was not found in the "${targetArray}" array.`);
                        return await interaction.editReply({content: `${itemToRemove} does not exist in the list.`, ephemeral: true});
                    }
                } else {
                    console.log(`The "${targetArray}" array does not exist in the JSON data.`);
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
            
        }

        async function editItemInJSONFile(filePath, targetArray, itemToEdit, newValue) {
            try {
                // Read the JSON data
                const data = await fs.readFile(filePath, 'utf8');

                // Parse the JSON data
                const jsonData = JSON.parse(data);

                // Ensure the target array exists
                if (jsonData[targetArray] && Array.isArray(jsonData[targetArray])) {
                    // Find the index of the item to edit
                    const indexToEdit = jsonData[targetArray].indexOf(itemToEdit);

                    if (indexToEdit !== -1) {
                        // Update the item with the new value
                        jsonData[targetArray][indexToEdit] = newValue;

                        // Save the updated JSON data back to the file
                        await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));
                        console.log(`${fleet} Edited "${itemToEdit}" in the "${targetArray}" array to "${newValue}".`);
                        return await interaction.editReply({content: `Successfully edited ${itemToEdit} to ${newValue}.`, ephemeral: true});
                    } else {
                        console.log(`The item "${itemToEdit}" was not found in the "${targetArray}" array.`);
                        return await interaction.editReply({content: `${itemToEdit} does not exist in the list.`, ephemeral: true});
                    }
                } else {
                    console.log(`The "${targetArray}" array does not exist in the JSON data.`);
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        }

        async function addItemToJSONFile(filePath, targetArray, newItem) {
            try {
                // Read the JSON data
                const data = await fs.readFile(filePath, 'utf8');

                // Parse the JSON data
                const jsonData = JSON.parse(data);

                // Ensure the target array exists
                if (jsonData[targetArray] && Array.isArray(jsonData[targetArray])) {
                    // Check if the item already exists in the array
                    if (jsonData[targetArray].includes(newItem)) {
                        console.log(`The item "${newItem}" already exists in the "${targetArray}" array.`);
                        return interaction.editReply({content: `${newItem} already exists in the list.`, ephemeral: true});
                    } else {
                        // Add the new item to the array
                        jsonData[targetArray].push(newItem);

                        // Save the updated JSON data back to the file
                        await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));
                        console.log(`${fleet} Added "${newItem}" to the list.`);
                        return await interaction.editReply({content: `Added ${newItem} to list.`, ephemeral: true})
                    }
                } else {
                    console.log(`The "${targetArray}" array does not exist in the JSON data.`);
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        }

    }
}