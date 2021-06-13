import Discord from 'discord.js';

export default interface ICommand extends Discord.ApplicationCommandData {
  execute: (
    client: Discord.Client,
    interaction: Discord.CommandInteraction,
  ) => void;
}
