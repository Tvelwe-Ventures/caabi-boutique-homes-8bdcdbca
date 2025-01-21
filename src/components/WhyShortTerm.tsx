import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { Video, MoveUpRight } from "lucide-react";

const data = [
  { month: 'Jan', shortTerm: 14000, longTerm: 7500 },
  { month: 'Feb', shortTerm: 13000, longTerm: 7500 },
  { month: 'Mar', shortTerm: 13000, longTerm: 7500 },
  { month: 'Apr', shortTerm: 10000, longTerm: 7500 },
  { month: 'May', shortTerm: 9000, longTerm: 7500 },
  { month: 'Jun', shortTerm: 7000, longTerm: 7500 },
  { month: 'Jul', shortTerm: 7000, longTerm: 7500 },
  { month: 'Aug', shortTerm: 6000, longTerm: 7500 },
  { month: 'Sep', shortTerm: 10000, longTerm: 7500 },
  { month: 'Oct', shortTerm: 13000, longTerm: 7500 },
  { month: 'Nov', shortTerm: 13000, longTerm: 7500 },
  { month: 'Dec', shortTerm: 15000, longTerm: 7500 },
];

const WhyShortTerm = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12">
          Why <span className="text-primary">short-term</span> let?
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">
              Short term letting against 12 months tenancy contract
            </h3>
            
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#888" 
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#888" 
                    fontSize={12}
                    tickFormatter={(value) => `${value/1000}k`}
                    label={{ 
                      value: 'Income (AED)', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { textAnchor: 'middle' }
                    }}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="shortTerm"
                    stroke="#7E69AB"
                    strokeWidth={2}
                    dot={{ fill: "#7E69AB" }}
                    name="Short term letting"
                  />
                  <Line
                    type="monotone"
                    dataKey="longTerm"
                    stroke="#FF6B6B"
                    strokeWidth={2}
                    dot={{ fill: "#FF6B6B" }}
                    name="12 month tenancy"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-primary"></div>
                <span>Short term letting over 12 month period. Total AED 130,000</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-[#FF6B6B]"></div>
                <span>12 month tenancy contract. Total AED 90,000</span>
              </div>
              <p className="text-xs text-gray-500 italic">* For illustration purposes only. The long term rent variables could potentially match the short-term revenue in some cases.</p>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-gray-700 text-lg leading-relaxed">
              Whether you are looking to supplement your monthly income, have a property investment portfolio, or are looking to make AED while you list your home for sale, the short-let market offers you great financial returns with full control of your asset and ultimate flexibility (including no RERA obligations).
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-[#0A0F1D] hover:bg-[#1A1F2D] text-white"
                size="lg"
              >
                Book a meeting
                <Video className="ml-2 h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                className="border-gray-300"
                size="lg"
              >
                Get a quote
                <MoveUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyShortTerm;