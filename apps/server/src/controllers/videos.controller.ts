import { Request, Response, NextFunction } from 'express';
import videosService from '../services/videos.service';

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

    await videosService.create(file, accountId);

    return res.status(201).json({
      message: 'Video uploaded successfully'
    });
  } catch (error) {
    return next(error);
  }
};

export default {
  upload
};
