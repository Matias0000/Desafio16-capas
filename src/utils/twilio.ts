import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;

export const twilioClient = twilio(accountSid, authToken);

export const sendSMS = async ({ body, from, to }: { body: string; from: string; to: string }) => {
  try {
    const message = await twilioClient.messages.create({
      body,
      from,
      to,
    });

    console.log(message);
  } catch (err) {
    console.log(err);
  }
};

export const sendWhatsApp = async ({
  body,
  from,
  to,
}: {
  body: string;
  from: string;
  to: string;
}) => {
  try {
    const message = await twilioClient.messages.create({
      body,
      from: `whatsapp:${from}`,
      to: `whatsapp:${to}`,
    });

    console.log(message);
  } catch (err) {
    console.log(err);
  }
};
