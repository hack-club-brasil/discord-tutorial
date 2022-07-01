import { MessageActionRow, MessageButton } from 'discord.js';
import ITutorialData from '../interfaces/ITutorialData';

export default async function presentCodeOfConductService(
  tutorialData: ITutorialData,
): Promise<void> {
  const { tutorialChannel, teamRole, staffChannel } = tutorialData;

  const codeOfConductButtons = new MessageActionRow().addComponents([
    new MessageButton()
      .setLabel('Ler Código de Conduta')
      .setStyle('LINK')
      .setURL('https://brasil.hackclub.com/codigo-de-conduta/'),
    new MessageButton()
      .setCustomId('acceptCodeOfConduct')
      .setLabel('Aceitar Código de Conduta')
      .setStyle('SUCCESS'),
  ]);

  await tutorialChannel.send({
    content:
      '*Chegando nos portões do Hack Club Brasil, você vê uma placa. Nela, está escrito:*\n\n' +
      '> Trate todos com respeito\n' +
      '> Pense em como se comunica com os outros\n' +
      '> Não seja destrutivo ou tóxico\n' +
      '> Se encontrar algum problema, por favor contate brasil@hackclub.com\n' +
      `> Se tiver alguma dúvida ou dificuldade, o pessoal do ${teamRole.toString()} pode ajudar\n` +
      `> Chame-os diretamente, ou mande uma mensagem em ${staffChannel.toString()}\n` +
      '> E acima de tudo, siga os Valores Hacker\n' +
      '> Aceite nossos valores, e o portão se abrirá\n\n' +
      '*Você então vai até a frente do portão para continuar seu caminho.*',
    components: [codeOfConductButtons],
  });
}
