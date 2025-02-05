import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const PRICE_LABS_API_KEY = Deno.env.get('PRICE_LABS_API_KEY')!;
const PRICE_LABS_BASE_URL = 'https://api.pricelabs.co/v1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { endpoint, params } = await req.json();
    
    console.log(`Fetching Price Labs data for endpoint: ${endpoint}, params:`, params);
    
    const queryParams = new URLSearchParams(params).toString();
    const url = `${PRICE_LABS_BASE_URL}/${endpoint}${queryParams ? `?${queryParams}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PRICE_LABS_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`PriceLabs API error: ${error}`);
      throw new Error(`PriceLabs API error: ${response.status}`);
    }

    const data = await response.json();
    console.log(`PriceLabs API response received for ${endpoint}`);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in price-labs function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});