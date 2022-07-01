import { GuildMember, MessageActionRow, MessageButton } from 'discord.js';

import IButton from '../../interfaces/IButton';
import handleStudentAnswerService from '../../services/handleStudentAnswerService';
import initializeTutorialService from '../../services/initializeTutorialService';

const isNotStudentButton: IButton = {
  id: 'isNotStudent',
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
          .setCustomId('isNotStudent')
          .setLabel('Não')
          .setStyle('DANGER')
          .setDisabled(true),
      ]);

      await interaction.update({
        content: interaction.message.content,
        components: [newComponents],
      });

      await handleStudentAnswerService(tutorialData, false);
    } catch (error) {
      console.error(error);
    }
  },
};

export default isNotStudentButton;
