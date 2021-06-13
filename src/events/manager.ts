import ReadyEvent from './ready';
import InteractionEvent from './interaction';

const eventManager = {
  events: [ReadyEvent, InteractionEvent],
};

export default eventManager;
