import { GuildMember, MessageActionRow, MessageButton } from 'discord.js';

import IButton from '../../interfaces/IButton';
import initializeTutorialService from '../../services/initializeTutorialService';
import presentCodeOfConductService from '../../services/presentCodeOfConductService';

const continueButton: IButton = {
  id: 'continue',
  execute: async (client, interaction) => {
    const { member } = interaction;

    if (!member || !(member instanceof GuildMember) || !client.user) {
      return;
    }

    try {
      const tutorialData = await initializeTutorialService(client, member);

      const newComponents = new MessageActionRow().addComponents([
        new MessageButton()
          .setCustomId('continue')
          .setLabel('Continuar')
          .setStyle('PRIMARY')
          .setDisabled(true),
      ]);

      await interaction.update({
        content: interaction.message.content,
        components: [newComponents],
      });

      await presentCodeOfConductService(tutorialData);
    } catch (error) {
      console.error(error);
    }
  },
};

export default continueButton;
