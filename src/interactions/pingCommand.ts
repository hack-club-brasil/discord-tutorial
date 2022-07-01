import { MessageActionRow, MessageButton } from 'discord.js';
import ICommand from '../interfaces/ICommand';

const PingCommand: ICommand = {
  name: 'ping',
  description: 'Ping pong!!',
  execute: async (_, interaction) => {
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('pong')
        .setLabel('Pong!')
        .setStyle('PRIMARY'),
    );

    await interaction.reply({ content: 'pong!', components: [row] });
  },
};

export default PingCommand;
