import IEvent from '../interfaces/IEvent';

import commandManager from '../commands/manager';

const InteractionEvent: IEvent<'interaction'> = {
  name: 'interaction',
  once: false,
  execute: async (client, interaction?): Promise<void> => {
    if (!interaction || !interaction.isCommand()) return;

    const commandsList = commandManager.commands;

    const findCommand = commandsList.find(
      command => command.name === interaction.commandName,
    );

    if (!findCommand) {
      interaction.reply({
        content:
          'Opa! Não consegui encontrar esse comando!\nEntre em contato com algum administrador :)',
        ephemeral: true,
      });
      return;
    }

    findCommand.execute(client, interaction);
  },
};

export default InteractionEvent;
