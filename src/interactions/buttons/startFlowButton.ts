import { GuildMember } from 'discord.js';
import IButton from '../../interfaces/IButton';
import initializeTutorialService from '../../services/initializeTutorialService';

const startFlowButton: IButton = {
  id: 'startFlow',
  execute: async (client, interaction) => {
    const { member } = interaction;

    if (!member || !(member instanceof GuildMember) || !client.user) {
      return;
    }

    try {
      initializeTutorialService(client, member);
      await interaction.update({
        content: 'Comando executado com sucesso!',
      });
    } catch (error) {
      console.error(error);
    }
  },
};

export default startFlowButton;
