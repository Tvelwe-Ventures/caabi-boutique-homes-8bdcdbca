
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Building2, Eye } from "lucide-react";

interface PropertyFiltersProps {
  onFilterChange: (filters: PropertyFilters) => void;
}

export interface PropertyFilters {
  building: string;
  view: string;
}

export const PropertyFilters = ({ onFilterChange }: PropertyFiltersProps) => {
  const [filters, setFilters] = useState<PropertyFilters>({
    building: '',
    view: '',
  });

  const handleFilterChange = (key: keyof PropertyFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-4">
      <div 
        id="hostaway-booking-widget" 
        className="w-full relative mb-6"
        style={{
          minHeight: '80px',
          borderRadius: '0.75rem',
          overflow: 'visible',
          isolation: 'isolate'
        }}
      >
        <style>
          {`
            /* Ensure Hostaway dropdown menus are visible */
            #hostaway-booking-widget [role="listbox"],
            #hostaway-booking-widget [role="dialog"],
            #hostaway-booking-widget [role="presentation"] {
              z-index: 1100 !important;
            }

            /* Mobile-friendly adjustments */
            @media (max-width: 640px) {
              #hostaway-booking-widget input,
              #hostaway-booking-widget button {
                font-size: 14px;
                padding: 8px 12px;
              }
            }
          `}
        </style>
      </div>

      <div className="text-sm font-medium text-gray-700 mb-4">
        Additional Filters
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Building
          </label>
          <Select
            value={filters.building}
            onValueChange={(value) => handleFilterChange('building', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Building" />
            </SelectTrigger>
            <SelectContent className="bg-white z-[1200]">
              <SelectItem value="boulevard-central">Boulevard Central</SelectItem>
              <SelectItem value="downtown-oasis">Downtown Oasis</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Eye className="w-4 h-4" />
            View
          </label>
          <Select
            value={filters.view}
            onValueChange={(value) => handleFilterChange('view', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select View" />
            </SelectTrigger>
            <SelectContent className="bg-white z-[1200]">
              <SelectItem value="boulevard">Boulevard View</SelectItem>
              <SelectItem value="burj-khalifa">Burj Khalifa View</SelectItem>
              <SelectItem value="downtown">Downtown View</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="text-sm text-gray-500 bg-blue-50 p-4 rounded-lg mt-6">
        <p>✨ Find your perfect Downtown Dubai apartment. Our properties feature premium amenities and are professionally managed for your comfort.</p>
      </div>
    </div>
  );
};

