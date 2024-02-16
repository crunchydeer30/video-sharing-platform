import { Request, Response, NextFunction } from 'express';

export const auth = {
  optional: (_req: Request, _res: Response, next: NextFunction) => {
    return next();
  },
  required: (req: Request, res: Response, next: NextFunction) => {
    /*
      #swagger.security = [{ SessionAuth: [] }]
    */

    if (!req.session.userId) {
      return res.status(401).json({ code: 401, message: 'Unauthorized' });
    }
    res.locals.userId = req.session.userId;
    return next();
  }
};
