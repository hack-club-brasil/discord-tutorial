import { GuildMember } from 'discord.js';
import ICommand from '../interfaces/ICommand';
import initializeTutorialService from '../services/initializeTutorialService';

const StartFlowCommand: ICommand = {
  name: 'startflow',
  description: 'Inicia o fluxo de boas-vindas para um usuário em específico!',
  defaultPermission: false,
  options: [
    {
      name: 'user',
      description: 'O usuário que você quer iniciar o fluxo.',
      type: 'USER',
      required: true,
    },
  ],
  execute: async (client, interaction) => {
    const option = interaction.options.get('user');
    const user = option?.member;

    if (!user) {
      await interaction.reply({ content: 'Você não especificou um usuário!' });
      return;
    }

    if (user.pending || !(user instanceof GuildMember)) {
      await interaction.reply({
        content:
          'O usuário não existe ou ainda não está integrado na comunidade!',
      });
      return;
    }

    initializeTutorialService(client, user).catch(err => console.log(err));

    await interaction.reply({ content: 'Fluxo iniciado!' });
  },
};

export default StartFlowCommand;
