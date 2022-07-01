import { GuildMember, MessageActionRow, MessageButton } from 'discord.js';

import IButton from '../../interfaces/IButton';
import deleteChannelService from '../../services/deleteChannelService';
import initializeTutorialService from '../../services/initializeTutorialService';

const deleteChannelButton: IButton = {
  id: 'deleteChannel',
  execute: async (client, interaction) => {
    const { member } = interaction;

    if (!member || !(member instanceof GuildMember) || !client.user) {
      return;
    }

    try {
      const tutorialData = await initializeTutorialService(client, member);

      const newComponents = new MessageActionRow().addComponents([
        new MessageButton()
          .setCustomId('deleteChannel')
          .setLabel('Apagar este canal')
          .setStyle('PRIMARY')
          .setDisabled(true),
      ]);

      await interaction.update({
        content: interaction.message.content,
        components: [newComponents],
      });

      await deleteChannelService(tutorialData);
    } catch (error) {
      console.error(error);
    }
  },
};

export default deleteChannelButton;
