"use client"

import createGlobe, { COBEOptions } from "cobe"
import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "./ThemeProvider"

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
    dark: theme === "dark" ? 1 : 0,
    diffuse: 0.4,
    mapSamples: 16000,
    mapBrightness: 1.2,
    baseColor: theme === "dark" ? [0.3, 0.3, 0.3] : [1, 1, 1],
    markerColor: [0.637, 0.689, 0.863],
    glowColor: theme === "dark" ? [0.2, 0.2, 0.2] : [1, 1, 1],
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

    // Cycle through cities every 3 seconds when not interacting
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
    <div className="relative flex min-h-screen items-center justify-center bg-background py-20">
      <div className="container grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex flex-col justify-center space-y-6">
          <h2 className="text-4xl font-bold tracking-tight">
            Dubai: The Most Affordable Global City
          </h2>
          <p className="text-xl text-muted-foreground">
            Compare property ownership costs across major global cities
          </p>
          <div className="space-y-4">
            <div className="rounded-lg bg-primary/5 p-6">
              <h3 className="text-2xl font-semibold text-primary">
                {selectedCity.name}
              </h3>
              <p className="mt-2 text-lg">
                Average 1BR Apartment Cost:
                <span className="ml-2 font-bold">
                  ${selectedCity.cost.toLocaleString()}
                </span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {selectedCity.name === "Dubai" 
                  ? "Best value among global cities"
                  : `${Math.round((selectedCity.cost / CITIES_DATA[0].cost - 1) * 100)}% more expensive than Dubai`
                }
              </p>
            </div>
          </div>
        </div>
        
        <div className="relative h-[600px]">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 blur-3xl dark:from-primary/5 dark:via-secondary/3 dark:to-primary/5" />
          
          <div
            className={cn(
              "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
              className,
            )}
          >
            <canvas
              className={cn(
                "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
              )}
              ref={canvasRef}
              onPointerDown={(e) =>
                updatePointerInteraction(
                  e.clientX - pointerInteractionMovement.current,
                )
              }
              onPointerUp={() => updatePointerInteraction(null)}
              onPointerOut={() => updatePointerInteraction(null)}
              onMouseMove={(e) => updateMovement(e.clientX)}
              onTouchMove={(e) =>
                e.touches[0] && updateMovement(e.touches[0].clientX)
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}
