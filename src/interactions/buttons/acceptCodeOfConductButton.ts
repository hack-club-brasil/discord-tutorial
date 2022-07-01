import { GuildMember, MessageActionRow, MessageButton } from 'discord.js';

import IButton from '../../interfaces/IButton';
import endTutorialService from '../../services/endTutorialService';
import initializeTutorialService from '../../services/initializeTutorialService';

const acceptCodeOfConductButton: IButton = {
  id: 'acceptCodeOfConduct',
  execute: async (client, interaction) => {
    const { member } = interaction;

    if (!member || !(member instanceof GuildMember) || !client.user) {
      return;
    }

    try {
      const tutorialData = await initializeTutorialService(client, member);

      const newComponents = new MessageActionRow().addComponents([
        new MessageButton()
          .setLabel('Ler Código de Conduta')
          .setStyle('LINK')
          .setURL('https://brasil.hackclub.com/codigo-de-conduta/'),
        new MessageButton()
          .setCustomId('acceptCodeOfConduct')
          .setLabel('Aceitar Código de Conduta')
          .setStyle('SUCCESS')
          .setDisabled(true),
      ]);

      await interaction.update({
        content: interaction.message.content,
        components: [newComponents],
      });

      await endTutorialService(tutorialData, member);
    } catch (error) {
      console.error(error);
    }
  },
};

export default acceptCodeOfConductButton;
