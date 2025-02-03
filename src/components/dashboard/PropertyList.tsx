import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Home } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";

type PropertyType = "owned" | "leased" | "all";

const PropertyList = () => {
  const [filter, setFilter] = useState<PropertyType>("all");

  const { data: properties, isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  const filteredProperties = properties?.filter(property => {
    if (filter === "all") return true;
    return filter === "owned" ? property.owner_id : !property.owner_id;
  });

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Button 
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          All Properties
        </Button>
        <Button 
          variant={filter === "owned" ? "default" : "outline"}
          onClick={() => setFilter("owned")}
        >
          Owned
        </Button>
        <Button 
          variant={filter === "leased" ? "default" : "outline"}
          onClick={() => setFilter("leased")}
        >
          Leased
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="h-[200px]" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties?.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      {property.owner_id ? (
                        <Home className="w-5 h-5 text-primary" />
                      ) : (
                        <Building2 className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {property.owner_id ? "Owned" : "Leased"}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{property.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Rent</p>
                      <p className="text-lg font-semibold">
                        {formatCurrency(property.monthly_rent)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Occupancy</p>
                      <p className="text-lg font-semibold">
                        {property.occupancy_rate}%
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Details</p>
                    <div className="flex gap-4 text-sm">
                      <span>{property.bedrooms}BR</span>
                      <span>{property.bathrooms} Bath</span>
                      <span>{property.area_sqft} sqft</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyList;