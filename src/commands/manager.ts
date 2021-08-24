import PingCommand from './ping';
import StartFlow from './startFlow';

const commandManager = {
  commands: [PingCommand, StartFlow],
};

export default commandManager;
