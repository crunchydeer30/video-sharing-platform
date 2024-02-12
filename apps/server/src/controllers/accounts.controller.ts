import { Request, Response, NextFunction } from 'express';
import accountsService from '../services/accounts.service';
import { AccountCreateBody } from '@shared/schemas';

const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Accounts']
    #swagger.summary = 'Get all accounts'
    #swagger.description = 'Get all accounts'
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: "#/components/schemas/AccountNonSensitive" } 
    }
  */

  try {
    const accounts = await accountsService.getAll();
    res.status(200).json(accounts);
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Accounts']
    #swagger.summary = 'Get an account'
    #swagger.description = 'Get an account'
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: "#/components/schemas/AccountNonSensitive" } 
    }
    #swagger.responses[404] = {
      description: 'Account not found',
    }
  */

  try {
    const { id } = req.params;
    const account = await accountsService.getById(id);
    res.status(200).json(account);
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Accounts']
    #swagger.summary = 'Create an account'
    #swagger.description = 'Create an account'
    #swagger.requestBody = {
      required: true,
      schema: { $ref: '#/components/schemas/AccountCreateBody' }
    }
    #swagger.responses[201] = {
      description: 'Account created successfully',
      description: 'OK',
      schema: { $ref: "#/components/schemas/AccountNonSensitive" } 
    }
    #swagger.responses[409] = {
      description: 'Account already exists',
    }
  */

  try {
    const data = req.body as AccountCreateBody;
    const account = await accountsService.create(data);
    res.status(201).json(account);
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Accounts']
    #swagger.summary = 'Remove an account'
    #swagger.description = 'Remove an account'
    #swagger.responses[204] = {
      description: 'Account deleted successfully',
    }
    #swagger.responses[404] = {
      description: 'Account not found',
    }
  */

  try {
    const { id } = req.params;
    await accountsService.remove(id);
    res.status(204).json({
      message: 'Account deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  getById,
  getAll,
  remove
};
