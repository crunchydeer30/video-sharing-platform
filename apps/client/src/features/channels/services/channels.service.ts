import axios from 'axios';
import { ChannelCreateBody } from '@shared/schemas';
import { Channel } from '@prisma/client';

const create = async (data: ChannelCreateBody): Promise<Channel> => {
  const response = await axios.post('api/channels', data);
  return response.data;
};

const getById = async (id: string): Promise<Channel> => {
  const response = await axios.get(`api/channels/${id}`);
  return response.data;
};

const getByHandle = async (handle: string): Promise<Channel | null> => {
  const response = await axios.get(`api/channels?forHandle=${handle}`);
  return response.data[0] || null;
};

const list = async (): Promise<Channel[]> => {
  const response = await axios.get('api/channels');
  return response.data;
};

export default { create, getById, list, getByHandle };
