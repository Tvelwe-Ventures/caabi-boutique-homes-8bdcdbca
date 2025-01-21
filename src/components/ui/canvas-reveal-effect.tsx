"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const CanvasRevealEffect = ({
  colors = [[59, 130, 246], [139, 92, 246]], // Default colors
  dotSize = 3,
  animationSpeed = 5,
  containerClassName,
}: {
  colors?: number[][];
  dotSize?: number;
  animationSpeed?: number;
  containerClassName?: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let frame: number;
    let time = 0;

    const animate = () => {
      time += animationSpeed / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ensure colors array exists and has at least one color
      const safeColors = colors?.length ? colors : [[59, 130, 246]];

      for (let i = 0; i < canvas.width; i += dotSize * 2) {
        for (let j = 0; j < canvas.height; j += dotSize * 2) {
          const colorIndex = Math.abs(
            Math.floor(
              (Math.sin(i * 0.05 + time) + Math.sin(j * 0.05 + time)) % safeColors.length
            )
          );
          const [r, g, b] = safeColors[colorIndex];
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.fillRect(i, j, dotSize, dotSize);
        }
      }

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(frame);
    };
  }, [colors, dotSize, animationSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("h-full w-full", containerClassName)}
    />
  );
};