import { client } from './client';

const token = process.env.VUE_APP_TELEGRAM_TOKEN
const chatId = process.env.VUE_APP_TELEGRAM_CHAT_ID

export const sendMessageToTelegram = async (text: string): Promise<void> => {
  return await client.post(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}&parse_mode=html`);
};
