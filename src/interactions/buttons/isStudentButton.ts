import { GuildMember, MessageActionRow, MessageButton } from 'discord.js';

import IButton from '../../interfaces/IButton';
import handleStudentAnswerService from '../../services/handleStudentAnswerService';
import initializeTutorialService from '../../services/initializeTutorialService';

const isStudentButton: IButton = {
  id: 'isStudent',
  execute: async (client, interaction) => {
    const { member } = interaction;

    if (!member || !(member instanceof GuildMember) || !client.user) {
      return;
    }

    try {
      const tutorialData = await initializeTutorialService(client, member);
      tutorialData.tutorialChannel.sendTyping();

      const newComponents = new MessageActionRow().addComponents([
        new MessageButton()
          .setCustomId('isStudent')
          .setLabel('Sim')
          .setStyle('SUCCESS')
          .setDisabled(true),
      ]);

      await interaction.update({
        content: interaction.message.content,
        components: [newComponents],
      });

      await handleStudentAnswerService(tutorialData, true);
    } catch (error) {
      console.error(error);
    }
  },
};

export default isStudentButton;
