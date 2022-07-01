import ITutorialData from '../interfaces/ITutorialData';

import later from '../utils/later';

export default async function askMotivationQuestionService(
  tutorialData: ITutorialData,
  disclaimerPassed: boolean,
): Promise<void> {
  const { airTableBase, airTableUserRecord, tutorialChannel } = tutorialData;

  if (disclaimerPassed) {
    await airTableBase('Users').update([
      {
        id: airTableUserRecord.id,
        fields: {
          'Current Onboarding Step': 'Not student disclaimer acknowledged',
        },
      },
    ]);
  }

  await later(3000);
  await tutorialChannel.send(
    'Estamos quase chegando lá, mas antes, que tal você me contar um pouquinho sobre o que te trouxe aqui?',
  );
}
