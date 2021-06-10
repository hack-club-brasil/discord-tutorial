# Clippy for Discord

🇧🇷 Você é do Brasil? Não se preocupe, temos uma versão traduzida para você! Clique [aqui](docs/pt-BR_README.md)! 🇧🇷

:warning: **Warning: This is still a work in progress! (WIP)** :warning:

## Setup

To setup this project, you need to install Node.js and a package manager (like NPM or Yarn) on your machine. This was built around Node.js 14.17.0 LTS and NPM 7.16.0.

First, install all the dependencies, using `npm install` or `yarn install`.
Then, it's time to run our project, but first you have to set your Discord token on your environment variables entitled as `DISCORD_API_TOKEN`. As an alternative, you can also create a copy of `.env.example` calling it `.env` and fill the corresponding field with your token.

To run this project, you can run `npm run dev` or `yarn dev`.

## Contributing

Do you want to contribute to this project? Awesome! To ensure the best quality possible for this project, we created a flow of development of new features, so you will not work on a feature that will not be implemented.
Here are the steps to contribute:

1. Create a new issue on GitHub about the feature you want to contribute (before doing this, make sure someone has not create one issue about the same feature yet).
2. Provide the most amount of details as possible describing the feature.
3. Wait until our team make sure this can be implemented and if this will be good to the members of our community. In the meantime, we can make some questions about it or even suggest some changes.
4. After our team's approval, start to develop the project on a fork, trying to follow the code patterns already stablished (and remember to execute `npm run lint` or `yarn lint` at the end of the development to lint the project based on the configurations defined to this project).
5. Create a PR (pull request) on this GitHub repository to `staging` branch, so we can test it internally before deploying to production.

PS: We don't have a pattern to name commits, so feel free to write it as you want :)

PS 2: While all this rules have been stablished, they are not exactly requirements, so your PR will not be necessarily closed because you forgot one of them. But in the meanwhile, these are important to save us time to implement new features!

In case you want to fix a bug, you can follow the steps above too (or if that's really simple you can open a PR directly), but we're also available through email, so feel free to send a message to [oi@hackclubbrasil.com.br](mailto:oi@hackclubbrasil.com.br) if you think it's necessary.
