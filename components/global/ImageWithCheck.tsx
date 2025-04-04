import { useEffect, useState } from 'react';

interface Props {
  src: string;
  alt: string;
  borderRadius?: boolean;
  width: string;
  height: string;
}

const ImageWithCheck = ({ src, alt, borderRadius = true, width, height }: Props) => {
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (!src) return setIsValid(false);

    const img = new Image();
    img.src = src;
    img.onload = () => setIsValid(true);
    img.onerror = () => setIsValid(false);
  }, [src]);

  const sharedStyle = {
    width,
    height,
    objectFit: 'cover' as const,
    borderRadius: borderRadius ? '9999px' : '0px',
  };

  return (
    <img
      src={isValid ? src : '/get-this-doodle-icon-404-error_67813-19921.jpg'}
      alt={alt}
      style={sharedStyle}
    />
  );
};

export default ImageWithCheck;
