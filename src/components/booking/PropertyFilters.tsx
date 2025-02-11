
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { MapPin, Building2, Eye, Bed, Users } from "lucide-react";

interface PropertyFiltersProps {
  onFilterChange: (filters: PropertyFilters) => void;
}

export interface PropertyFilters {
  location: string;
  building: string;
  view: string;
  bedrooms: string;
  guests: string;
}

export const PropertyFilters = ({ onFilterChange }: PropertyFiltersProps) => {
  const [filters, setFilters] = useState<PropertyFilters>({
    location: '',
    building: '',
    view: '',
    bedrooms: '',
    guests: ''
  });

  const handleFilterChange = (key: keyof PropertyFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location
          </label>
          <Select
            value={filters.location}
            onValueChange={(value) => handleFilterChange('location', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Area" />
            </SelectTrigger>
            <SelectContent className="bg-white z-[1200]">
              <SelectItem value="downtown-dubai">Downtown Dubai</SelectItem>
              <SelectItem value="business-bay">Business Bay</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
              <SelectItem value="address-residences">The Address Residences</SelectItem>
              <SelectItem value="boulevard-central">Boulevard Central</SelectItem>
              <SelectItem value="burj-vista">Burj Vista</SelectItem>
              <SelectItem value="downtown-views">Downtown Views</SelectItem>
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
              <SelectItem value="burj-khalifa">Burj Khalifa View</SelectItem>
              <SelectItem value="fountain">Dubai Fountain View</SelectItem>
              <SelectItem value="dubai-opera">Dubai Opera View</SelectItem>
              <SelectItem value="downtown">Downtown View</SelectItem>
              <SelectItem value="sheikh-zayed">Sheikh Zayed Road View</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Bed className="w-4 h-4" />
            Bedrooms
          </label>
          <Select
            value={filters.bedrooms}
            onValueChange={(value) => handleFilterChange('bedrooms', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Number of Bedrooms" />
            </SelectTrigger>
            <SelectContent className="bg-white z-[1200]">
              <SelectItem value="1">1 Bedroom</SelectItem>
              <SelectItem value="2">2 Bedrooms</SelectItem>
              <SelectItem value="3">3 Bedrooms</SelectItem>
              <SelectItem value="4">4+ Bedrooms</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Guests
          </label>
          <Select
            value={filters.guests}
            onValueChange={(value) => handleFilterChange('guests', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Number of Guests" />
            </SelectTrigger>
            <SelectContent className="bg-white z-[1200]">
              <SelectItem value="1-2">1-2 Guests</SelectItem>
              <SelectItem value="3-4">3-4 Guests</SelectItem>
              <SelectItem value="5-6">5-6 Guests</SelectItem>
              <SelectItem value="7+">7+ Guests</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="text-sm text-gray-500 bg-blue-50 p-4 rounded-lg">
        <p>✨ Select your preferences to find the perfect luxury apartment in Downtown Dubai. All our properties feature premium amenities and stunning views.</p>
      </div>
    </div>
  );
};
