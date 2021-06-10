import Discord from 'discord.js';

import dotenv from 'dotenv';

dotenv.config();
const client = new Discord.Client();

client.on('ready', () => {
  console.log('Ready!');
});

client.login(process.env.DISCORD_API_TOKEN);
