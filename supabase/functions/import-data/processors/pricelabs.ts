
import { createSupabaseClient } from "../utils.ts";

export const processPriceLabsData = async (data: any) => {
  const supabaseClient = createSupabaseClient();
  console.log('Processing PriceLabs data:', data);
  
  for (const metric of data.metrics || []) {
    const { error } = await supabaseClient
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
        market_occupancy: metric.market_occupancy || 0,
        market_penetration_index: metric.market_penetration || 0,
        booking_pace_30_days: metric.booking_pace_30d || 0,
        booking_pace_60_days: metric.booking_pace_60d || 0,
        booking_pace_90_days: metric.booking_pace_90d || 0,
        recommended_price: metric.recommended_rate || 0,
        market_listed_price: metric.market_rate || 0,
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
};
