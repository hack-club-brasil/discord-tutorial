import IEvent from '../interfaces/IEvent';
import dealWithOnboardedUsersService from '../services/dealWithOnboardedUsersService';
import initializeTutorialService from '../services/initializeTutorialService';

const GuildMemberAddEvent: IEvent<'guildMemberAdd'> = {
  name: 'guildMemberAdd',
  once: false,
  execute: async (client, guildMember?): Promise<void> => {
    if (!guildMember || !client.user) {
      return;
    }

    try {
      const isAlreadyOnboarded = await dealWithOnboardedUsersService(
        guildMember,
      );

      if (isAlreadyOnboarded) {
        return;
      }

      await initializeTutorialService(client, guildMember);
    } catch (error) {
      console.error(error);
    }
  },
};

export default GuildMemberAddEvent;
