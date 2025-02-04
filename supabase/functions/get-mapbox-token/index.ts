import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const mapboxToken = Deno.env.get('MAPBOX_PUBLIC_TOKEN')
    console.log('Retrieved token:', mapboxToken ? 'Token exists' : 'No token found')
    
    if (!mapboxToken) {
      throw new Error('Mapbox token not found in environment variables')
    }

    return new Response(
      JSON.stringify({
        secret: mapboxToken
      }),
      {
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error in get-mapbox-token function:', error)
    return new Response(
      JSON.stringify({
        error: error.message
      }),
      {
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        },
        status: 500,
      },
    )
  }
})