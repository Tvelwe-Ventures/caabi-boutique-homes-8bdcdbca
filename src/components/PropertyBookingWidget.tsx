
import { useEffect } from "react";

interface PropertyBookingWidgetProps {
  listingId: number;
  baseUrl: string;
}

export const PropertyBookingWidget = ({ listingId, baseUrl }: PropertyBookingWidgetProps) => {
  useEffect(() => {
    // Initialize Hostaway Calendar Widget
    const calendarScript = document.createElement("script");
    calendarScript.src = "https://d2q3n06xhbi0am.cloudfront.net/calendar.js";
    calendarScript.async = true;
    calendarScript.onload = () => {
      // @ts-ignore - Hostaway widget global
      window.hostawayCalendarWidget({
        baseUrl,
        listingId,
        numberOfMonths: 2,
        openInNewTab: false,
        font: 'Inter',
        rounded: true,
        button: {
          action: 'checkout',
          text: 'Book now',
        },
        clearButtonText: 'Clear dates',
        color: {
          mainColor: '#1A2957',
          frameColor: '#8394CA',
          textColor: '#1A2957',
        },
      });
    };
    document.body.appendChild(calendarScript);

    return () => {
      document.body.removeChild(calendarScript);
    };
  }, [listingId, baseUrl]);

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div 
        id="hostaway-calendar-widget" 
        className="w-full"
        style={{
          minHeight: '400px',
          borderRadius: '0.75rem',
          overflow: 'hidden'
        }}
      />
    </div>
  );
};
