
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Building2, Calendar } from "lucide-react";

interface PropertyData {
  name: string;
  liveDate: string;
  stats: {
    rentalRevenue: number;
    nightsBooked: number;
    occupancyRate: number;
    averageDailyRate: number;
    averageRevenuePerStay: number;
  };
  icon: typeof Building2;
}

const properties: PropertyData[] = [
  {
    name: "Boulevard Central (One-bedroom) Tower 1",
    liveDate: "23 May",
    stats: {
      rentalRevenue: 176406.44,
      nightsBooked: 319,
      occupancyRate: 93.00,
      averageDailyRate: 498.64,
      averageRevenuePerStay: 2315.07
    },
    icon: Building2
  },
  {
    name: "Standpoint Towers (One-bedroom)",
    liveDate: "10 October",
    stats: {
      rentalRevenue: 156533.51,
      nightsBooked: 184,
      occupancyRate: 90.64,
      averageDailyRate: 768.79,
      averageRevenuePerStay: 3102.23
    },
    icon: Building2
  },
  {
    name: "Burj Royale (Two-bedroom)",
    liveDate: "12 August 2024",
    stats: {
      rentalRevenue: 234124.64,
      nightsBooked: 210,
      occupancyRate: 80.15,
      averageDailyRate: 1103.10,
      averageRevenuePerStay: 5202.77
    },
    icon: Building2
  }
];

const PropertyPerformance = () => {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Property Performance
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg">
          Real performance data from our managed properties
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full bg-white shadow-sm hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <property.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    Live since {property.liveDate}
                  </div>
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {property.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Rental Revenue</p>
                    <p className="text-lg font-semibold text-primary">
                      AED {property.stats.rentalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Nights Booked</p>
                    <p className="text-lg font-semibold text-primary">
                      {property.stats.nightsBooked}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Occupancy Rate</p>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${property.stats.occupancyRate}%` }}
                        />
                      </div>
                      <span className="ml-2 text-sm font-semibold text-gray-700">
                        {property.stats.occupancyRate}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-sm text-gray-500">Average Daily Rate</p>
                      <p className="text-base font-semibold text-gray-900">
                        AED {property.stats.averageDailyRate.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Revenue per Stay</p>
                      <p className="text-base font-semibold text-gray-900">
                        AED {property.stats.averageRevenuePerStay.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PropertyPerformance;
