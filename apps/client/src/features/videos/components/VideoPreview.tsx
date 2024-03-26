import { Video } from '@prisma/client';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useState } from 'react';

interface VideoPreviewProps {
  video: Video;
  className?: string;
}

const VideoPreview = (props: VideoPreviewProps) => {
  const className = [
    'flex',
    'flex-col',
    'gap-3',
    'w-full',
    'rounded-xl',
    'overflow-hidden',
    'text-inherit',
    'font-semibold',
    'text-lg',
    'focus:bg-var-bg-tertiary',
    'dark:focus:bg-var-bg-tertiary-dark',
    'transition-all',
    'p-2',
    'duration-300'
  ];

  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const previewRef = useRef<HTMLVideoElement>(null);

  if (props.className) className.push(props.className);

  const startPreview = () => {
    setIsPreviewActive(true);
    previewRef.current?.play();
  };

  const stopPreview = () => {
    setIsPreviewActive(false);
    previewRef.current?.load();
  };

  return (
    <article
      className={className.join(' ')}
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
    >
      <Link to={`/videos/${props.video.id}`}>
        <img
          src={props.video.thumbnail}
          alt="thumbnail"
          className={`block rounded-xl aspect-video ${!isPreviewActive ? '' : 'hidden'}`}
        />
        <video
          ref={previewRef}
          loop
          muted
          className={`block rounded-xl aspect-video ${!isPreviewActive ? 'hidden' : ''}`}
          src={props.video.preview as string}
        />
      </Link>

      <Link to={`/videos/${props.video.id}`}>{props.video.title}</Link>
    </article>
  );
};

export default VideoPreview;
