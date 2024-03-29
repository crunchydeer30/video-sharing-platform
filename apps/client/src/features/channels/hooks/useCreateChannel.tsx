import { useMutation, useQueryClient } from '@tanstack/react-query';
import channelsService from '../services/channels.service';
import toast from 'react-hot-toast';
import { toastErrorMessage } from '../../../utils/toast';
import { ChannelCreateBody } from '@shared/schemas';
import { useNavigate } from 'react-router-dom';

const useCreateChannel = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: createChannel } = useMutation({
    mutationFn: async (data: ChannelCreateBody) => {
      return await toast.promise(channelsService.create(data), {
        loading: 'Creating channel...',
        success: 'Channel created successfully',
        error: (error: unknown) => toastErrorMessage(error)
      });
    },
    onMutate: () => {},
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['channels'] });
      navigate(`/channels/${data.handle}`);
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  });
  return createChannel;
};

export default useCreateChannel;
