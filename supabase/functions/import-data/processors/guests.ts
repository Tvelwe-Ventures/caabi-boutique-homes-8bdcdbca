
import { createSupabaseClient } from "../utils.ts";

export const processGuestsData = async (data: any) => {
  const supabaseClient = createSupabaseClient();
  
  if (data.guests && Array.isArray(data.guests)) {
    for (const guest of data.guests) {
      const { error } = await supabaseClient
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
};
