import { useQuery } from '@tanstack/react-query';
import videosService from '../services/videos.service';

const useFeed = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['feed'],
    queryFn: videosService.getAll
  });

  return {
    videos: data,
    isLoading
  };
};

export default useFeed;
