import { useMutation, useQueryClient } from '@tanstack/react-query';
import authService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { LoginBody } from '@shared/schemas';
import toast from 'react-hot-toast';
import { toastErrorMessage } from '../../../utils/toast';

const useSignIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signIn } = useMutation({
    mutationFn: async (data: LoginBody) => {
      await toast.promise(authService.login(data), {
        loading: 'Signing in...',
        success: 'Signed in successfully',
        error: (error: unknown) => toastErrorMessage(error)
      });
    },
    onSuccess: async () => {
      const user = await authService.me();
      queryClient.setQueryData(['user'], user);
      navigate('/');
    }
  });

  return signIn;
};

export default useSignIn;
