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
    const { endpoint } = await req.json();
    
    console.log(`Processing market data request for endpoint: ${endpoint}`);
    
    let url;
    switch (endpoint) {
      case 'listings':
        url = `${PRICE_LABS_BASE_URL}/listings`;
        break;
      case 'neighborhood-data':
        url = `${PRICE_LABS_BASE_URL}/neighborhood_data`;
        break;
      case 'reservation-data':
        url = `${PRICE_LABS_BASE_URL}/reservation_data`;
        break;
      case 'market-data':
        try {
          // Fetch data from both PriceLabs and Hostaway
          const [priceLabsNeighborhood, priceLabsReservation, hostawayData] = await Promise.all([
            fetch(`${PRICE_LABS_BASE_URL}/neighborhood_data`, {
              headers: {
                'Authorization': `Bearer ${PRICE_LABS_API_KEY}`,
                'Content-Type': 'application/json',
              },
            }).then(res => {
              if (!res.ok) throw new Error(`PriceLabs neighborhood API error: ${res.status}`);
              return res.json();
            }),
            
            fetch(`${PRICE_LABS_BASE_URL}/reservation_data`, {
              headers: {
                'Authorization': `Bearer ${PRICE_LABS_API_KEY}`,
                'Content-Type': 'application/json',
              },
            }).then(res => {
              if (!res.ok) throw new Error(`PriceLabs reservation API error: ${res.status}`);
              return res.json();
            }),
            
            fetch(`${HOSTAWAY_BASE_URL}/market-data`, {
              headers: {
                'Authorization': `Bearer ${HOSTAWAY_API_KEY}`,
                'Content-Type': 'application/json',
              },
            }).then(res => {
              if (!res.ok) throw new Error(`Hostaway API error: ${res.status}`);
              return res.json();
            })
          ]);

          // Combine and process the data
          const marketData = {
            revenue: priceLabsReservation.total_revenue || 0,
            occupancy: priceLabsNeighborhood.occupancy_rate || hostawayData?.occupancy_rate || 0,
            adr: priceLabsNeighborhood.average_daily_rate || hostawayData?.average_daily_rate || 0,
            revpar: (priceLabsNeighborhood.average_daily_rate * (priceLabsNeighborhood.occupancy_rate / 100)) || 0,
            active_listings: priceLabsNeighborhood.active_listings || hostawayData?.active_listings || 0,
            avg_booking_value: priceLabsReservation.average_booking_value || hostawayData?.average_booking_value || 0,
            avg_booking_window: priceLabsReservation.average_booking_window || hostawayData?.average_lead_time || 0,
            avg_length_of_stay: priceLabsReservation.average_length_of_stay || hostawayData?.average_length_of_stay || 0,
            market_demand: hostawayData?.market_demand || 'medium',
            demand_score: priceLabsNeighborhood.demand_score || 0,
            seasonality_factor: priceLabsNeighborhood.seasonality_factor || 0,
            competitor_count: priceLabsNeighborhood.competitor_count || 0,
            updated_at: new Date().toISOString()
          };

          console.log('Combined market data:', marketData);

          return new Response(JSON.stringify(marketData), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } catch (error) {
          console.error('Error fetching market data:', error);
          throw error;
        }

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
      console.error(`API error: ${response.status} - ${await response.text()}`);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log(`API response received for ${endpoint}`);

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