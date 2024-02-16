import { useQuery } from '@tanstack/react-query';
import authService from '../services/auth.service';

const useAccounts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['accounts'],
    queryFn: authService.getAccounts
  });

  return {
    accounts: data,
    isLoading
  };
};

export default useAccounts;
