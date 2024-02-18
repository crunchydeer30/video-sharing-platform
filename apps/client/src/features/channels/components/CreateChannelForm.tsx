import { channelCreateBody, ChannelCreateBody } from '@shared/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useCreateChannel from '../hooks/useCreateChannel';
import Input from '../../../ui/Form/Input/Input';

const CreateChannelForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ChannelCreateBody>({
    resolver: zodResolver(channelCreateBody)
  });

  const createChannel = useCreateChannel();

  const onSubmit = (data: ChannelCreateBody) => {
    createChannel(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 text-inherit w-[700px] p-5 rounded-xl bg-var-bg-secondary \
      dark:bg-var-bg-secondary-dark border border-var-bg-tertiary dark:border-var-bg-tertiary-dark shadow-lg"
    >
      <h1 className="text-2xl font-bold">How you'll appear</h1>

      <section className="self-center w-[500px] mt-20 mb-12 flex flex-col gap-6">
        <div className="bg-var-bg-tertiary w-32 h-32 rounded-full self-center"></div>
        <button type="button">Upload picture</button>

        <Input
          name="Title"
          type="text"
          placeholder="Title"
          label="Title"
          register={register('title')}
          error={errors.title}
        />

        <Input
          name="handle"
          type="text"
          placeholder="Handle"
          label="Handle"
          register={register('handle')}
          error={errors.handle}
        />
      </section>

      <button
        type="submit"
        className="self-end text-blue-500 font-semibold hover:text-blue-600 transition-colors"
      >
        Create channel
      </button>
    </form>
  );
};

export default CreateChannelForm;
