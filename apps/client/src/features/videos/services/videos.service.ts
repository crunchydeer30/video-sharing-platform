import axios from 'axios';
import { VideoSchema } from '@shared/schemas';

const getAll = async (): Promise<VideoSchema[]> => {
  const response = await axios.get(
    'api/videos?include=channel&include=details'
  );
  return response.data;
};

export default { getAll };
