export interface CalculatorSettings {
  id: string
  created_at: string
  investment_amount: number
  annual_return: number
  appreciation: number
  user_id: string
}

export interface MarketData {
  averageRentalYield: number
  averageAppreciation: number
  marketTrends: {
    downtown: { yield: number, appreciation: number }
    marina: { yield: number, appreciation: number }
    palmJumeirah: { yield: number, appreciation: number }
  }
}

export interface ChartData {
  month: number
  rental: number
  appreciation: number
  total: number
}