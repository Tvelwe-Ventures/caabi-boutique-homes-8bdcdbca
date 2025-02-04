import { Card, CardContent } from '@/components/ui/card';
import { Users, Star, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface GuestStatsProps {
  totalGuests: number;
  averageRating: number;
  repeatGuests: number;
}

export const GuestStats = ({ totalGuests, averageRating, repeatGuests }: GuestStatsProps) => {
  const stats = [
    {
      label: 'Total Guests',
      value: totalGuests,
      subValue: '+12%',
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Average Rating',
      value: `${averageRating}/5.0`,
      subValue: '+5%',
      icon: Star,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
    },
    {
      label: 'Repeat Guests',
      value: repeatGuests,
      subValue: '+18%',
      icon: UserCheck,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <div className="flex items-baseline space-x-2">
                      <p className="text-2xl font-semibold tracking-tight">
                        {stat.value}
                      </p>
                      <span className="text-sm font-medium text-green-600">
                        {stat.subValue}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ 
                        width: typeof stat.value === 'number' 
                          ? `${Math.min((stat.value / (stat.label === 'Average Rating' ? 5 : 1500)) * 100, 100)}%`
                          : '70%'
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};