import { useMutation, useQueryClient } from '@tanstack/react-query';
import authService from '../services/auth.service';

const useSignIn = () => {
  const queryClient = useQueryClient();

  const { mutate: signIn } = useMutation({
    mutationFn: authService.login,
    onSuccess: async () => {
      const user = await authService.me();
      queryClient.setQueryData(['user'], user);
    }
  });

  return {
    signIn
  };
};

export default useSignIn;
