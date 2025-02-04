import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartLegend, ChartTooltip } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", revenue: 2400, expenses: 1398 },
  { month: "Feb", revenue: 1398, expenses: 2400 },
  { month: "Mar", revenue: 9800, expenses: 2400 },
  { month: "Apr", revenue: 3908, expenses: 2400 },
  { month: "May", revenue: 4800, expenses: 2400 },
  { month: "Jun", revenue: 3800, expenses: 2400 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    theme: {
      light: "#8394CA",
      dark: "#9b87f5",
    },
  },
  expenses: {
    label: "Expenses",
    theme: {
      light: "#DFD5EA",
      dark: "#7E69AB",
    },
  },
}

export function ChartSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Charts</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="h-[300px]">
          <ChartContainer config={chartConfig}>
            <AreaChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip />
              <ChartLegend />
              <Area
                type="monotone"
                dataKey="revenue"
                stackId="1"
                stroke="var(--color-revenue)"
                fill="var(--color-revenue)"
                fillOpacity={0.2}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stackId="1"
                stroke="var(--color-expenses)"
                fill="var(--color-expenses)"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}