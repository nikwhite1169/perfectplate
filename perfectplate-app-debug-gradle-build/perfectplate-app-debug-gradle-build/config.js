import Constants from 'expo-constants';
import { config as dotenvConfig } from 'dotenv';

/*if (!Constants.manifest.extra) {
  dotenvConfig();
}*/

const GPT_API_KEY = process.env.GPT_API_KEY;

export { GPT_API_KEY };
export default {
    GOOGLE_VISION_API_KEY: 'AIzaSyDwMCT2RAur7jB8zX50eYiyBVNV3yKWi0w',
  };
  