import { Link } from 'react-router-dom';
import useFeed from '../features/videos/hooks/useFeed';
import VideoPreview from '../features/videos/components/VideoPreview';

const Feed = () => {
  const { videos, isLoading } = useFeed();
  if (isLoading || !videos?.length) return <FeedPlaceholder />;

  return (
    <section className="grid grid-cols-5 gap-2 p-5">
      {videos?.map((video) => <VideoPreview key={video.id} video={video} />)}
    </section>
  );
};

const FeedPlaceholder = () => {
  return (
    <section className="grid grid-cols-6 gap-5 p-5">
      {Array(30)
        .fill(0)
        .map((_val, idx) => (
          <Link
            to="/video"
            key={idx}
            className="w-full aspect-video rounded-lg bg-var-bg-tertiary dark:bg-var-bg-tertiary-dark"
          ></Link>
        ))}
    </section>
  );
};

export default Feed;
