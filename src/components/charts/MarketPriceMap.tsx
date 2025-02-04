import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip } from 'recharts';
import { CardSpotlight } from '../ui/card-spotlight';

interface PricePoint {
  location: string;
  price: number;
  volume: number;
}

const MarketPriceMap = ({ data }: { data: PricePoint[] }) => {
  return (
    <CardSpotlight className="p-6">
      <h3 className="text-xl font-semibold mb-4">Price Distribution by Location</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <XAxis dataKey="price" name="Price (AED/sqft)" unit=" AED" />
            <YAxis dataKey="volume" name="Transaction Volume" />
            <ZAxis dataKey="location" name="Location" />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              content={({ payload }) => {
                if (payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-4 shadow-lg rounded-lg border">
                      <p className="font-semibold">{data.location}</p>
                      <p>Price: {data.price.toLocaleString()} AED/sqft</p>
                      <p>Volume: {data.volume} transactions</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter data={data} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </CardSpotlight>
  );
};

export default MarketPriceMap;