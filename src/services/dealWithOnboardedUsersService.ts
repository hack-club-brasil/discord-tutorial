import Discord from 'discord.js';
import Airtable from 'airtable';

export default async function dealWithOnboardedUsersService(
  guildMember: Discord.GuildMember,
): Promise<boolean> {
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
    throw new Error('Missing AIRTABLE_API_KEY or AIRTABLE_BASE_ID');
  }

  const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  const base = airtable.base(process.env.AIRTABLE_BASE_ID);

  const [findUserRecord] = await base('Users')
    .select({
      fields: ['Onboarded'],
      filterByFormula: `{Discord ID} = "${guildMember.user.id}"`,
    })
    .all();

  if (!findUserRecord || !findUserRecord.fields.Onboarded) return false;

  const memberRoleId = process.env.MEMBER_ROLE;

  if (!memberRoleId) {
    throw new Error('Missing MEMBER_ROLE');
  }

  const memberRole = await guildMember.guild.roles.fetch(memberRoleId);

  if (!memberRole) {
    throw new Error('Member role not found');
  }

  await guildMember.roles.add(memberRole);

  return true;
}
