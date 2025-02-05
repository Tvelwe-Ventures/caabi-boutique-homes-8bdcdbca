export interface PriceLabsMarketData {
  market_id: string;
  location: string;
  occupancy_rate: number;
  average_daily_rate: number;
  revenue_potential: number;
  demand_score: number;
  seasonality_factor: number;
  competitor_count: number;
  updated_at: string;
}

export interface PriceLabsPropertyData {
  property_id: string;
  name: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  base_price: number;
  min_price: number;
  max_price: number;
  current_price: number;
  occupancy_rate: number;
  revenue_ytd: number;
  last_sync: string;
}

export interface PriceLabsRecommendation {
  property_id: string;
  date: string;
  recommended_price: number;
  min_price: number;
  max_price: number;
  demand_score: number;
  events: string[];
  factors: {
    type: string;
    impact: number;
    description: string;
  }[];
}