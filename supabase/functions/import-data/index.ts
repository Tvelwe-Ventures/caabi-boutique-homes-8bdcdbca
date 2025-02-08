import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

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
    const formData = await req.formData();
    const files = formData.getAll('files');

    if (!files || files.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No files provided' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const results = [];
    
    for (const file of files) {
      if (!(file instanceof File)) {
        console.error('Invalid file object received');
        continue;
      }

      try {
        // Read the file content
        const fileContent = await file.text();
        let parsedData;

        // Try to parse as JSON
        try {
          parsedData = JSON.parse(fileContent);
        } catch (parseError) {
          // If not JSON, try to parse as CSV or other format
          console.error('Error parsing JSON:', parseError);
          results.push({
            filename: file.name,
            status: 'error',
            error: 'Invalid JSON format'
          });
          continue;
        }

        // Process PriceLabs data
        if (file.name.toLowerCase().includes('pricelabs')) {
          console.log('Processing PriceLabs data:', parsedData);
          for (const metric of parsedData.metrics || []) {
            const { data, error } = await supabaseClient
              .from('financial_metrics')
              .upsert({
                property_id: metric.property_id,
                month: metric.date,
                monthly_revenue: metric.revenue || 0,
                avg_daily_rate: metric.adr || 0,
                occupancy_rate: metric.occupancy || 0,
                market_demand_score: metric.demand_score,
                competitive_index: metric.comp_index,
                forecast_revenue: metric.forecast,
                data_source: 'pricelabs',
                last_sync_pricelabs: new Date().toISOString()
              }, {
                onConflict: 'property_id,month',
                ignoreDuplicates: false
              });

            if (error) {
              console.error('Error inserting PriceLabs metric:', error);
              throw error;
            }
          }
        }

        // Process Hostaway data
        if (file.name.toLowerCase().includes('hostaway')) {
          console.log('Processing Hostaway data:', parsedData);
          for (const metric of parsedData.metrics || []) {
            const { data, error } = await supabaseClient
              .from('financial_metrics')
              .upsert({
                property_id: metric.property_id,
                month: metric.date,
                monthly_revenue: metric.revenue || 0,
                avg_daily_rate: metric.daily_rate || 0,
                occupancy_rate: metric.occupancy || 0,
                booking_pace: metric.pace,
                data_source: 'hostaway',
                last_sync_hostaway: new Date().toISOString()
              }, {
                onConflict: 'property_id,month',
                ignoreDuplicates: false
              });

            if (error) {
              console.error('Error inserting Hostaway metric:', error);
              throw error;
            }
          }
        }

        // Keep existing guest and booking processing
        if (parsedData.guests && Array.isArray(parsedData.guests)) {
          for (const guest of parsedData.guests) {
            const { data, error } = await supabaseClient
              .from('guests')
              .upsert({
                id: guest.id || undefined,
                first_name: guest.first_name,
                last_name: guest.last_name,
                email: guest.email,
                phone: guest.phone,
                nationality: guest.nationality,
                preferred_language: guest.preferred_language,
                total_stays: guest.total_stays || 0,
                average_rating: guest.average_rating || 0,
                last_stay_date: guest.last_stay_date,
              }, {
                onConflict: 'id',
                ignoreDuplicates: false
              });

            if (error) {
              console.error('Error inserting guest:', error);
              throw error;
            }
          }
        }

        if (parsedData.bookings && Array.isArray(parsedData.bookings)) {
          for (const booking of parsedData.bookings) {
            const { data, error } = await supabaseClient
              .from('bookings')
              .upsert({
                id: booking.id || undefined,
                property_id: booking.property_id,
                guest_id: booking.guest_id,
                check_in_date: booking.check_in_date,
                check_out_date: booking.check_out_date,
                status: booking.status || 'pending',
                total_amount: booking.total_amount,
                booking_source: booking.booking_source,
                external_booking_id: booking.external_booking_id,
                number_of_guests: booking.number_of_guests,
                special_requests: booking.special_requests,
              }, {
                onConflict: 'id',
                ignoreDuplicates: false
              });

            if (error) {
              console.error('Error inserting booking:', error);
              throw error;
            }
          }
        }

        results.push({
          filename: file.name,
          status: 'success'
        });

      } catch (fileError) {
        console.error(`Error processing file ${file.name}:`, fileError);
        results.push({
          filename: file.name,
          status: 'error',
          error: fileError.message
        });
      }
    }

    return new Response(
      JSON.stringify({ 
        message: 'Files processed',
        results,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in import-data function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
