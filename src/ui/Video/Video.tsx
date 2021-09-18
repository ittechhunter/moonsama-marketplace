import { VideoHTMLAttributes } from 'react';
import { useStyles } from './Video.styles';

export const Video = (props: VideoHTMLAttributes<any>) => {
  const { video } = useStyles();
  return (
    <video
      autoPlay
      muted
      loop
      controls
      {...props}
      className={`${video} ${props.className || ''}`}
    />
  );
};
