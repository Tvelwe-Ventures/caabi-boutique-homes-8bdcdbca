import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Percent } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Shareholder {
  id: string;
  full_name: string;
  role: 'founder' | 'coo' | 'investor';
  ownership_percentage: number;
  is_active: boolean;
}

const CapTable = () => {
  const { data: shareholders, isLoading } = useQuery({
    queryKey: ['shareholders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('shareholders')
        .select('*')
        .order('ownership_percentage', { ascending: false });
      
      if (error) throw error;
      return data as Shareholder[];
    }
  });

  const managementFeePercentage = 15; // 15% management fee

  const calculateManagementFee = (ownershipPercentage: number) => {
    return (ownershipPercentage / 100) * managementFeePercentage;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Cap Table
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-3 text-sm font-medium text-muted-foreground">
            <div>Shareholder</div>
            <div className="text-right">Ownership</div>
            <div className="text-right">Management Fee Share</div>
          </div>
          <div className="divide-y">
            {shareholders?.map((shareholder) => (
              <div key={shareholder.id} className="grid grid-cols-3 py-3">
                <div>
                  <div className="font-medium text-foreground">{shareholder.full_name}</div>
                  <div className="text-sm text-muted-foreground capitalize">{shareholder.role}</div>
                </div>
                <div className="flex items-center justify-end gap-1">
                  <Percent className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{shareholder.ownership_percentage}</span>
                </div>
                <div className="text-right font-medium">
                  {calculateManagementFee(shareholder.ownership_percentage).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              * Management fee distribution is calculated based on {managementFeePercentage}% of total revenue
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CapTable;