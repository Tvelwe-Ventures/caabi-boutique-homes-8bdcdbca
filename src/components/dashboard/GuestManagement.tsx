import React from 'react';
import { GuestStats } from './guests/GuestStats';
import { GuestTypeDistribution } from './guests/GuestTypeDistribution';
import { BookingTrends } from './guests/BookingTrends';
import { GuestActivity } from './guests/GuestActivity';

const GuestManagement = () => {
  // Sample data - would be fetched from your backend
  const guestStats = {
    totalGuests: 1250,
    averageRating: 4.8,
    repeatGuests: 280,
    pendingReviews: 12,
    upcomingCheckins: {
      today: 3,
      tomorrow: 5
    }
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Guest Management</h2>
          <p className="text-sm text-gray-500">Comprehensive guest analytics and management</p>
        </div>
      </div>

      <GuestStats
        totalGuests={guestStats.totalGuests}
        averageRating={guestStats.averageRating}
        repeatGuests={guestStats.repeatGuests}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GuestTypeDistribution data={guestTypeData} />
        <BookingTrends data={bookingTrendsData} />
      </div>

      <GuestActivity
        upcomingCheckins={guestStats.upcomingCheckins}
        pendingReviews={guestStats.pendingReviews}
        latestRating={4.9}
      />
    </div>
  );
};

export default GuestManagement;