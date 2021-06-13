import Discord from 'discord.js';

export default interface IEvent<T extends keyof Discord.ClientEvents> {
  name: T;
  once: boolean;
  execute: (
    client: Discord.Client,
    ...args: Discord.ClientEvents[T] | []
  ) => void;
}
