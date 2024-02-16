import { useMutation, useQueryClient } from '@tanstack/react-query';
import authService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

const useSignIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signIn } = useMutation({
    mutationFn: authService.login,
    onSuccess: async () => {
      const user = await authService.me();
      queryClient.setQueryData(['user'], user);
      navigate('/');
    }
  });

  return {
    signIn
  };
};

export default useSignIn;
