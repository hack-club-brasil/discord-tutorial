import IEvent from '../interfaces/IEvent';
import initializeTutorialService from '../services/initializeTutorialService';

const GuildMemberAddEvent: IEvent<'guildMemberAdd'> = {
  name: 'guildMemberAdd',
  once: false,
  execute: async (client, guildMember?): Promise<void> => {
    if (!guildMember || !client.user) {
      return;
    }

    try {
      await initializeTutorialService(client, guildMember);
    } catch (error) {
      console.error(error);
    }
  },
};

export default GuildMemberAddEvent;
