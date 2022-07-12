# Toriel para Discord

:warning: **Alerta: Seja cuidadoso ao modificar comandos com barra, as mudanças podem levar até uma hora para ter efeito! Quando estiver fazendo testes, defina uma variável de ambiente SLASH_GUILD para o ID do servidor que você está utilizando para testar!** :warning:

## Inicialização

Para inicializar esse projeto, você precisa instalar o Node.js e um gerenciador de pacotes em sua máquina. O que foi desenvolvido aqui foi escrito baseado na versão 16.15.1 LTS do Node.js junto com o NPM 8.11.0.

Primeiro, instale todas as dependências, utilizando `npm install` ou `yarn install`.
Agora é hora de inicializar nosso projeto, mas antes, você precisa configurar seu token do Discord nas suas variáveis de ambiente, definindo-o como `DISCORD_API_TOKEN`. Uma alternativa é criar uma cópia do arquivo, `.env.example` chamando-a de `.env` e preencher o campo correspondente com seu token.

Para iniciar o projeto, basta executar `npm run dev` ou `yarn dev`.

## Contribuições

Você deseja contribuir para este projeto? Sensacional! Para garantir a melhor qualidade de código em nossos projetos, criamos um fluxo para o desenvolvimento de novos recursos, assim você também não vai ter que trabalhar em algo que pode nem ser implementado.
Aqui seguem os passos para fazer sua contribuição:

1. Crie uma nova issue (aqui no GitHub) sobre o recurso que você deseja criar (antes de fazer isso, veja se alguém já não criou uma issue sugerindo o mesmo recurso).
2. Detalhe na descrição da melhor forma possível o recurso.
3. Aguarde nossa equipe verificar se a implementação disso é viável e vai agregar valor para os membros da comunidade. No meio do processo, podemos fazer perguntas sobre o recurso, ou sugerir mudanças.
4. Após aprovação da nossa equipe, desenvolva o projeto num fork do repositório, tentando seguir os padrões de código já estabelecidos (e lembre-se de executar `npm run lint` ou `yarn lint` ao final do projeto para formatar o código baseado na configuração do projeto)
5. Crie uma PR (pull request) neste repositório do GitHub para a branch `staging`, assim poderemos testar internamente a melhoria antes de efetivamente colocarmos no ar.

Nota: Não temos um padrão para nomear commits, portanto, sinta-se livre para escrevê-los da forma que desejar :)

Nota 2: Embora todos esses padrões tenham sido estabelecidos, não significa que sua PR será negada se esquecer de algum, mas seguir eles nos ajuda a poupar tempo na implementação de novos recursos!

Caso deseje corrigir um problema, você pode seguir os passos acima da mesma forma (ou se for uma correção bem simples, pode abrir a PR diretamente), mas estaremos também disponíveis para contato por e-mail, então sinta-se livre caso deseje enviar uma mensagem para [brasil@hackclub.com](mailto:brasil@hackclub.com) se achar necessário.

