import Discord from 'discord.js';
import dotenv from 'dotenv';

import { IBaseEvent } from './interfaces/IEvent';

import eventManager from './events/manager';

dotenv.config();

const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

const events = eventManager.events as IBaseEvent[];

events.forEach(event => {
  if (event.once) {
    client.once(event.name, event.execute.bind(null, client));
    return;
  }

  client.on(event.name, event.execute.bind(null, client));
});

client.login(process.env.DISCORD_API_TOKEN);
