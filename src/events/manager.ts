import ReadyEvent from './ready';
import InteractionEvent from './interaction';
import GuildMemberAddEvent from './guildMemberAdd';

const eventManager = {
  events: [ReadyEvent, InteractionEvent, GuildMemberAddEvent],
};

export default eventManager;
