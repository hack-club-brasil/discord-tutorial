import _ from 'lodash';
import Discord from 'discord.js';

import IEvent from '../interfaces/IEvent';

import interactionManager from '../interactions/manager';

const registerCommands = async (
  client: Discord.Client,
  commands: Discord.ApplicationCommandData[],
): Promise<void> => {
  const guildId =
    process.env.NODE_ENV !== 'production' ? process.env.SLASH_GUILD : null;

  if (!guildId) {
    await client.application?.commands.set(commands);
    return;
  }

  const guild = client.guilds.cache.get(`${BigInt(guildId)}`);

  if (!guild) {
    await client.application?.commands.set(commands);
    return;
  }

  await guild.commands.set(commands);
};

const fetchCommands = async (
  client: Discord.Client,
): Promise<
  Discord.Collection<string, Discord.ApplicationCommand> | undefined
> => {
  const guildId =
    process.env.NODE_ENV !== 'production' ? process.env.SLASH_GUILD : null;

  if (!guildId) {
    const fetchedCommands = await client.application?.commands.fetch();
    return fetchedCommands;
  }

  const guild = client.guilds.cache.get(`${BigInt(guildId)}`);

  if (!guild) {
    const fetchedCommands = await client.application?.commands.fetch();
    return fetchedCommands;
  }

  const fetchedCommands = await guild.commands.fetch();
  return fetchedCommands;
};

const ReadyEvent: IEvent<'ready'> = {
  name: 'ready',
  once: true,
  execute: async (client): Promise<void> => {
    if (!client.application?.owner) await client.application?.fetch();

    const commandsList =
      interactionManager.commands.map<Discord.ApplicationCommandData>(
        command => {
          const { name, description, options, defaultPermission } = command;
          return {
            name,
            description,
            options: options || [],
            defaultPermission: defaultPermission || true,
          };
        },
      );

    const registeredCommands = await fetchCommands(client);

    if (!registeredCommands) {
      await registerCommands(client, commandsList);
      console.log('Ready!');
      return;
    }

    const registeredCommandsData = registeredCommands.map(command => {
      const { name, description, options, defaultPermission } = command;
      return {
        name,
        description,
        options,
        defaultPermission,
      };
    });

    const commandsAlreadyUpdated = _.isEqual(
      commandsList,
      registeredCommandsData,
    );

    if (commandsAlreadyUpdated) {
      console.log('Ready!');
      return;
    }

    await registerCommands(client, commandsList);
    console.log('Ready!');
  },
};

export default ReadyEvent;
