import 'dotenv/config';
import appJson from './app.json';

export default {
  ...appJson,
  extra: {
    ...(appJson.extra || {}),
    googleApiKey: process.env.GOOGLE_API_KEY,
  }
};