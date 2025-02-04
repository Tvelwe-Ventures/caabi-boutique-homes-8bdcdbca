import { Card, CardContent } from '@/components/ui/card';
import { Users, Star, UserCheck } from 'lucide-react';

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
      icon: Users,
      color: 'text-blue-500',
      trend: '+12%',
      trendColor: 'text-green-500',
    },
    {
      label: 'Average Rating',
      value: `${averageRating}/5.0`,
      icon: Star,
      color: 'text-yellow-500',
      trend: '+5%',
      trendColor: 'text-green-500',
    },
    {
      label: 'Repeat Guests',
      value: repeatGuests,
      icon: UserCheck,
      color: 'text-green-500',
      trend: '+18%',
      trendColor: 'text-green-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <span className={`text-sm ${stat.trendColor}`}>{stat.trend}</span>
                  </div>
                </div>
                <div className={`p-4 rounded-full bg-gray-50 ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};