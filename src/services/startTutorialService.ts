import { MessageActionRow, MessageButton } from 'discord.js';
import ITutorialData from '../interfaces/ITutorialData';

import later from '../utils/later';

export default async function startTutorialService(
  tutorialData: ITutorialData,
): Promise<void> {
  const { airTableBase, airTableUserRecord, tutorialChannel } = tutorialData;

  await airTableBase('Users').update([
    {
      id: airTableUserRecord.id,
      fields: {
        'Current Onboarding Step': 'Tutorial started',
      },
    },
  ]);

  const studentButtons = new MessageActionRow().addComponents([
    new MessageButton()
      .setCustomId('isStudent')
      .setLabel('Sim')
      .setStyle('SUCCESS'),
    new MessageButton()
      .setCustomId('isNotStudent')
      .setLabel('Não')
      .setStyle('DANGER'),
  ]);

  await later(2000);
  await tutorialChannel.send(
    'Essas ruínas guiam o caminho até o Hack Club Brasil.',
  );

  await tutorialChannel.sendTyping();
  await later(5000);
  await tutorialChannel.send(
    'Eu gostaria muito que você ficasse comigo aqui, mas entendo que deve seguir seu caminho para fazer coisas incríveis como vários estudantes que passaram por aqui.',
  );

  await tutorialChannel.sendTyping();
  await later(10000);
  await tutorialChannel.send({
    content:
      'Aliás, falando em estudantes, você é estudante de Ensino Médio ou Ensino Fundamental?',
    components: [studentButtons],
  });
}
