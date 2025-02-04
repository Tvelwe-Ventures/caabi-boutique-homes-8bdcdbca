import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, MessageSquare, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GuestActivityProps {
  upcomingCheckins: {
    today: number;
    tomorrow: number;
  };
  pendingReviews: number;
  latestRating: number;
}

export const GuestActivity = ({ upcomingCheckins, pendingReviews, latestRating }: GuestActivityProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Upcoming Check-ins</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">Today's Check-ins</p>
                  <p className="text-sm text-gray-500">{upcomingCheckins.today} guests arriving</p>
                </div>
              </div>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Tomorrow's Check-ins</p>
                  <p className="text-sm text-gray-500">{upcomingCheckins.tomorrow} guests arriving</p>
                </div>
              </div>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Guest Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="font-medium">Pending Reviews</p>
                  <p className="text-sm text-gray-500">{pendingReviews} reviews to respond</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Respond</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Latest Rating</p>
                  <p className="text-sm text-gray-500">{latestRating}/5.0 from last 10 reviews</p>
                </div>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};