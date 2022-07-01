import { GuildMember, MessageActionRow, MessageButton } from 'discord.js';
import IButton from '../../interfaces/IButton';
import initializeTutorialService from '../../services/initializeTutorialService';
import startTutorialService from '../../services/startTutorialService';

const startTutorialButton: IButton = {
  id: 'startTutorial',
  execute: async (client, interaction) => {
    const { member } = interaction;

    if (!member || !(member instanceof GuildMember) || !client.user) {
      return;
    }

    try {
      const tutorialData = await initializeTutorialService(client, member);
      tutorialData.tutorialChannel.sendTyping();

      const newComponents = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId('startTutorial')
          .setLabel('Seguir Toriel')
          .setStyle('PRIMARY')
          .setDisabled(true),
      );

      await interaction.update({
        content: interaction.message.content,
        components: [newComponents],
      });

      await startTutorialService(tutorialData);
    } catch (error) {
      console.error(error);
    }
  },
};

export default startTutorialButton;
