import IEvent from '../interfaces/IEvent';
import welcomeService from '../services/welcome';

const GuildMemberAddEvent: IEvent<'guildMemberAdd'> = {
  name: 'guildMemberAdd',
  once: false,
  execute: async (client, guildMember?): Promise<void> => {
    if (!guildMember || !client.user) {
      return;
    }

    await welcomeService(client, guildMember);
  },
};

export default GuildMemberAddEvent;
