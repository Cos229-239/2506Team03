import 'dotenv/config';
import appJson from './app.json';

export default {
  ...appJson,
  plugins: ["expo-font"],
  extra: {
    ...(appJson.extra || {}),
  },
};
