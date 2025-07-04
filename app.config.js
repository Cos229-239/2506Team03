import 'dotenv/config';
import appJson from './app.json';

export default {
  ...appJson,
  extra: {
    ...(appJson.extra || {}),
  }
};