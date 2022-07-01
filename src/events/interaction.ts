import IEvent from '../interfaces/IEvent';

import interactionManager from '../interactions/manager';

const InteractionEvent: IEvent<'interactionCreate'> = {
  name: 'interactionCreate',
  once: false,
  execute: async (client, interaction?): Promise<void> => {
    if (!interaction) return;

    if (interaction.isButton()) {
      const buttonsList = interactionManager.buttons;

      const findButton = buttonsList.find(
        button => button.id === interaction.customId,
      );

      if (!findButton) {
        interaction.reply({
          content:
            'Opa! Não consegui encontrar esse botão!\nEntre em contato com algum administrador :)',
          ephemeral: true,
        });
        return;
      }

      findButton.execute(client, interaction);
    }

    if (interaction.isCommand()) {
      const commandsList = interactionManager.commands;

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
    }
  },
};

export default InteractionEvent;
