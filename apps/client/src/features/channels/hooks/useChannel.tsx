import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import channelsService from '../services/channels.service';

const useChannel = () => {
  const { handle } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['channel', handle],
    queryFn: () => {
      if (!handle) return null;
      return channelsService.getByHandle(handle);
    }
  });

  return {
    channel: data,
    isLoading
  };
};

export default useChannel;
