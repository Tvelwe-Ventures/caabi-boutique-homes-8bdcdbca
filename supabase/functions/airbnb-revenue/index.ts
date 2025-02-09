
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const AIRBNB_API_KEY = Deno.env.get('AIRBNB_API_KEY')!;
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!AIRBNB_API_KEY) {
      throw new Error('Airbnb API key not configured');
    }

    const { latitude, longitude, bedrooms, bathrooms } = await req.json();

    if (!latitude || !longitude || !bedrooms || !bathrooms) {
      throw new Error('Missing required parameters');
    }

    console.log('Fetching Airbnb revenue estimation...');

    const response = await fetch(
      `https://zylalabs.com/api/4577/airbnb+api+revenue+estimation/5642/airbnb+income+prediction+api?coordinate=(${latitude},${longitude})&bedrooms=${bedrooms}&bathrooms=${bathrooms}`,
      {
        headers: {
          'Authorization': `Bearer ${AIRBNB_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      console.error('API request failed:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Received Airbnb data:', data);

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Store the estimation data
    const { data: insertedData, error: insertError } = await supabase
      .from('airbnb_revenue_estimates')
      .insert({
        latitude,
        longitude,
        bedrooms,
        bathrooms,
        average_daily_rate: data.message.last_12_months_summary.average.average_daily_rate,
        occupancy_rate: data.message.last_12_months_summary.average.occupancy_rate,
        annual_revenue: data.message.last_12_months_summary.average.revenue,
        sample_size: data.message.no_of_sample,
        radius_used: data.message.radius_used,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting data:', insertError);
      throw insertError;
    }

    console.log('Successfully stored Airbnb revenue estimation');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Airbnb revenue estimation fetched and stored successfully',
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
    console.error('Error in airbnb-revenue function:', error);
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
