import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: {
    regular: string
    gradient: string
  }
  description?: string
  ctaText?: string
  ctaHref?: string
  bottomImage?: {
    light: string
    dark: string
  }
  gridOptions?: {
    angle?: number
    cellSize?: number
    opacity?: number
    lightLineColor?: string
    darkLineColor?: string
  }
}

const RetroGrid = ({
  angle = 65,
  cellSize = 60,
  opacity = 0.15,
  lightLineColor = "#8394CA",
  darkLineColor = "#8394CA",
}) => {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
    "--light-line": lightLineColor,
    "--dark-line": darkLineColor,
  } as React.CSSProperties

  return (
    <div
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden [perspective:200px]",
        `opacity-[var(--opacity)]`,
      )}
      style={gridStyles}
    >
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div className="animate-grid [background-image:linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
    </div>
  )
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      className,
      title,
      subtitle,
      description,
      ctaText,
      ctaHref,
      bottomImage,
      gridOptions,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("relative", className)} ref={ref} {...props}>
        <div className="absolute top-0 z-[0] h-screen w-screen bg-gradient-to-b from-[#F5E6FA] via-[#F8F9FC] to-white" />
        <section className="relative max-w-full mx-auto z-1">
          <RetroGrid {...gridOptions} />
          <div className="max-w-screen-xl z-10 mx-auto px-4 py-28 gap-12 md:px-8">
            <div className="space-y-5 max-w-3xl leading-0 lg:leading-5 mx-auto text-center">
              <h1 className="text-sm text-primary-dark/80 group font-geist mx-auto px-5 py-2 bg-gradient-to-tr from-primary/10 via-primary-light/10 to-transparent border border-primary/10 rounded-3xl w-fit">
                {title}
                <ChevronRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
              </h1>
              <h2 className="text-4xl tracking-tighter font-geist text-primary-dark mx-auto md:text-6xl">
                {subtitle?.regular}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                  {subtitle?.gradient}
                </span>
              </h2>
              <p className="max-w-2xl mx-auto text-primary-dark/80">
                {description}
              </p>
              {ctaText && (
                <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
                  <span className="relative inline-block overflow-hidden rounded-full p-[1.5px]">
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#8394CA_0%,#B2D1E3_50%,#8394CA_100%)]" />
                    <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white text-xs font-medium backdrop-blur-3xl">
                      <a
                        href={ctaHref}
                        className="inline-flex rounded-full text-center group items-center w-full justify-center bg-gradient-to-tr from-primary/10 via-primary-light/20 to-transparent text-primary-dark border-input border hover:bg-gradient-to-tr hover:from-primary/20 hover:via-primary-light/30 hover:to-transparent transition-all sm:w-auto py-4 px-10"
                      >
                        {ctaText}
                      </a>
                    </div>
                  </span>
                </div>
              )}
            </div>
            {bottomImage && (
              <div className="mt-32 mx-10 relative z-10">
                <img
                  src={bottomImage.light}
                  className="w-full shadow-lg rounded-lg border border-gray-200 dark:hidden"
                  alt="Dashboard preview"
                />
                <img
                  src={bottomImage.dark}
                  className="hidden w-full shadow-lg rounded-lg border border-gray-800 dark:block"
                  alt="Dashboard preview"
                />
              </div>
            )}
          </div>
        </section>
      </div>
    )
  },
)
HeroSection.displayName = "HeroSection"

export { HeroSection }