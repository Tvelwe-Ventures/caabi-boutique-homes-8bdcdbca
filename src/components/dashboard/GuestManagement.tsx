import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Users, Star, MessageSquare, Calendar, Clock, UserCheck } from 'lucide-react';

const GuestManagement = () => {
  // Sample data - would be fetched from your backend
  const guestStats = {
    totalGuests: 1250,
    activeBookings: 45,
    averageRating: 4.8,
    repeatGuests: 280,
    pendingReviews: 12,
    upcomingCheckins: 8
  };

  const guestTypeData = [
    { name: 'Business', value: 30 },
    { name: 'Leisure', value: 45 },
    { name: 'Long-term', value: 15 },
    { name: 'Group', value: 10 }
  ];

  const bookingTrendsData = [
    { month: 'Jan', direct: 25, airbnb: 40, booking: 35 },
    { month: 'Feb', direct: 30, airbnb: 45, booking: 30 },
    { month: 'Mar', direct: 35, airbnb: 35, booking: 40 },
    { month: 'Apr', direct: 40, airbnb: 30, booking: 45 },
    { month: 'May', direct: 45, airbnb: 35, booking: 35 },
    { month: 'Jun', direct: 50, airbnb: 40, booking: 30 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Guest Management</h2>
          <p className="text-sm text-gray-500">Comprehensive guest analytics and management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Guests</p>
                <p className="text-2xl font-bold">{guestStats.totalGuests}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Average Rating</p>
                <p className="text-2xl font-bold">{guestStats.averageRating}/5.0</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Repeat Guests</p>
                <p className="text-2xl font-bold">{guestStats.repeatGuests}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Guest Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={guestTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {guestTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Trends by Channel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bookingTrendsData}>
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Check-ins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Today's Check-ins</p>
                    <p className="text-sm text-gray-500">3 guests arriving</p>
                  </div>
                </div>
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                  View Details
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Tomorrow's Check-ins</p>
                    <p className="text-sm text-gray-500">5 guests arriving</p>
                  </div>
                </div>
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                  View Details
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Guest Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-medium">Pending Reviews</p>
                    <p className="text-sm text-gray-500">{guestStats.pendingReviews} reviews to respond</p>
                  </div>
                </div>
                <button className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600">
                  Respond
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Latest Rating</p>
                    <p className="text-sm text-gray-500">4.9/5.0 from last 10 reviews</p>
                  </div>
                </div>
                <button className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600">
                  View All
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GuestManagement;