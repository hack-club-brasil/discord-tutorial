import Discord, { MessageActionRow, MessageButton } from 'discord.js';
import Airtable from 'airtable';

import later from '../utils/later';
import ITutorialData from '../interfaces/ITutorialData';

export default async function initializeTutorialService(
  client: Discord.Client,
  guildMember: Discord.GuildMember,
): Promise<ITutorialData> {
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
    throw new Error('Missing AIRTABLE_API_KEY or AIRTABLE_BASE_ID');
  }

  const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  const base = airtable.base(process.env.AIRTABLE_BASE_ID);

  const [findUserRecord] = await base('Users')
    .select({
      fields: ['Discord ID', 'Onboard Channel ID', 'Current Onboarding Step'],
      filterByFormula: `{Discord ID} = "${guildMember.user.id}"`,
    })
    .all();

  const userRecord = !findUserRecord
    ? (
        await base('Users').create([
          {
            fields: {
              Name: guildMember.user.username,
              'Discord ID': guildMember.user.id,
            },
          },
        ])
      )[0]
    : findUserRecord;

  if (
    !process.env.WELCOME_CHANNEL ||
    !process.env.WAITING_CHANNEL ||
    !process.env.STAFF_CHANNEL ||
    !process.env.TEAM_ROLE
  ) {
    throw new Error(
      'Missing WELCOME_CHANNEL, WAITING_CHANNEL or STAFF_CHANNEL',
    );
  }

  const memberRoleId = process.env.MEMBER_ROLE;
  const welcomeChannelId = process.env.WELCOME_CHANNEL;
  const waitingChannelId = process.env.WAITING_CHANNEL;
  const staffChannelId = process.env.STAFF_CHANNEL;
  const teamRoleId = process.env.TEAM_ROLE;

  if (
    !client.user ||
    !staffChannelId ||
    !welcomeChannelId ||
    !memberRoleId ||
    !teamRoleId ||
    !waitingChannelId
  ) {
    throw new Error(
      'Missing client.user, staffChannelId, welcomeChannelId, memberRoleId or waitingChannelId',
    );
  }

  await guildMember.fetch();
  const { guild } = guildMember;

  const welcomeChannel = await guild.channels.fetch(welcomeChannelId);
  const waitingChannel = await guild.channels.fetch(waitingChannelId);
  const staffChannel = await guild.channels.fetch(staffChannelId);
  const teamRole = await guild.roles.fetch(teamRoleId);
  const memberRole = await guild.roles.fetch(memberRoleId);

  if (!welcomeChannel || !(welcomeChannel instanceof Discord.TextChannel)) {
    throw new Error('Missing welcomeChannel');
  }

  if (!waitingChannel || !(waitingChannel instanceof Discord.TextChannel)) {
    throw new Error('Missing waitingChannel');
  }

  if (!staffChannel || !(staffChannel instanceof Discord.TextChannel)) {
    throw new Error('Missing staffChannel');
  }

  if (!teamRole || !(teamRole instanceof Discord.Role)) {
    throw new Error('Missing teamRole');
  }

  if (!memberRole || !(memberRole instanceof Discord.Role)) {
    throw new Error('Missing memberRole');
  }

  const channelIdFromAirTable = userRecord.fields['Onboard Channel ID'];

  const findChannel =
    channelIdFromAirTable &&
    (await guild.channels.fetch(`${channelIdFromAirTable}`).catch(() => {
      return null;
    }));

  let channel: Discord.TextChannel | undefined;

  if (!findChannel || !(findChannel instanceof Discord.TextChannel)) {
    channel = await guild.channels.create('caverna-da-toriel', {
      permissionOverwrites: [
        {
          id: guild.roles.everyone,
          deny: ['VIEW_CHANNEL', 'ATTACH_FILES', 'ADD_REACTIONS'],
        },
        {
          id: guildMember.id,
          allow: ['VIEW_CHANNEL'],
        },
        {
          id: client.user.id,
          allow: ['VIEW_CHANNEL', 'ADD_REACTIONS'],
        },
      ],
    });

    await base('Users').update([
      {
        id: userRecord.id,
        fields: {
          'Onboard Channel ID': channel.id,
          'Language preference': 'Português',
          'Current Onboarding Step': 'Channel created',
        },
      },
    ]);

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('startTutorial')
        .setLabel('Seguir Toriel')
        .setStyle('PRIMARY'),
    );

    await channel.sendTyping();
    await later(1000);
    await channel.send('Olá, criança, não tenha medo!');

    await channel.sendTyping();
    await later(3500);
    await channel.send({
      content:
        'Eu sou Toriel, cuidadora dessas ruínas, venha comigo, vou te mostrar o caminho!',
      components: [row],
    });
  } else {
    channel = findChannel;
  }

  if (!channel) {
    throw new Error('Missing channel');
  }

  await waitingChannel.permissionOverwrites.edit(guildMember, {
    VIEW_CHANNEL: false,
  });

  return {
    airTableBase: base,
    airTableUserRecord: userRecord,
    staffChannel,
    tutorialChannel: channel,
    teamRole,
    memberRole,
    welcomeChannel,
  };

  // const deleted = channel.deletable ? await channel.delete() : null;

  // if (deleted) {
  //   await base('Users').update([
  //     {
  //       id: userRecord.id,
  //       fields: {
  //         'Current Onboarding Step': 'Channel deleted',
  //         'Onboard Channel ID': '',
  //       },
  //     },
  //   ]);
  // }
}
