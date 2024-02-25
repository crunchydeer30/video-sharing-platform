import fs from 'fs';
import { TRANSCODING_DIR, TRANSCODING_RESOLUTIONS } from '../config/videos';
import { TranscodingStatus as Status } from '@prisma/client';
import {
  updatePreview,
  updateThumbnail,
  updateTranscodingStatus
} from '../services/videos.service';

import ffmpeg from '../config/ffmpeg';
import { FfprobeData } from 'fluent-ffmpeg';

import s3 from '../config/s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import config from '../config';

/*
  Transcode files to all available resolutions and update file status
*/

const transcodeVideo = async (inputFilePath: string, fileId: string) => {
  fs.mkdirSync(`${TRANSCODING_DIR}/${fileId}`);

  fs.writeFileSync(
    `${TRANSCODING_DIR}/${fileId}/master.m3u8`,
    '#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-PLAYLIST-TYPE:VOD\n'
  );

  await createPreview(inputFilePath, fileId);
  await updatePreview(fileId, `${config.AWS_S3_BUCKET}/${fileId}/preview.mp4`);

  await createThumbnail(inputFilePath, fileId);
  await updateThumbnail(
    fileId,
    `${config.AWS_S3_BUCKET}/${fileId}/thumbnail.png`
  );

  const resolutions = await getAvailableReslutions(inputFilePath);

  for (const resolution of resolutions) {
    await updateTranscodingStatus(fileId, resolution, Status.NOT_STARTED);
  }

  for (const resolution of resolutions) {
    try {
      await transcodeSync(inputFilePath, fileId, resolution);
      await updateManifest(fileId, resolution);
      await updateTranscodingStatus(fileId, resolution, Status.COMPLETED);
    } catch (e) {
      await updateTranscodingStatus(fileId, resolution, Status.FAILED);
      throw new Error('Transcoding failed');
    }
  }

  fs.rmSync(inputFilePath, { force: true });
  await uploadToS3(fileId);
};

/*
  Transcode video to specified resolution preserving aspect ratio, compress it, limit FPS to 30 and encode it to hls
*/

const transcodeSync = (
  inputFilePath: string,
  fileId: string,
  resolution: number
) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputFilePath)
      .addOption('-f hls')
      .addOption('-hls_time 5')
      .addOption('-hls_list_size 0')
      .addOption('-vcodec libx264')
      .addOption('-g 30')
      .addOption('-preset ultrafast')
      .addOption('-crf 20')
      .addOption(`-vf scale=-2:${resolution}`)
      .output(`${TRANSCODING_DIR}/${fileId}/${resolution}p.m3u8`)
      .on('start', () => {
        console.log(`Transcoding to ${resolution}p STARTED!`);
      })
      .on('error', (err) => {
        console.log(`Transcoding to ${resolution}p ERROR!`);
        reject(err);
      })
      .on('end', () => {
        resolve(true);
      })
      .run();
  });
};

/*
  Take a screenshot from a video to create thumbnail
*/

const createThumbnail = async (inputFilePath: string, fileId: string) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputFilePath)
      .screenshot({
        count: 1,
        folder: `${TRANSCODING_DIR}/${fileId}`,
        size: '480x270',
        filename: 'thumbnail.png'
      })
      .on('error', (err) => {
        reject(err);
      })
      .on('end', () => {
        resolve(true);
      });
  });
};

/*
  Get information about video
*/

export const probeFileSync = (inputFilePath: string): Promise<FfprobeData> => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputFilePath).ffprobe(function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

/*
  Get list of available resolutions
*/

export const getAvailableReslutions = async (
  inputFilePath: string
): Promise<number[]> => {
  const data = await probeFileSync(inputFilePath);
  const height = data.streams[0].height as number;
  return TRANSCODING_RESOLUTIONS.filter((r) => r <= height);
};

/*
  Append information about current resolution to master.m3u8
*/

export const updateManifest = async (fileId: string, resolution: number) => {
  const outputProbeData = await probeFileSync(
    `${TRANSCODING_DIR}/${fileId}/${resolution}p.m3u8`
  );
  const videoData = outputProbeData.streams[0];

  fs.appendFileSync(
    `${TRANSCODING_DIR}/${fileId}/master.m3u8`,
    `#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=${videoData.height}00,RESOLUTION=${videoData.width}x${videoData.height}\n${resolution}p.m3u8\n`
  );
};

/*
  Upload transcoded files to S3
*/

const uploadToS3 = async (fileId: string) => {
  const files = fs.readdirSync(`${TRANSCODING_DIR}/${fileId}`);
  for (const file of files) {
    const filePath = `${TRANSCODING_DIR}/${fileId}/${file}`;
    const fileStream = fs.createReadStream(filePath);
    const params = {
      Bucket: 'videos',
      Key: `${fileId}/${file}`,
      Body: fileStream
    };
    try {
      await s3.send(new PutObjectCommand(params));
    } catch (e) {
      console.log(e);
      throw new Error('Upload to S3 failed');
    }
  }

  fs.rmSync(`${TRANSCODING_DIR}/${fileId}`, {
    recursive: true,
    force: true
  });
};

/*
  Create preview
*/

const createPreview = (inputFilePath: string, fileId: string) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputFilePath)
      .inputOptions(['-ss 3'])
      .outputOptions(['-t 3'])
      .addOption('-vf scale=480:-2')
      .noAudio()
      .output(`${TRANSCODING_DIR}/${fileId}/preview.mp4`)
      .on('start', () => {
        console.log('Preview STARTED!');
      })
      .on('error', (err) => {
        console.log('Preview ERROR!');
        reject(err);
      })
      .on('end', () => {
        console.log('Preview DONE!');
        resolve(true);
      })
      .run();
  });
};

export default transcodeVideo;
