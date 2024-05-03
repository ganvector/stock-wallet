import 'dotenv/config';

const mongodbUri = process.env.MONGODB_URI;
if (!mongodbUri) {
  throw new Error('MONGODB_URI variable is required');
}
let nodeEnv = process.env.NODE_ENV;
if (!nodeEnv) {
  nodeEnv = 'development';
}

export const CONFIG = Object.freeze({
  MONGODB_URI: mongodbUri,
  NODE_ENV: nodeEnv,
});
