import { GuildMember, MessageActionRow, MessageButton } from 'discord.js';

import IButton from '../../interfaces/IButton';
import askMotivationQuestionService from '../../services/askMotivationQuestionService';
import initializeTutorialService from '../../services/initializeTutorialService';

const notStudentDisclaimerButton: IButton = {
  id: 'notStudentDisclaimer',
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
          .setCustomId('notStudentDisclaimer')
          .setLabel('Entendi, desejo continuar')
          .setStyle('PRIMARY')
          .setDisabled(true),
      ]);

      await interaction.update({
        content: interaction.message.content,
        components: [newComponents],
      });

      await askMotivationQuestionService(tutorialData, true);
    } catch (error) {
      console.error(error);
    }
  },
};

export default notStudentDisclaimerButton;
