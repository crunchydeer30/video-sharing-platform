import { useQuery } from '@tanstack/react-query';
import authService from '../services/auth.service';

const useUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: authService.me
  });

  return {
    user: data,
    isLoading
  };
};

export default useUser;
