import Discord from 'discord.js';
import Airtable, { FieldSet } from 'airtable';

export default interface ITutorialData {
  airTableBase: Airtable.Base;
  airTableUserRecord: Airtable.Record<FieldSet>;
  welcomeChannel: Discord.TextChannel;
  staffChannel: Discord.TextChannel;
  tutorialChannel: Discord.TextChannel;
  teamRole: Discord.Role;
  memberRole: Discord.Role;
}
