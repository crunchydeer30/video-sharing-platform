import { useMutation } from '@tanstack/react-query';
import authService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

const useSignUp = () => {
  const navigate = useNavigate();

  const { mutate: signUp } = useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      navigate('/login');
    }
  });

  return signUp;
};

export default useSignUp;
