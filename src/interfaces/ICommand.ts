import Discord from 'discord.js';

export default interface ICommand
  extends Discord.ChatInputApplicationCommandData {
  execute: (
    client: Discord.Client,
    interaction: Discord.CommandInteraction,
  ) => void;
}
