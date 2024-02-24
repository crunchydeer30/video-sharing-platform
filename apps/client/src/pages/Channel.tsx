import useChannel from '../features/channels/hooks/useChannel';

const Channel = () => {
  const { channel, isLoading } = useChannel();

  if (isLoading) return <h1>Loading...</h1>;
  if (!channel) return <h1>Channel Not found</h1>;

  return (
    <section className="max-w-7xl mx-auto px-5 py-10">
      <section className="flex gap-8">
        <div className="w-40 h-40 rounded-full overflow-hidden">
          <img src={channel.image} className="w-full h-full" alt="avatar" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">{channel.title}</h1>
          <p className="text-var-text-secondary dark:text-var-text-secondary-dark">
            {channel.handle}
          </p>
          {channel.description && (
            <p className="text-var-text-secondary dark:text-var-text-secondary-dark">
              {channel.description}
            </p>
          )}
          {!channel.description && (
            <p className="text-var-text-secondary dark:text-var-text-secondary-dark">
              No description
            </p>
          )}
        </div>
      </section>
    </section>
  );
};

export default Channel;
