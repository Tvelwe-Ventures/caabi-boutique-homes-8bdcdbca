import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface BookingTrendsProps {
  data: Array<{
    month: string;
    direct: number;
    airbnb: number;
    booking: number;
  }>;
}

export const BookingTrends = ({ data }: BookingTrendsProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Booking Trends by Channel</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="direct" stackId="a" fill="#0088FE" name="Direct" />
              <Bar dataKey="airbnb" stackId="a" fill="#00C49F" name="Airbnb" />
              <Bar dataKey="booking" stackId="a" fill="#FFBB28" name="Booking.com" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};