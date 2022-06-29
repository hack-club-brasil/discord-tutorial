import IEvent from '../interfaces/IEvent';
import welcomeService from '../services/welcome';

const GuildMemberAddEvent: IEvent<'guildMemberAdd'> = {
  name: 'guildMemberAdd',
  once: false,
  execute: async (client, guildMember?): Promise<void> => {
    if (!guildMember || !client.user) {
      return;
    }

    try {
      await welcomeService(client, guildMember);
    } catch (error) {
      console.error(error);
    }
  },
};

export default GuildMemberAddEvent;
