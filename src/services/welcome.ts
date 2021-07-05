import Discord, { GuildChannel } from 'discord.js';

function later(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export default async function welcomeService(
  client: Discord.Client,
  guildMember: Discord.GuildMember,
): Promise<void> {
  if (
    !process.env.WELCOME_CHANNEL ||
    !process.env.LOGGING_CHANNEL ||
    !process.env.WAITING_CHANNEL
  ) {
    return;
  }

  const staffRoleId = process.env.STAFF_ROLE;
  const memberRoleId = process.env.MEMBER_ROLE;
  const welcomeChannelId = BigInt(process.env.WELCOME_CHANNEL);
  const loggingChannelId = BigInt(process.env.LOGGING_CHANNEL);
  const waitingChannelId = BigInt(process.env.WAITING_CHANNEL);

  if (
    !client.user ||
    !staffRoleId ||
    !welcomeChannelId ||
    !memberRoleId ||
    !waitingChannelId
  ) {
    return;
  }

  const { guild } = guildMember;

  const welcomeChannel = await guild.channels.fetch(`${welcomeChannelId}`);
  const loggingChannel = await guild.channels.fetch(`${loggingChannelId}`);
  const waitingChannel = await guild.channels.fetch(`${waitingChannelId}`);

  if (!welcomeChannel || !(welcomeChannel instanceof Discord.TextChannel)) {
    return;
  }

  if (!loggingChannel || !(loggingChannel instanceof Discord.TextChannel)) {
    return;
  }

  if (!waitingChannel || !(waitingChannel instanceof Discord.TextChannel)) {
    return;
  }

  const channel = await guild.channels.create('batatas-pulantes-7', {
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
      {
        id: staffRoleId,
        allow: ['VIEW_CHANNEL', 'ATTACH_FILES', 'ADD_REACTIONS'],
      },
    ],
  });

  await waitingChannel.updateOverwrite(guildMember, {
    VIEW_CHANNEL: false,
  });

  const message = await channel.send(
    'Opa, olá! Eu sou o Clippy! Pelo que parece você quer entrar na comunidade do Hack Club Brasil, não é mesmo? Que legal! Mas antes de você poder desbloquer a comunidade, eu vou te apresentar a ela. Então clique no botão abaixo e vamos começar!',
  );

  await message.react('👍');
  await message.awaitReactions(() => true, {
    max: 1,
  });

  await loggingChannel.send(`${guildMember.id} - reaction 1`);

  await channel.send(
    'Maravilha, então eu vou te ajudar a entrar no Hack Club Brasil agora!',
  );

  await later(3500);

  await channel.send(
    'Agora que estamos prontos para continuar, vamos a algumas perguntas!',
  );

  await later(3500);

  const highSchoolMessage = await channel.send(
    'Primeiramente, você é atualmente um estudante? (não tem problema se não for)',
  );

  await later(500);

  await highSchoolMessage.react('👍');
  await highSchoolMessage.react('👎');

  const highSchoolAnswer = await highSchoolMessage.awaitReactions(() => true, {
    max: 1,
  });

  const highSchoolReaction = highSchoolAnswer.first();

  if (highSchoolReaction?.emoji.name === '👍') {
    await loggingChannel.send(`${guildMember.id} - reaction 2 true`);

    await later(1000);

    await channel.send(
      'Perfeito, o Hack Club Brasil é um lugar feito para estudantes, então você vai se encaixar bem!',
    );
  } else {
    await loggingChannel.send(`${guildMember.id} - reaction 2 false`);

    await later(1000);

    const notStudentDisclaimerMessage = await channel.send(
      'Apenas um aviso, o Hack Club Brasil é uma comunidade feita para estudantes e não uma comunidade de desenvolvedores profissionais. Então pode ser que você sinta um pouco perdido aqui.\nSe você entende isso e ainda assim deseja continuar, clique no botão abaixo',
    );

    await notStudentDisclaimerMessage.react('👍');

    await notStudentDisclaimerMessage.awaitReactions(() => true, {
      max: 1,
    });
  }

  await later(5000);

  await channel.send(
    'Agora responda: O que trouxe você para a nossa comunidade?',
  );

  const messageMotivation = await highSchoolMessage.channel.awaitMessages(
    () => true,
    { max: 1 },
  );

  await loggingChannel.send(
    `${guildMember.id} - motivation ${messageMotivation.first()?.content}`,
  );

  await later(1000);

  await channel.send(
    'Beleza! Agora de acordo com meu script é hora de você conhecer a comunidade!',
  );

  await later(5000);

  await channel.send(
    'O nosso servidor de Discord que é este aqui, conta com diversos canais de texto, que cobrem assuntos desde...',
  );

  await later(500);

  welcomeChannel.updateOverwrite(guildMember, {
    VIEW_CHANNEL: true,
  });

  const messagePing = `Olá, ${guildMember.user.toString()}, este aqui é o canal de boas vindas, pode se apresentar aqui!\nA todos que estão vendo essa mensagem, sintam-se livres para dar as boas vindas!`;

  await welcomeChannel.send(messagePing);

  await later(500);

  await channel.send('Opa, calma aí. Você ouviu isso?');

  await later(3000);

  await channel.send('Ahaa! É uma notificação do Discord!');

  await later(3000);

  await channel.send(
    'Clique no símbolo vermelho ali no canto para ver o que é!',
  );

  await later(30000);

  await channel.send(
    'Certo, então como eu havia dizendo, temos canais que cobrem desde assuntos relacionados a tecnologia, como também canais para você conversar, se divertir, ou expor seus projetos para todos!',
  );

  await later(8000);

  const conductMessage = await channel.send(
    'Antes de continuarmos, preciso que você leia e concorde com o nosso código de conduta. Esperamos que todos os membros da comunidade a cumpram em todos os lugares daqui!\n\nhttps://brasil.hackclub.com/codigo-de-conduta/',
  );

  await later(1000);

  await conductMessage.react('👍');
  await conductMessage.awaitReactions(() => true, { max: 1 });

  await loggingChannel.send(`${guildMember.id} - reaction 3`);

  await later(1000);

  await channel.send(
    'Seu próximo passo agora? Conversar com a comunidade. Estamos animados para te conhecer :parrot:',
  );

  await later(3000);

  await welcomeChannel.updateOverwrite(guildMember, {
    VIEW_CHANNEL: false,
  });

  await guildMember.roles.add(memberRoleId);

  await channel.send(
    'Liberei a você acesso a todos os canais da comunidade! Fique a vontade para olhar todos!',
  );

  await later(4000);

  await channel.send(
    'Agora eu vou me despedindo por aqui. Se tiver mais alguma dúvida, pergunte em #time',
  );

  await later(3000);

  await channel.send('Adeeeeeeus! 👋');

  await later(1000);

  await channel.send('(Este canal se autodestruirá em 5 minutos)');

  await later(300000);

  const deleted = channel.deletable ? await channel.delete() : null;

  await loggingChannel.send(
    `${guildMember.id} - end (deleted: ${Boolean(deleted)})`,
  );
}
