import type { CSSProperties } from "react";
import Image from "next/image";

export default function Logo({
  size = 32,
  className = "",
  style,
}: {
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Image
      src="/logo_white_transparent.png"
      alt="Propulse"
      height={size}
      width={size * 5}
      className={className}
      style={{ height: size, width: "auto", ...style }}
    />
  );
}
