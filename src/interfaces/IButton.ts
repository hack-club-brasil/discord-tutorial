import Discord from 'discord.js';

export default interface IButton {
  id: string;
  execute: (
    client: Discord.Client,
    interaction: Discord.ButtonInteraction,
  ) => void;
}
