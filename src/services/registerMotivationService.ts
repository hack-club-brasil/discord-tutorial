import { GuildMember, MessageActionRow, MessageButton } from 'discord.js';
import ITutorialData from '../interfaces/ITutorialData';

import later from '../utils/later';

export default async function registerMotivationService(
  tutorialData: ITutorialData,
  guildMember: GuildMember,
  motivationText: string,
): Promise<void> {
  const { airTableBase, airTableUserRecord, tutorialChannel, welcomeChannel } =
    tutorialData;

  await airTableBase('Users').update([
    {
      id: airTableUserRecord.id,
      fields: {
        'Current Onboarding Step': 'Motivation question answered',
        Motivation: motivationText,
      },
    },
  ]);

  const continueButton = new MessageActionRow().addComponents([
    new MessageButton()
      .setCustomId('continue')
      .setLabel('Continuar')
      .setStyle('PRIMARY'),
  ]);

  await tutorialChannel.sendTyping();

  await later(2000);

  await welcomeChannel.permissionOverwrites.edit(guildMember, {
    VIEW_CHANNEL: true,
  });

  const [userRecord] = await airTableBase('Users')
    .select({
      fields: ['Current Onboarding Step'],
      filterByFormula: `RECORD_ID() = "${airTableUserRecord.id}"`,
    })
    .all();

  if (
    userRecord.fields['Current Onboarding Step'] !==
    'Motivation question answered'
  )
    return;

  await airTableBase('Users').update([
    {
      id: airTableUserRecord.id,
      fields: {
        'Current Onboarding Step': 'Added to welcome chat',
      },
    },
  ]);

  await tutorialChannel.send({
    content: `Que legal! Bem, chegamos na entrada, sinta-se livre para se apresentar para o pessoal aqui em ${welcomeChannel.toString()} e quando estiver pronto, siga em frente seu caminho! Adeus, foi incrível te conhecer!`,
    components: [continueButton],
  });
}
