import { GuildMember, MessageActionRow, MessageButton } from 'discord.js';
import ITutorialData from '../interfaces/ITutorialData';

export default async function endTutorialService(
  tutorialData: ITutorialData,
  guildMember: GuildMember,
): Promise<void> {
  const { airTableBase, airTableUserRecord, tutorialChannel, memberRole } =
    tutorialData;

  const deleteChannelButton = new MessageActionRow().addComponents([
    new MessageButton()
      .setCustomId('deleteChannel')
      .setLabel('Apagar este canal')
      .setStyle('PRIMARY'),
  ]);

  await airTableBase('Users').update([
    {
      id: airTableUserRecord.id,
      fields: {
        Onboarded: true,
        'Code of Conduct Acceptance': true,
        'Current Onboarding Step': 'Access granted',
      },
    },
  ]);

  await guildMember.roles.add(memberRole);

  await tutorialChannel.send({
    content:
      '*Os portões se abrem, você olha para trás e pensa no quanto você é incrível por ter passado tudo isso!*',
    components: [deleteChannelButton],
  });
}
