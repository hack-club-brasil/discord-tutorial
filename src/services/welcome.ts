import Discord from 'discord.js';

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
    !process.env.WAITING_CHANNEL ||
    !process.env.STAFF_CHANNEL
  ) {
    return;
  }

  const memberRoleId = process.env.MEMBER_ROLE;
  const welcomeChannelId = BigInt(process.env.WELCOME_CHANNEL);
  const loggingChannelId = BigInt(process.env.LOGGING_CHANNEL);
  const waitingChannelId = BigInt(process.env.WAITING_CHANNEL);
  const staffChannelId = BigInt(process.env.STAFF_CHANNEL);

  if (
    !client.user ||
    !staffChannelId ||
    !welcomeChannelId ||
    !memberRoleId ||
    !waitingChannelId
  ) {
    return;
  }

  await guildMember.fetch();
  const { guild } = guildMember;

  const welcomeChannel = await guild.channels.fetch(`${welcomeChannelId}`);
  const loggingChannel = await guild.channels.fetch(`${loggingChannelId}`);
  const waitingChannel = await guild.channels.fetch(`${waitingChannelId}`);
  const staffChannel = await guild.channels.fetch(`${staffChannelId}`);

  if (!welcomeChannel || !(welcomeChannel instanceof Discord.TextChannel)) {
    return;
  }

  if (!loggingChannel || !(loggingChannel instanceof Discord.TextChannel)) {
    return;
  }

  if (!waitingChannel || !(waitingChannel instanceof Discord.TextChannel)) {
    return;
  }

  if (!staffChannel || !(staffChannel instanceof Discord.TextChannel)) {
    return;
  }

  const channel = await guild.channels.create('tutorial-boas-vindas', {
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

  await waitingChannel.updateOverwrite(guildMember, {
    VIEW_CHANNEL: false,
  });

  const message = await channel.send(
    'Opa, olá! Eu sou o Clipinho! Pelo que parece você quer entrar na comunidade do Hack Club Brasil, não é mesmo? Que legal! Mas antes de você poder desbloquer a comunidade, eu vou te apresentar a ela. Então clique no botão abaixo e vamos começar!',
  );

  await message.react('👍');
  await message.awaitReactions((_, user) => user.id === guildMember.user?.id, {
    max: 1,
  });

  await loggingChannel.send(
    `${
      guildMember.nickname ||
      guildMember.user?.username ||
      '-nickname não encontrado-'
    } (${guildMember.id}) - iniciou tutorial`,
  );

  await channel.send(
    'Maravilha, então eu vou te ajudar a entrar no Hack Club Brasil agora!',
  );

  await later(3500);

  await channel.send(
    'Agora que estamos prontos para continuar, vamos a algumas perguntas!',
  );

  await later(3500);

  const highSchoolMessage = await channel.send(
    'Primeiramente, você é atualmente um estudante do Ensino Médio ou Ensino Fundamental? (não tem problema se não for)',
  );

  await later(500);

  await highSchoolMessage.react('👍');
  await highSchoolMessage.react('👎');

  const highSchoolAnswer = await highSchoolMessage.awaitReactions(
    (_, user) => user.id === guildMember.user?.id,
    {
      max: 1,
    },
  );

  const highSchoolReaction = highSchoolAnswer.first();

  if (highSchoolReaction?.emoji.name === '👍') {
    await loggingChannel.send(
      `${
        guildMember.nickname ||
        guildMember.user?.username ||
        '-nickname não encontrado-'
      } (${guildMember.id}) - é estudante de ensino médio ou fundamental`,
    );

    await later(1000);

    await channel.send(
      'Perfeito, o Hack Club Brasil é um lugar feito para estudantes, então você vai se encaixar bem!',
    );
  } else {
    await loggingChannel.send(
      `${
        guildMember.nickname ||
        guildMember.user?.username ||
        '-nickname não encontrado-'
      } (${guildMember.id}) - não é estudante de ensino médio ou fundamental`,
    );

    await later(1000);

    const notStudentDisclaimerMessage = await channel.send(
      'Apenas um aviso, o Hack Club Brasil é uma comunidade feita para estudantes e não uma comunidade de desenvolvedores profissionais. Então pode ser que você sinta um pouco perdido aqui.\nSe você entende isso e ainda assim deseja continuar, clique no botão abaixo',
    );

    await notStudentDisclaimerMessage.react('👍');

    await notStudentDisclaimerMessage.awaitReactions(
      (_, user) => user.id === guildMember.user?.id,
      {
        max: 1,
      },
    );
  }

  await later(5000);

  await channel.send(
    'Agora responda: O que trouxe você para a nossa comunidade?',
  );

  const messageMotivation = await highSchoolMessage.channel.awaitMessages(
    answerMotivation => answerMotivation.author.id === guildMember.user?.id,
    { max: 1 },
  );

  await loggingChannel.send(
    `${
      guildMember.nickname ||
      guildMember.user?.username ||
      '-nickname não encontrado-'
    } (${guildMember.id}) - disse que o que o trouxe aqui foi: ${
      messageMotivation.first()?.content
    }`,
  );

  await later(1000);

  await channel.send(
    'Beleza! Agora de acordo com meu script é hora de você conhecer a comunidade!',
  );

  await later(5000);

  await channel.send(
    'O nosso servidor de Discord que é este aqui, conta canais de texto que cobrem desde assuntos relacionados a tecnologia, como também canais para você conversar, se divertir, ou expor seus projetos para todos!',
  );

  await later(3000);

  welcomeChannel.updateOverwrite(guildMember, {
    VIEW_CHANNEL: true,
  });

  await channel.send(
    `Acabei de te liberar o acesso ao canal de boas-vindas!\nQue tal você se apresentar por lá? Tenho certeza que todos estão animados para te conhecer!\nO canal é ${welcomeChannel.toString()}`,
  );

  await later(30000);

  const conductMessage = await channel.send(
    'Antes de continuarmos, preciso que você leia e concorde com o nosso código de conduta. Esperamos que todos os membros da comunidade a cumpram em todos os lugares daqui!\n\nhttps://brasil.hackclub.com/codigo-de-conduta/',
  );

  await later(1000);

  await conductMessage.react('👍');
  await conductMessage.awaitReactions(
    (_, user) => user.id === guildMember.user?.id,
    { max: 1 },
  );

  await loggingChannel.send(
    `${
      guildMember.nickname ||
      guildMember.user?.username ||
      '-nickname não encontrado-'
    } (${guildMember.id}) - concordou com o código de conduta`,
  );

  await later(1000);

  await channel.send(
    `Seu próximo passo agora? Conversar com a comunidade. Estamos animados para te conhecer <a:parrot:${
      process.env.PARROT_ID || '826951538701500457'
    }>`,
  );

  await later(3000);

  await welcomeChannel.updateOverwrite(guildMember, {});

  await guildMember.roles.add(memberRoleId);

  await loggingChannel.send(
    `${
      guildMember.nickname ||
      guildMember.user?.username ||
      '-nickname não encontrado-'
    } (${guildMember.id}) - acesso completo liberado`,
  );

  await channel.send(
    'Liberei a você acesso a todos os canais da comunidade! Fique a vontade para olhar todos!',
  );

  await later(4000);

  await channel.send(
    `Agora eu vou me despedindo por aqui. Se tiver mais alguma dúvida, pergunte em ${staffChannel.toString()}`,
  );

  await later(3000);

  await channel.send('Adeeeeeeus! 👋');

  await later(1000);

  await channel.send('(Este canal se autodestruirá em 5 minutos)');

  await later(300000);

  const deleted = channel.deletable ? await channel.delete() : null;

  await loggingChannel.send(
    `${
      guildMember.nickname ||
      guildMember.user?.username ||
      '-nickname não encontrado-'
    } (${guildMember.id}) - finalizou o tutorial (canal deletado: ${
      deleted ? 'sim' : 'não'
    })`,
  );
}
