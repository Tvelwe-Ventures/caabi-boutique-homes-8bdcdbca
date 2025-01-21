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
  colors = [[162, 176, 220], [138, 153, 201]], // Default primary colors
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

    const drawGradient = (x: number, y: number, radius: number, color: number[]) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      const [r, g, b] = color;
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.1)`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      return gradient;
    };

    const animate = () => {
      time += animationSpeed / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ensure we have valid colors
      const safeColors = Array.isArray(colors) && colors.length > 0 ? colors : [[162, 176, 220]];

      // Create flowing, organic patterns
      for (let i = 0; i < 3; i++) {
        const x = canvas.width / 2 + Math.sin(time + i * 2) * 50;
        const y = canvas.height / 2 + Math.cos(time + i * 2) * 50;
        const radius = 100 + Math.sin(time * 0.5 + i) * 20;
        
        ctx.fillStyle = drawGradient(
          x,
          y,
          radius,
          safeColors[i % safeColors.length]
        );
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
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
      className={cn("h-full w-full opacity-50", containerClassName)}
    />
  );
};