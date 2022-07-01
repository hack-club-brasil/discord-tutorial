import PingCommand from './pingCommand';
import StartFlowCommand from './startFlowCommand';

import startFlowButton from './buttons/startFlowButton';
import startTutorialButton from './buttons/startTutorialButton';
import isStudentButton from './buttons/isStudentButton';
import isNotStudentButton from './buttons/isNotStudentButton';
import notStudentDisclaimerButton from './buttons/notStudentDisclaimerButton';
import continueButton from './buttons/continueButton';
import acceptCodeOfConductButton from './buttons/acceptCodeOfConductButton';
import deleteChannelButton from './buttons/deleteChannelButton';

const interactionManager = {
  commands: [PingCommand, StartFlowCommand],
  buttons: [
    startFlowButton,
    startTutorialButton,
    isStudentButton,
    isNotStudentButton,
    notStudentDisclaimerButton,
    continueButton,
    acceptCodeOfConductButton,
    deleteChannelButton,
  ],
};

export default interactionManager;
