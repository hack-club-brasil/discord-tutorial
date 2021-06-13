import Discord from 'discord.js';
import dotenv from 'dotenv';

import eventManager from './events/manager';

dotenv.config();
const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});

eventManager.events.forEach(event => {
  if (event.once) {
    client.once(event.name, event.execute.bind(null, client));
    return;
  }
  client.on(event.name, event.execute.bind(null, client));
});

client.login(process.env.DISCORD_API_TOKEN);
