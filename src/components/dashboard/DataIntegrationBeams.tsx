import { useRef } from "react";
import { AnimatedBeam } from "../ui/animated-beam";

export const DataIntegrationBeams = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centralNodeRef = useRef<HTMLDivElement>(null);
  const airbnbRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const propertyRef = useRef<HTMLDivElement>(null);
  const analyticsRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <div
        ref={centralNodeRef}
        className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20"
      />
      <div
        ref={airbnbRef}
        className="absolute left-[20%] top-[30%] h-3 w-3 rounded-full bg-blue-500/20"
      />
      <div
        ref={bookingRef}
        className="absolute right-[20%] top-[30%] h-3 w-3 rounded-full bg-blue-500/20"
      />
      <div
        ref={propertyRef}
        className="absolute bottom-[30%] left-[30%] h-3 w-3 rounded-full bg-blue-500/20"
      />
      <div
        ref={analyticsRef}
        className="absolute bottom-[30%] right-[30%] h-3 w-3 rounded-full bg-blue-500/20"
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={airbnbRef}
        toRef={centralNodeRef}
        delay={0}
        curvature={50}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={bookingRef}
        toRef={centralNodeRef}
        delay={1}
        curvature={50}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={propertyRef}
        toRef={centralNodeRef}
        delay={2}
        curvature={50}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={analyticsRef}
        toRef={centralNodeRef}
        delay={3}
        curvature={50}
      />
    </div>
  );
};