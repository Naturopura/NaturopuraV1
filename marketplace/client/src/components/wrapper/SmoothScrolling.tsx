import { ReactLenis } from "@studio-freight/react-lenis";
import type { PropsWithChildren } from "react";

export default function SmoothScrolling({ children }: PropsWithChildren) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {children as any}
    </ReactLenis>
  );
}
