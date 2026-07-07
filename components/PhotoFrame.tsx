"use client";

import Image, { ImageProps } from "next/image";

interface PhotoFrameProps extends Omit<ImageProps, "alt"> {
  alt: string;
  frameClassName?: string;
}

export function PhotoFrame({
  alt,
  frameClassName = "",
  className = "",
  src,
  ...props
}: PhotoFrameProps) {
  return (
    <div className={`pf ${frameClassName}`.trim()}>
      <Image
        src={src}
        alt={alt}
        className={className}
        {...props}
      />
    </div>
  );
}

export default PhotoFrame;