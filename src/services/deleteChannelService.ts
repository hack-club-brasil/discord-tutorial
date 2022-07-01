import ITutorialData from '../interfaces/ITutorialData';

export default async function deleteChannelService(
  tutorialData: ITutorialData,
): Promise<void> {
  const { tutorialChannel, airTableBase, airTableUserRecord } = tutorialData;

  const deleted = tutorialChannel.deletable
    ? await tutorialChannel.delete()
    : null;

  if (deleted) {
    await airTableBase('Users').update([
      {
        id: airTableUserRecord.id,
        fields: {
          'Current Onboarding Step': 'Channel deleted',
          'Onboard Channel ID': '',
        },
      },
    ]);
  }
}
