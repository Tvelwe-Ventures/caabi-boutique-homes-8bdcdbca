import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  try {
    const mapboxToken = Deno.env.get('MAPBOX_PUBLIC_TOKEN')
    
    if (!mapboxToken) {
      throw new Error('Mapbox token not found in environment variables')
    }

    return new Response(
      JSON.stringify({
        secret: mapboxToken
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})