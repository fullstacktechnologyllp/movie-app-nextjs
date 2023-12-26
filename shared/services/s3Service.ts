import { AWS_CREDS } from '../constants';
import { S3 } from '@aws-sdk/client-s3';

class S3Service {
  client;
  constructor() {
    try {
      this.client = new S3({
        region: AWS_CREDS.REGION,
        credentials: {
          accessKeyId: AWS_CREDS.ACCESS_KEY_ID,
          secretAccessKey: AWS_CREDS.SECRET_ACCESS_KEY,
        },
      });
    } catch (error) {
      console.error('[S3Service]:[main]', error);
    }
  }

  /**
   * Upload file to s3 storage
   * @param params 
   */
  async upload(params: { fileName: string; file: Buffer; }) {
    try {
      await this.client?.putObject({
        Bucket: AWS_CREDS.BUCKET_NAME,
        Key: params.fileName,
        Body: params.file,
        ACL: 'public-read'
      });
    } catch (error) {
      console.error('[S3Service]:[upload]', error);
      throw error;
    }
  }
}

export const s3Service = new S3Service();
