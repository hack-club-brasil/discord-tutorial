import ReadyEvent from './ready';
import InteractionEvent from './interaction';
import GuildMemberAddEvent from './guildMemberAdd';
import MessageCreateEvent from './message';

const eventManager = {
  events: [
    ReadyEvent,
    InteractionEvent,
    GuildMemberAddEvent,
    MessageCreateEvent,
  ],
};

export default eventManager;
