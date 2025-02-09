
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const UAE_REAL_ESTATE_API_KEY = Deno.env.get('UAE_REAL_ESTATE_API_KEY')!;
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

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
    if (!UAE_REAL_ESTATE_API_KEY) {
      throw new Error('UAE Real Estate API key not configured');
    }

    console.log('Starting UAE market data fetch...');

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Fetch market data from UAE Real Estate API
    const response = await fetch('https://api.uaerealestate.ae/v1/market/prices', {
      headers: {
        'Authorization': `Bearer ${UAE_REAL_ESTATE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error('API request failed:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Received market data:', data);

    // Transform and store the data
    const marketData = data.results.map((item: any) => ({
      location: item.location || 'Unknown',
      price: item.price_per_sqft || 0,
      volume: item.transaction_volume || 0,
      property_type: item.property_type || 'Residential',
      segment: item.market_segment || 'All',
      time_period: new Date().toISOString()
    }));

    // Insert the data into our table
    const { data: insertedData, error: insertError } = await supabase
      .from('uae_market_prices')
      .insert(marketData)
      .select();

    if (insertError) {
      console.error('Error inserting data:', insertError);
      throw insertError;
    }

    console.log('Successfully stored market data');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Market data fetched and stored successfully',
        data: insertedData 
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    );

  } catch (error) {
    console.error('Error in uae-market-data function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});
