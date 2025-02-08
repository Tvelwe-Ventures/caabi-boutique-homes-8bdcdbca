
import { createSupabaseClient } from "../utils.ts";

export const processHostawayData = async (data: any) => {
  const supabaseClient = createSupabaseClient();
  console.log('Processing Hostaway data:', data);
  
  for (const metric of data.metrics || []) {
    const { error } = await supabaseClient
      .from('financial_metrics')
      .upsert({
        property_id: metric.property_id,
        month: metric.date,
        monthly_revenue: metric.revenue || 0,
        avg_daily_rate: metric.daily_rate || 0,
        occupancy_rate: metric.occupancy || 0,
        booking_pace: metric.pace || 0,
        channel_distribution: metric.channel_distribution || {},
        average_length_of_stay: metric.average_stay_length || 0,
        total_bookings: metric.total_bookings || 0,
        revenue_by_channel: metric.revenue_by_channel || {},
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
};
