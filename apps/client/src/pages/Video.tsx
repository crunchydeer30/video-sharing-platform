import React from 'react';
import { APITypes } from 'plyr-react';
import VideoPlayer from '../features/videos/hooks/VideoPlayer';
import Hls from 'hls.js';
import 'plyr-react/plyr.css';
import { useParams } from 'react-router-dom';

const Video = () => {
  const ref = React.useRef<APITypes>(null);
  const supported = Hls.isSupported();
  const { id } = useParams();

  const videoOptions = {
    settings: ['captions', 'quality', 'loop']
  };
  const videoSource = null;
  const hlsSource = `https://b62f09b8-0d96-4852-ba07-aa435108b82f.selstorage.ru/${id}/master.m3u8`;

  return (
    <div className="wrapper w-[800px]">
      {supported ? (
        <VideoPlayer
          ref={ref}
          source={videoSource}
          options={videoOptions}
          hlsSource={hlsSource}
        />
      ) : (
        'HLS is not supported in your browser'
      )}
    </div>
  );
};

export default Video;
