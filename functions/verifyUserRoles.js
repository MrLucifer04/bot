const { GuildMember } = require("discord.js");

/**
 * 
 * @param {GuildMember} user 
 */
async function verifyUserRoles(user) {
    // rvy, overseer, seniorOfficer, officer, instructor, RAM
    let verifiedRoleIds = ["905434154693460018", "905383756083372033", "926828526873751572", "905383835422826566", "906340269031579678"]

    if (user.roles.cache.some(role => verifiedRoleIds.includes(role.id))) {
        return true;
    }

    return false;
}

module.exports = { verifyUserRoles };