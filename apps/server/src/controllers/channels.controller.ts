import { Request, Response, NextFunction } from 'express';
import channelsService from '../services/channels.service';
import { ChannelCreateBody } from '@shared/schemas';

const list = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Channels']
    #swagger.summary = 'List channels'
    #swagger.description = 'List channels'
    #swagger.parameters['query'] = {
      in: 'query',
      required: false,
      schema: { $ref: '#/components/schemas/ChannelListQuery' }
    }
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: "#/components/schemas/Channel" } 
    }
  */

  try {
    const { query } = req;
    const channels = await channelsService.list(query);
    res.status(200).json(channels);
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Channels']
    #swagger.summary = 'Get a channel'
    #swagger.description = 'Get a channel'
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: "#/components/schemas/Channel" } 
    }
    #swagger.responses[404] = {
      description: 'Channel not found',
    }
  */

  try {
    const { id } = req.params;
    const channel = await channelsService.getById(id);
    res.status(200).json(channel);
  } catch (error) {
    next(error);
  }
};

const getByAccountId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /*
    #swagger.tags = ['Channels']
    #swagger.summary = 'Get channel by account id'
    #swagger.description = 'Get channel by account id'
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: "#/components/schemas/Channel" } 
    }
    #swagger.responses[404] = {
      description: 'Channel not found',
    }
  */

  try {
    const { accountId } = req.params;
    const channel = await channelsService.getByAccountId(accountId);
    res.status(200).json(channel);
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Channels']
    #swagger.summary = 'Create a channel'
    #swagger.description = 'Create a channel'
    #swagger.requestBody = {
      required: true,
      schema: { $ref: '#/components/schemas/ChannelCreateBody' }
    }
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: "#/components/schemas/Channel" } 
    }
  */

  try {
    const accountId = res.locals.userId as string;
    if (!accountId)
      res.status(401).json({ code: 401, message: 'Unauthorized' });

    const data = req.body as ChannelCreateBody;
    const channel = await channelsService.create(data, accountId);
    res.status(200).json(channel);
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Channels']
    #swagger.summary = 'Remove a channel'
    #swagger.description = 'Remove a channel'
    #swagger.responses[204] = {
      description: 'Channel deleted successfully',
    }
    #swagger.responses[404] = {
      description: 'Channel not found',
    }
    #swagger.responses[409] = {
      description: 'You are not the owner of this channel',
    }
  */

  try {
    const userId = res.locals.userId as string;
    if (!userId) res.status(401).json({ code: 401, message: 'Unauthorized' });

    const { id } = req.params;
    await channelsService.remove(id, userId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Channels']
    #swagger.summary = 'Update a channel'
    #swagger.description = 'Update a channel'
    #swagger.requestBody = {
      required: true,
      schema: { $ref: '#/components/schemas/ChannelUpdateBody' }
    }
    #swagger.responses[200] = {
      description: 'Channel updated successfully',
      schema: { $ref: "#/components/schemas/Channel" }
    }
    #swagger.responses[404] = {
      description: 'Channel not found',
    }
    #swagger.responses[409] = {
      description: 'You are not the owner of this channel',
    }
  */

  try {
    const userId = res.locals.userId as string;
    if (!userId) res.status(401).json({ code: 401, message: 'Unauthorized' });

    const { id } = req.params;
    const data = req.body as ChannelCreateBody;
    const channel = await channelsService.update(id, data, userId);
    res.status(200).json(channel);
  } catch (error) {
    next(error);
  }
};

export default {
  list,
  getById,
  getByAccountId,
  create,
  remove,
  update
};
