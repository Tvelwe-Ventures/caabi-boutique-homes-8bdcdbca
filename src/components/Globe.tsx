"use client"

import createGlobe, { COBEOptions } from "cobe"
import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "./ThemeProvider"
import { BorderBeam } from "./ui/border-beam"

const CITIES_DATA = [
  { name: "Dubai", location: [25.2048, 55.2708] as [number, number], cost: 350000, size: 0.1 },
  { name: "London", location: [51.5074, -0.1278] as [number, number], cost: 750000, size: 0.08 },
  { name: "New York", location: [40.7128, -74.0060] as [number, number], cost: 890000, size: 0.08 },
  { name: "Tokyo", location: [35.6762, 139.6503] as [number, number], cost: 680000, size: 0.08 },
  { name: "Singapore", location: [1.3521, 103.8198] as [number, number], cost: 720000, size: 0.08 },
  { name: "Hong Kong", location: [22.3193, 114.1694] as [number, number], cost: 910000, size: 0.08 },
  { name: "Mumbai", location: [19.0760, 72.8777] as [number, number], cost: 420000, size: 0.08 },
  { name: "Paris", location: [48.8566, 2.3522] as [number, number], cost: 670000, size: 0.08 },
]

export function Globe({
  className,
}: {
  className?: string
}) {
  const { theme } = useTheme()
  let phi = 0
  let width = 0
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef(null)
  const pointerInteractionMovement = useRef(0)
  const [r, setR] = useState(0)
  const [selectedCity, setSelectedCity] = useState(CITIES_DATA[0])

  const GLOBE_CONFIG: COBEOptions = {
    width: 800,
    height: 800,
    onRender: () => {},
    devicePixelRatio: 2,
    phi: 0,
    theta: 0.3,
    dark: 0,
    diffuse: 0.4,
    mapSamples: 16000,
    mapBrightness: 1.2,
    baseColor: [1, 1, 1],
    markerColor: [0.637, 0.689, 0.863],
    glowColor: [1, 1, 1],
    markers: CITIES_DATA.map(city => ({
      location: city.location,
      size: city.size
    })),
  }

  const updatePointerInteraction = (value: any) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: any) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      setR(delta / 200)
    }
  }

  const onRender = useCallback(
    (state: Record<string, any>) => {
      if (!pointerInteracting.current) phi += 0.005
      state.phi = phi + r
      state.width = width * 2
      state.height = width * 2
    },
    [r],
  )

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth
    }
  }

  useEffect(() => {
    window.addEventListener("resize", onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      ...GLOBE_CONFIG,
      width: width * 2,
      height: width * 2,
      onRender,
    })

    const interval = setInterval(() => {
      if (!pointerInteracting.current) {
        setSelectedCity(prev => {
          const currentIndex = CITIES_DATA.findIndex(city => city.name === prev.name)
          return CITIES_DATA[(currentIndex + 1) % CITIES_DATA.length]
        })
      }
    }, 3000)

    setTimeout(() => (canvasRef.current!.style.opacity = "1"))
    
    return () => {
      globe.destroy()
      clearInterval(interval)
      window.removeEventListener("resize", onResize)
    }
  }, [theme])

  return (
    <div className="relative py-12 items-center justify-center bg-gradient-to-b from-primary/5 via-primary/10 to-transparent dark:from-black dark:via-primary-dark/5 dark:to-black">
      <div className="container relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
        <div className="flex flex-col justify-center space-y-6">
          <div className="relative overflow-hidden rounded-xl">
            <BorderBeam 
              className="rounded-xl"
              duration={8}
              colorFrom="#A2B0DC"
              colorTo="#8A99C9"
              size={300}
            />
            <div className="relative space-y-6 p-6 backdrop-blur-xl bg-gradient-to-br from-primary/80 to-primary-light/80 dark:from-black/80 dark:to-primary-dark/40">
              <h2 className="text-4xl font-bold tracking-tight text-white">
                Dubai: The Most Affordable Global City
              </h2>
              <p className="text-xl text-white/90">
                Compare property ownership costs across major global cities
              </p>
              <div className="space-y-4">
                <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                  <h3 className="text-2xl font-semibold text-white">
                    {selectedCity.name}
                  </h3>
                  <p className="mt-2 text-lg text-white/90">
                    Average 1BR Apartment Cost:
                    <span className="ml-2 font-bold">
                      ${selectedCity.cost.toLocaleString()}
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-white/80">
                    {selectedCity.name === "Dubai" 
                      ? "Best value among global cities"
                      : `${Math.round((selectedCity.cost / CITIES_DATA[0].cost - 1) * 100)}% more expensive than Dubai`
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative h-[600px]">
          <div className="absolute inset-0 rounded-full bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-3xl dark:from-primary/10 dark:via-primary/5 dark:to-transparent animate-pulse" />
          
          <div className={cn("absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]", className)}>
            <canvas
              className="size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
              ref={canvasRef}
              onPointerDown={(e) => updatePointerInteraction(e.clientX - pointerInteractionMovement.current)}
              onPointerUp={() => updatePointerInteraction(null)}
              onPointerOut={() => updatePointerInteraction(null)}
              onMouseMove={(e) => updateMovement(e.clientX)}
              onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
