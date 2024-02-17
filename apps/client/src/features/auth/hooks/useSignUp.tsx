import { useMutation } from '@tanstack/react-query';
import authService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { AccountCreateBody } from '@shared/schemas';
import toast from 'react-hot-toast';
import { toastErrorMessage } from '../../../utils/toast';

const useSignUp = () => {
  const navigate = useNavigate();

  const { mutate: signUp } = useMutation({
    mutationFn: async (data: AccountCreateBody) => {
      await toast.promise(authService.register(data), {
        loading: 'Signing up...',
        success: 'Signed up successfully',
        error: (error: unknown) => toastErrorMessage(error)
      });
    },
    onSuccess: () => {
      navigate('/login');
      toast.success('Please Sign In');
    }
  });

  return signUp;
};

export default useSignUp;
