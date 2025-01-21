"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface CanvasRevealEffectProps {
  colors?: number[][];
  dotSize?: number;
  animationSpeed?: number;
  containerClassName?: string;
}

export const CanvasRevealEffect = ({
  colors = [[59, 130, 246], [139, 92, 246]], // Default blue-purple gradient
  dotSize = 3,
  animationSpeed = 5,
  containerClassName,
}: CanvasRevealEffectProps) => {
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

      // Ensure we have a valid colors array
      const defaultColors = [[59, 130, 246], [139, 92, 246]];
      const safeColors = Array.isArray(colors) && colors.length > 0 ? colors : defaultColors;

      for (let i = 0; i < canvas.width; i += dotSize * 2) {
        for (let j = 0; j < canvas.height; j += dotSize * 2) {
          const index = Math.abs(
            Math.floor(
              (Math.sin(i * 0.05 + time) + Math.sin(j * 0.05 + time)) % safeColors.length
            )
          );
          
          // Ensure we have a valid color at the index
          const color = safeColors[index] || defaultColors[0];
          const [r, g, b] = color;
          
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