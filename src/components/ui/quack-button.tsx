
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

interface QuackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  enabled: boolean;
  onToggle: () => void;
  particleCount?: number;
  attractRadius?: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
}

export function QuackButton({
  className,
  enabled,
  onToggle,
  particleCount = 12,
  attractRadius = 50,
  ...props
}: QuackButtonProps) {
  const [isAttracting, setIsAttracting] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particlesControl = useAnimation();

  useEffect(() => {
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 360 - 180,
      y: Math.random() * 360 - 180,
    }));
    setParticles(newParticles);
  }, [particleCount]);

  const handleInteractionStart = useCallback(async () => {
    setIsAttracting(true);
    await particlesControl.start({
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 10,
      },
    });
  }, [particlesControl]);

  const handleInteractionEnd = useCallback(async () => {
    setIsAttracting(false);
    await particlesControl.start((i) => ({
      x: particles[i].x,
      y: particles[i].y,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    }));
  }, [particlesControl, particles]);

  return (
    <Button
      className={cn(
        "min-w-40 relative touch-none",
        enabled ? "bg-primary text-white" : "bg-gray-100 text-gray-600",
        "hover:opacity-90",
        "transition-all duration-300",
        className
      )}
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
      onClick={onToggle}
      {...props}
    >
      {particles.map((_, index) => (
        <motion.div
          key={index}
          custom={index}
          initial={{ x: particles[index].x, y: particles[index].y }}
          animate={particlesControl}
          className={cn(
            "absolute w-1.5 h-1.5 rounded-full",
            enabled ? "bg-white/40" : "bg-primary/40",
            "transition-opacity duration-300",
            isAttracting ? "opacity-100" : "opacity-40"
          )}
        />
      ))}
      <span className="relative w-full flex items-center justify-center gap-2">
        {enabled ? (
          <Volume2 className={cn(
            "w-4 h-4 transition-transform duration-300",
            isAttracting && "scale-110"
          )} />
        ) : (
          <VolumeX className={cn(
            "w-4 h-4 transition-transform duration-300",
            isAttracting && "scale-110"
          )} />
        )}
        {enabled ? "Quacks Enabled" : "Enable Quacks"}
      </span>
    </Button>
  );
}
