import type { Config } from "tailwindcss";

export default {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        bricolage: ['Bricolage Grotesque', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        geist: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#8394CA",
          light: "#B2D1E3",
          dark: "#1A2957",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#DFD5EA",
          light: "#F8F9FC",
          dark: "#8E9196",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'soft-gradient': 'linear-gradient(to bottom right, #F5E6FA, #F8F9FC)',
        'hero-gradient': 'linear-gradient(to bottom right, #F0E5F4, #FFFFFF)',
        'card-gradient': 'linear-gradient(to bottom right, #F5E6FA, #FFFFFF)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        "text-flow": {
          "0%": { backgroundPosition: "0% center" },
          "100%": { backgroundPosition: "200% center" }
        },
        grid: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(calc(var(--cell-size) * -1))" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.5s ease-out forwards",
        shimmer: "shimmer 2s infinite",
        "text-flow": "text-flow 8s linear infinite",
        grid: "grid 20s linear infinite"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;