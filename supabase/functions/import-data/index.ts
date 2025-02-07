
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

    const { data: importData } = await req.json();
    const { bookings, guests } = importData;

    // Process and validate guests first
    const guestInsertPromises = guests.map(async (guest: any) => {
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
      return data;
    });

    // Process bookings after guests
    const bookingInsertPromises = bookings.map(async (booking: any) => {
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
      return data;
    });

    // Wait for all insertions to complete
    await Promise.all([...guestInsertPromises, ...bookingInsertPromises]);

    return new Response(
      JSON.stringify({ 
        message: 'Data imported successfully',
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
