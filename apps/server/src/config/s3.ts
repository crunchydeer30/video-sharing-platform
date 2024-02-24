import config from '.';
import { S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY
  },
  endpoint: 'https://s3.storage.selcloud.ru',
  forcePathStyle: true,
  region: 'ru-1',
  apiVersion: 'latest'
});

export default s3;
