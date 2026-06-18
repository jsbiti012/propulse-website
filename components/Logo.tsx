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
      src="/logomark.png"
      alt="Propulse"
      height={size}
      width={size}
      className={className}
      style={{ height: size, width: "auto", ...style }}
    />
  );
}
