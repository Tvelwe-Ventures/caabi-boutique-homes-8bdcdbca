import { cn } from "@/lib/utils";
import { Building2, MapPin, Users } from "lucide-react";

interface PropertyCardProps {
  className?: string;
  backgroundImage?: string;
  property: {
    name: string;
    location: string;
    image: string;
    maxGuests?: number;
  };
  content: {
    title: string;
    description: string;
    price?: string;
  };
}

export const PropertyCard = ({ 
  className,
  backgroundImage,
  property,
  content
}: PropertyCardProps) => {
  return (
    <div className="max-w-xs w-full group/card">
      <div
        className={cn(
          "cursor-pointer overflow-hidden relative card h-96 rounded-xl shadow-xl max-w-sm mx-auto flex flex-col justify-between p-4 bg-cover transition-all duration-300 hover:shadow-2xl",
          className
        )}
        style={{ backgroundImage: `url(${backgroundImage || property.image})` }}
      >
        <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 transition duration-300 group-hover/card:opacity-80" />
        
        <div className="flex flex-row items-center space-x-4 z-10">
          <div className="p-2 rounded-full bg-white/90 backdrop-blur-sm">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <p className="font-medium text-base text-white relative z-10">
              {property.name}
            </p>
            <div className="flex items-center text-sm text-gray-200">
              <MapPin className="h-3 w-3 mr-1" />
              {property.location}
            </div>
          </div>
        </div>

        <div className="text content">
          <h1 className="font-bold text-xl md:text-2xl text-white relative z-10 mb-2">
            {content.title}
          </h1>
          <p className="font-normal text-sm text-gray-100 relative z-10 mb-4">
            {content.description}
          </p>
          
          <div className="flex justify-between items-center">
            {property.maxGuests && (
              <div className="flex items-center text-white text-sm">
                <Users className="h-4 w-4 mr-1" />
                Up to {property.maxGuests} guests
              </div>
            )}
            {content.price && (
              <div className="text-white font-semibold">
                {content.price}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};