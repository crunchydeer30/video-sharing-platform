import { Request, Response, NextFunction } from 'express';
import { LoginBody } from '@shared/schemas';
import authService from '../services/auth.service';
import accountsService from '../services/accounts.service';
import { AccountCreateBody } from '@shared/schemas';

const login = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Login'
    #swagger.description = 'Login'
    #swagger.requestBody = {
      required: true,
      schema: { $ref: '#/components/schemas/LoginBody' }
    }
    #swagger.responses[200] = {
      description: 'OK',
      schema: { "message": "Logged in succesfully" } 
    }
  */

  try {
    const data = req.body as LoginBody;
    const account = await authService.login(data);

    req.session.userId = account.id;
    res.status(200).json({ message: 'Logged in succesfully' });
  } catch (e) {
    return next(e);
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Register'
    #swagger.description = 'Register'
    #swagger.requestBody = {
      required: true,
      schema: { $ref: '#/components/schemas/LoginBody' }
    }
    #swagger.responses[200] = {
      description: 'OK',
      schema: { "message": "Registered succesfully" } 
    }
  */

  try {
    const data = req.body as AccountCreateBody;
    const account = await accountsService.create(data);
    req.session.userId = account.id;
    res.status(200).json({ message: 'Registered succesfully' });
  } catch (e) {
    return next(e);
  }
};

const logout = (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Logout'
    #swagger.description = 'Logout'
    #swagger.responses[200] = {
      description: 'OK',
      schema: { "message": "Logged out succesfully" } 
    }
  */

  try {
    req.session.destroy(() => {
      res
        .clearCookie('sessionId', {
          path: '/'
        })
        .status(200)
        .json({
          message: 'Logged out succesfully'
        });
    });
  } catch (e) {
    return next(e);
  }
};

export default {
  login,
  register,
  logout
};
