import React from 'react';
import { APITypes } from 'plyr-react';
import VideoPlayer from '../features/videos/components/VideoPlayer';
import 'plyr-react/plyr.css';
import { useParams } from 'react-router-dom';

const Video = () => {
  const ref = React.useRef<APITypes>(null);
  const { id } = useParams();

  const videoOptions = {
    settings: ['captions', 'quality', 'loop']
  };
  const videoSource = null;
  const hlsSource = `https://b62f09b8-0d96-4852-ba07-aa435108b82f.selstorage.ru/${id}/master.m3u8`;

  return (
    <section className="px-4 py-8 max-w-[1700px] mx-auto">
      <section className="w-full flex gap-8">
        <section className="w-full rounded-xl overflow-hidden">
          <VideoPlayer
            ref={ref}
            source={videoSource}
            options={videoOptions}
            hlsSource={hlsSource}
          />
        </section>
        <section className="w-[400px] flex flex-col gap-4">
          {Array(10)
            .fill(0)
            .map((_val, idx) => (
              <div
                key={idx}
                className="bg-var-bg-secondary dark:bg-var-bg-secondary-dark w-full aspect-[21/9] rounded-xl"
              ></div>
            ))}
        </section>
      </section>
    </section>
  );
};

export default Video;
