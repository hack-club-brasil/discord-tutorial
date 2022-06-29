import Discord from 'discord.js';

export interface IBaseEvent {
  name: string;
  once: boolean;
  // Necessary because of Discord specification :/
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute: (client: Discord.Client, ...args: any) => void;
}

export default interface IEvent<K extends keyof Discord.ClientEvents>
  extends IBaseEvent {
  name: K;
  once: boolean;
  execute: (client: Discord.Client, ...args: Discord.ClientEvents[K]) => void;
}
