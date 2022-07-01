import IEvent from '../interfaces/IEvent';
import checkTutorialAnswerService from '../services/checkTutorialAnswerService';
import initializeTutorialService from '../services/initializeTutorialService';
import registerMotivationService from '../services/registerMotivationService';

const MessageCreateEvent: IEvent<'messageCreate'> = {
  name: 'messageCreate',
  once: false,
  execute: async (client, message): Promise<void> => {
    if (message.author.bot) {
      return;
    }

    try {
      const tutorialExists = await checkTutorialAnswerService(message);

      if (tutorialExists && message.member) {
        const tutorialData = await initializeTutorialService(
          client,
          message.member,
        );

        await registerMotivationService(
          tutorialData,
          message.member,
          message.content,
        );
      }
    } catch (error) {
      console.error(error);
    }

    // if (message.author.bot) {
    //   return;
    // }
    // if (message.channel instanceof TextChannel) {
    // const row = new MessageActionRow().addComponents(
    //   new MessageButton()
    //     .setCustomId('start_tutorial')
    //     .setLabel('Vamos lá! / Put me in!')
    //     .setStyle('PRIMARY'),
    // );
    //   message.channel.send({
    //     content: message.content,
    //     components: [row],
    //   });
    // }
  },
};

export default MessageCreateEvent;
