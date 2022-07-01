import { MessageActionRow, MessageButton } from 'discord.js';
import ITutorialData from '../interfaces/ITutorialData';

import later from '../utils/later';
import askMotivationQuestionService from './askMotivationQuestionService';

export default async function handleStudentAnswerService(
  tutorialData: ITutorialData,
  isStudent: boolean,
): Promise<void> {
  const { airTableBase, airTableUserRecord, tutorialChannel } = tutorialData;

  await airTableBase('Users').update([
    {
      id: airTableUserRecord.id,
      fields: {
        'Current Onboarding Step': 'Student question answered',
        'Is Student?': isStudent,
      },
    },
  ]);

  await later(3000);

  if (isStudent) {
    await tutorialChannel.send(
      'Nossa, que incrível, mal posso esperar para ver o que você vai criar por aqui! Tenho certeza que todos vão amar sua presença!',
    );

    await tutorialChannel.sendTyping();

    await askMotivationQuestionService(tutorialData, false);

    return;
  }

  const notStudentDisclaimerButton = new MessageActionRow().addComponents([
    new MessageButton()
      .setCustomId('notStudentDisclaimer')
      .setLabel('Entendi, desejo continuar')
      .setStyle('PRIMARY'),
  ]);

  await later(2000);
  await tutorialChannel.send({
    content:
      'Hmm, se você for um estudante de graduação, é bem provável que você se encaixe bem. Caso contrário, você pode se sentir perdido, afinal, este lugar não é uma comunidade de desenvolvedores profissionais.',
    components: [notStudentDisclaimerButton],
  });
}
