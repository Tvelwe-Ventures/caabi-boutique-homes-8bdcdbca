
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface PropertyFiltersProps {
  onFilterChange: (filters: PropertyFilters) => void;
}

export interface PropertyFilters {
  location: string;
  view: string;
  bedrooms: string;
}

export const PropertyFilters = ({ onFilterChange }: PropertyFiltersProps) => {
  const [filters, setFilters] = useState<PropertyFilters>({
    location: '',
    view: '',
    bedrooms: ''
  });

  const handleFilterChange = (key: keyof PropertyFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-white rounded-lg shadow-sm">
      <Select
        value={filters.location}
        onValueChange={(value) => handleFilterChange('location', value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Location" />
        </SelectTrigger>
        <SelectContent className="bg-white z-[1200]">
          <SelectItem value="downtown-dubai">Downtown Dubai</SelectItem>
          <SelectItem value="address-residence">The Address Residence</SelectItem>
          <SelectItem value="burj-vista">Burj Vista</SelectItem>
        </SelectContent>
      </Select>

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
          <SelectItem value="boulevard">Boulevard View</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.bedrooms}
        onValueChange={(value) => handleFilterChange('bedrooms', value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Bedrooms" />
        </SelectTrigger>
        <SelectContent className="bg-white z-[1200]">
          <SelectItem value="1">1 Bedroom</SelectItem>
          <SelectItem value="2">2 Bedrooms</SelectItem>
          <SelectItem value="3">3 Bedrooms</SelectItem>
          <SelectItem value="4">4 Bedrooms</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
