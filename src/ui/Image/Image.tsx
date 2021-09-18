import { ImgHTMLAttributes, useEffect, useState } from 'react';
import { useStyles } from './Image.styles';
import { Placeholder } from 'ui';

export const Image = (props: ImgHTMLAttributes<any>) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const { image, imageNotShow } = useStyles();

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <>
      {!loaded && <Placeholder />}
      <img
        onLoad={handleLoad}
        onError={handleLoad}
        alt=""
        {...props}
        className={`${image} ${props.className || ''} ${!loaded ? imageNotShow : ''}`}
      />
    </>
  );
};
