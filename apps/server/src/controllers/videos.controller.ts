import { Request, Response, NextFunction } from 'express';
import videosService from '../services/videos.service';
import transcodeVideo from '../utils/tanscode';

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const videos = await videosService.list(req.query);
    res.status(200).json(videos);
  } catch (e) {
    next(e);
  }
};

const upload = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Videos']
    #swagger.summary = 'Upload a video'
    #swagger.description = 'Upload a video'
    #swagger.responses[201] = {
      description: 'Video uploaded successfully',
    }
    #swagger.responses[400] = {
      description: 'No file uploaded',
    }
  */
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    const accountId = res.locals.userId as string;

    if (!accountId)
      return res.status(401).json({ code: 401, message: 'Unauthorized' });

    const video = await videosService.create(file, accountId);

    void transcodeVideo(file.path, video.id);

    return res.status(201).json({
      message: 'Video uploaded successfully'
    });
  } catch (error) {
    return next(error);
  }
};

export default {
  list,
  upload
};
