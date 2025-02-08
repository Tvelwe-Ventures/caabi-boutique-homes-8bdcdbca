
import { createSupabaseClient } from "../utils.ts";

export const processBookingsData = async (data: any) => {
  const supabaseClient = createSupabaseClient();
  
  if (data.bookings && Array.isArray(data.bookings)) {
    for (const booking of data.bookings) {
      const { error } = await supabaseClient
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
};
