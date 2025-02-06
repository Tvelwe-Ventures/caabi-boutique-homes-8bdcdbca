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
    const { endpoint } = await req.json();
    
    console.log(`Processing PriceLabs request for endpoint: ${endpoint}`);
    
    let url;
    switch (endpoint) {
      case 'listings':
        url = `${PRICE_LABS_BASE_URL}/v1/listings`;
        break;
      case 'neighborhood-data':
        url = `${PRICE_LABS_BASE_URL}/v1/neighborhood_data`;
        break;
      case 'reservation-data':
        url = `${PRICE_LABS_BASE_URL}/v1/reservation_data`;
        break;
      case 'market-data':
        // This is a combination of neighborhood and reservation data
        const [neighborhoodData, reservationData] = await Promise.all([
          fetch(`${PRICE_LABS_BASE_URL}/v1/neighborhood_data`, {
            headers: {
              'Authorization': `Bearer ${PRICE_LABS_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }).then(res => res.json()),
          fetch(`${PRICE_LABS_BASE_URL}/v1/reservation_data`, {
            headers: {
              'Authorization': `Bearer ${PRICE_LABS_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }).then(res => res.json())
        ]);

        // Combine and process the data
        const marketData = {
          revenue: reservationData.total_revenue || 0,
          occupancy: neighborhoodData.occupancy_rate || 0,
          adr: neighborhoodData.average_daily_rate || 0,
          revpar: (neighborhoodData.average_daily_rate * (neighborhoodData.occupancy_rate / 100)) || 0,
          active_listings: neighborhoodData.active_listings || 0,
          avg_booking_value: reservationData.average_booking_value || 0,
          avg_booking_window: reservationData.average_booking_window || 0,
          avg_length_of_stay: reservationData.average_length_of_stay || 0,
        };

        return new Response(JSON.stringify(marketData), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      default:
        throw new Error(`Unknown endpoint: ${endpoint}`);
    }

    if (!url) {
      throw new Error('Invalid endpoint specified');
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${PRICE_LABS_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`PriceLabs API error: ${response.status} - ${await response.text()}`);
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