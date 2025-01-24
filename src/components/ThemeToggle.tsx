"use client"

import { Sun } from "lucide-react"
import { Button } from "./ui/button"

export function ThemeToggle() {
  // Since we're in light mode only, this is now just a decorative button
  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] text-gray-800" />
      <span className="sr-only">Light mode</span>
    </Button>
  )
}