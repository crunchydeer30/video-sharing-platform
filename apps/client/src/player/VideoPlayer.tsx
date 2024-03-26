import React from 'react';
import useHls from './useHls';
import { APITypes, PlyrProps, usePlyr } from 'plyr-react';

const VideoPlayer = React.forwardRef<
  APITypes,
  PlyrProps & { hlsSource: string }
>((props, ref) => {
  const { source, options = null, hlsSource } = props;
  const raptorRef = usePlyr(ref, {
    ...useHls(hlsSource, options),
    source
  }) as React.MutableRefObject<HTMLVideoElement>;
  return <video ref={raptorRef} className="plyr-react plyr" />;
});

export default VideoPlayer;
