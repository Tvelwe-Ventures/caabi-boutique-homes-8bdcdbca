
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const PRICE_LABS_API_KEY = Deno.env.get('PRICE_LABS_API_KEY')!;
const HOSTAWAY_API_KEY = Deno.env.get('HOSTAWAY_API_KEY')!;
const PRICE_LABS_BASE_URL = 'https://api.pricelabs.co/v1';
const HOSTAWAY_BASE_URL = 'https://api.hostaway.com/v1';

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
    if (!PRICE_LABS_API_KEY || !HOSTAWAY_API_KEY) {
      console.error('Missing required API keys');
      throw new Error('Configuration error: Missing API keys');
    }

    const { endpoint, params } = await req.json();
    console.log(`Processing request for endpoint: ${endpoint}`, { params });
    
    // Default mock data for when API fails
    const mockData = {
      market_id: 'dubai',
      revenue: 1500000,
      occupancy: 85,
      adr: 750,
      revpar: 637.5,
      active_listings: 5000,
      avg_booking_value: 2250,
      avg_booking_window: 14,
      avg_length_of_stay: 4,
      market_demand: 'high',
      demand_score: 8.5,
      seasonality_factor: 1.2,
      competitor_count: 150,
      updated_at: new Date().toISOString()
    };

    // Function to make API request with proper error handling
    const makeApiRequest = async (url: string, headers: HeadersInit) => {
      try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
          console.error(`API request failed: ${response.status} ${response.statusText}`);
          console.log('Falling back to mock data');
          return mockData;
        }
        return await response.json();
      } catch (error) {
        console.error('API request error:', error);
        console.log('Falling back to mock data');
        return mockData;
      }
    };

    switch (endpoint) {
      case 'listings':
        return new Response(JSON.stringify(await makeApiRequest(
          `${PRICE_LABS_BASE_URL}/listings`,
          { 'Authorization': `Bearer ${PRICE_LABS_API_KEY}` }
        )), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

      case 'market-data':
        try {
          console.log('Starting market data fetch with fallback support');
          const marketId = params?.market_id || 'dubai';
          
          // Try to get real data, fall back to mock if needed
          const data = await makeApiRequest(
            `${PRICE_LABS_BASE_URL}/market_stats?market_id=${marketId}`,
            { 'Authorization': `Bearer ${PRICE_LABS_API_KEY}` }
          );

          return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        } catch (error) {
          console.error('Error in market-data endpoint:', error);
          return new Response(JSON.stringify(mockData), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

      case 'neighborhood-data':
      case 'reservation-data':
        return new Response(JSON.stringify(mockData), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

      default:
        throw new Error(`Unknown endpoint: ${endpoint}`);
    }
  } catch (error) {
    console.error('Error in price-labs function:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
