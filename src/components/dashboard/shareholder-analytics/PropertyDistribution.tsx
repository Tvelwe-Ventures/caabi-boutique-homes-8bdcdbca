import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const data = [
  { name: "Boulevard Central Tower 1", value: 3200000, percentage: 25.8 },
  { name: "Standpoint Towers", value: 2800000, percentage: 22.6 },
  { name: "Burj Royale", value: 4100000, percentage: 33.1 },
  { name: "Downtown Views", value: 2300000, percentage: 18.5 }
];

const COLORS = ['#8394CA', '#DFD5EA', '#9FB1D6', '#C2B4D3'];

const PropertyDistribution = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Investment Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={140}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
                label={({ name, percentage }) => `${name} (${percentage}%)`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => `AED ${value.toLocaleString()}`}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Total Investment</p>
            <p className="text-2xl font-semibold">
              AED {data.reduce((acc, curr) => acc + curr.value, 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Number of Properties</p>
            <p className="text-2xl font-semibold">{data.length}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyDistribution;