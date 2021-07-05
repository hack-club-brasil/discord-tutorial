import ICommand from '../interfaces/ICommand';

const PingCommand: ICommand = {
  name: 'ping',
  description: 'Ping pong!!',
  execute: async (_, interaction) => {
    await interaction.reply({ content: 'pong!' });
  },
};

export default PingCommand;
