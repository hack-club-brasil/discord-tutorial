import Airtable from 'airtable';
import { Message } from 'discord.js';

export default async function checkTutorialAnswerService(
  message: Message,
): Promise<boolean> {
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
    throw new Error('Missing AIRTABLE_API_KEY or AIRTABLE_BASE_ID');
  }

  const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  const base = airtable.base(process.env.AIRTABLE_BASE_ID);

  const [userRecord] = await base('Users')
    .select({
      fields: [
        'Discord ID',
        'Onboard Channel ID',
        'Current Onboarding Step',
        'Is Student?',
      ],
      filterByFormula: `{Onboard Channel ID} = "${message.channel.id}"`,
    })
    .all();

  if (!userRecord) {
    return false;
  }

  if (userRecord.fields['Discord ID'] !== message.author.id) {
    return false;
  }

  if (
    userRecord.fields['Current Onboarding Step'] !==
    'Not student disclaimer acknowledged'
  ) {
    if (
      userRecord.fields['Current Onboarding Step'] ===
      'Student question answered'
    ) {
      if (!userRecord.fields['Is Student?']) return false;
    } else {
      return false;
    }
  }

  return true;
}
