import axios from 'axios';
import { ChannelCreateBody } from '@shared/schemas';

const create = async (data: ChannelCreateBody) => {
  const response = await axios.post('api/channels', data);
  return response.data;
};

export default { create };
