
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
    
    let url;
    let requestParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        requestParams.append(key, value as string);
      });
    }

    switch (endpoint) {
      case 'listings':
        url = `${PRICE_LABS_BASE_URL}/listings`;
        console.log('Fetching PriceLabs listings data');
        break;
      case 'neighborhood-data':
        url = `${PRICE_LABS_BASE_URL}/market_stats`;
        if (!params?.market_id) {
          requestParams.append('market_id', 'dubai');
        }
        console.log('Fetching PriceLabs neighborhood data');
        break;
      case 'reservation-data':
        url = `${PRICE_LABS_BASE_URL}/reservations`;
        console.log('Fetching PriceLabs reservation data');
        break;
      case 'market-data':
        try {
          console.log('Starting market data fetch from multiple sources');
          const marketId = params?.market_id || 'dubai';
          
          console.log('Fetching PriceLabs market stats...');
          const priceLabsMarketStats = await fetch(`${PRICE_LABS_BASE_URL}/market_stats?market_id=${marketId}`, {
            headers: {
              'Authorization': `Bearer ${PRICE_LABS_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }).then(async res => {
            if (!res.ok) {
              const errorText = await res.text();
              console.error(`PriceLabs market stats API error: ${res.status}`, errorText);
              throw new Error(`PriceLabs market stats API error: ${res.status}`);
            }
            const data = await res.json();
            console.log('PriceLabs market stats received:', data);
            return data;
          });
          
          console.log('Fetching PriceLabs reservations...');
          const priceLabsReservations = await fetch(`${PRICE_LABS_BASE_URL}/reservations`, {
            headers: {
              'Authorization': `Bearer ${PRICE_LABS_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }).then(async res => {
            if (!res.ok) {
              const errorText = await res.text();
              console.error(`PriceLabs reservations API error: ${res.status}`, errorText);
              throw new Error(`PriceLabs reservations API error: ${res.status}`);
            }
            const data = await res.json();
            console.log('PriceLabs reservations received:', data);
            return data;
          });
          
          console.log('Fetching Hostaway data...');
          const hostawayData = await fetch(`${HOSTAWAY_BASE_URL}/market-data`, {
            headers: {
              'Authorization': `Bearer ${HOSTAWAY_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }).then(async res => {
            if (!res.ok) {
              const errorText = await res.text();
              console.error(`Hostaway API error: ${res.status}`, errorText);
              throw new Error(`Hostaway API error: ${res.status}`);
            }
            const data = await res.json();
            console.log('Hostaway data received:', data);
            return data;
          });

          const marketData = {
            market_id: marketId,
            revenue: priceLabsReservations.total_revenue || 0,
            occupancy: priceLabsMarketStats.occupancy || hostawayData?.occupancy_rate || 0,
            adr: priceLabsMarketStats.adr || hostawayData?.average_daily_rate || 0,
            revpar: (priceLabsMarketStats.adr * (priceLabsMarketStats.occupancy / 100)) || 0,
            active_listings: priceLabsMarketStats.active_listings || hostawayData?.active_listings || 0,
            avg_booking_value: priceLabsReservations.avg_booking_value || hostawayData?.average_booking_value || 0,
            avg_booking_window: priceLabsReservations.avg_lead_time || hostawayData?.average_lead_time || 0,
            avg_length_of_stay: priceLabsReservations.avg_length_of_stay || hostawayData?.average_length_of_stay || 0,
            market_demand: hostawayData?.market_demand || 'medium',
            demand_score: priceLabsMarketStats.demand_score || 0,
            seasonality_factor: priceLabsMarketStats.seasonality || 0,
            competitor_count: priceLabsMarketStats.competitors || 0,
            updated_at: new Date().toISOString()
          };

          console.log('Combined market data:', marketData);

          return new Response(JSON.stringify(marketData), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } catch (error) {
          console.error('Error fetching market data:', error);
          return new Response(
            JSON.stringify({ error: error.message }),
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        }

      default:
        throw new Error(`Unknown endpoint: ${endpoint}`);
    }

    if (!url) {
      throw new Error('Invalid endpoint specified');
    }

    const finalUrl = `${url}${requestParams.toString() ? '?' + requestParams.toString() : ''}`;
    console.log(`Making request to: ${finalUrl}`);

    const response = await fetch(finalUrl, {
      headers: {
        'Authorization': `Bearer ${PRICE_LABS_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error: ${response.status} - ${errorText}`);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log(`API response received for ${endpoint}:`, data);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

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
