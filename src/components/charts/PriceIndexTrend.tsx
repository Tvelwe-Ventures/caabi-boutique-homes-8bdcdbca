import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CardSpotlight } from '../ui/card-spotlight';

interface PriceIndex {
  period: string;
  apartment: number;
  villa: number;
  office: number;
}

const PriceIndexTrend = ({ data }: { data: PriceIndex[] }) => {
  return (
    <CardSpotlight className="p-6">
      <h3 className="text-xl font-semibold mb-4">Price Index Trends</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip
              content={({ payload, label }) => {
                if (payload && payload.length) {
                  return (
                    <div className="bg-white p-4 shadow-lg rounded-lg border">
                      <p className="font-semibold">{label}</p>
                      {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color }}>
                          {entry.name}: {entry.value.toFixed(2)}
                        </p>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="apartment" stroke="#8884d8" name="Apartments" />
            <Line type="monotone" dataKey="villa" stroke="#82ca9d" name="Villas" />
            <Line type="monotone" dataKey="office" stroke="#ffc658" name="Offices" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardSpotlight>
  );
};

export default PriceIndexTrend;