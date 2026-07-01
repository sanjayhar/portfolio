import Image, { ImageProps } from "next/image";

interface PhotoFrameProps extends Omit<ImageProps, "alt"> {
  alt: string;
  frameClassName?: string;
}

export function PhotoFrame({
  alt,
  className = "",
  frameClassName = "",
  ...props
}: PhotoFrameProps) {
  return (
    <div className={`pf ${frameClassName}`.trim()}>
      <Image alt={alt} className={className} {...props} />
    </div>
  );
}
