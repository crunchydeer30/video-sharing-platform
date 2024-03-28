import { VideoSchema } from '@shared/schemas';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useState } from 'react';

interface VideoPreviewProps {
  video: VideoSchema;
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
      <Link to={`/videos/${props.video.id}`} className="relative">
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
        <p className="absolute bottom-1 right-1 text-xs bg-black bg-opacity-70 p-1 rounded-md">
          00:08
        </p>
      </Link>

      <section className="flex gap-3">
        <Link
          to={`/channels/${props.video.channel.handle}`}
          className="rounded-full w-9 h-9 block overflow-hidden"
        >
          <img
            src={props.video.channel.image}
            alt="image"
            className="w-full h-full"
          />
        </Link>
        <div className="flex flex-col">
          <Link to={`/videos/${props.video.id}`} className="font-semibold">
            {props.video.title}
          </Link>
          <Link
            to={`/channels/${props.video.channel.handle}`}
            className="text-sm text-var-text-secondary-dark"
          >
            {props.video.channel.title}
          </Link>
          <p className="text-sm text-var-text-secondary-dark">
            103K views · 1 day ago
          </p>
        </div>
      </section>
    </article>
  );
};

export default VideoPreview;
