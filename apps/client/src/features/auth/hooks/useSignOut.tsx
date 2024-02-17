import { useMutation } from '@tanstack/react-query';
import authService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const useSignOut = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: signOut } = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      navigate('/');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  });
  return signOut;
};

export default useSignOut;
