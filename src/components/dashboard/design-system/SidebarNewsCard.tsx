import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays } from 'lucide-react';

interface NewsItem {
  title: string;
  date: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const SidebarNewsCard = ({
  items = []
}: {
  items: NewsItem[];
}) => {
  return (
    <Card className="p-4 space-y-4 bg-white/50 backdrop-blur-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Daily Updates</h3>
        <CalendarDays className="h-5 w-5 text-gray-500" />
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className={getPriorityColor(item.priority)}>
                {item.category}
              </Badge>
              <span className="text-xs text-gray-500">{item.date}</span>
            </div>
            <p className="text-sm">{item.title}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};