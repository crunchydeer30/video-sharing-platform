import axios from 'axios';
import { Video } from '@prisma/client';

const getAll = async (): Promise<Video[]> => {
  const response = await axios.get('api/videos/');
  return response.data;
};

export default { getAll };
