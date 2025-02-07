import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, MapPin, Bed, Coins } from "lucide-react";

interface RentalInputsProps {
  values: {
    annualRent: number;
    initialInvestment: number;
    numberOfCheques: number;
    location: string;
    bedrooms: number;
    area: number;
    maxGuests: number;
  };
  onChange: (values: any) => void;
}

export const RentalInputs = ({ values, onChange }: RentalInputsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-primary" />
          Annual Rent (AED)
        </label>
        <Input
          type="number"
          value={values.annualRent}
          onChange={(e) =>
            onChange({ ...values, annualRent: Number(e.target.value) })
          }
          className="bg-white border-primary/20 focus:border-primary"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Coins className="w-4 h-4 text-primary" />
          Initial Investment (AED)
        </label>
        <Input
          type="number"
          value={values.initialInvestment}
          onChange={(e) =>
            onChange({ ...values, initialInvestment: Number(e.target.value) })
          }
          className="bg-white border-primary/20 focus:border-primary"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          Location
        </label>
        <Select
          value={values.location}
          onValueChange={(value) =>
            onChange({ ...values, location: value })
          }
        >
          <SelectTrigger className="bg-white border-primary/20">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="downtown">Downtown Dubai</SelectItem>
            <SelectItem value="marina">Dubai Marina</SelectItem>
            <SelectItem value="palm">Palm Jumeirah</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Bed className="w-4 h-4 text-primary" />
          Bedrooms
        </label>
        <Input
          type="number"
          value={values.bedrooms}
          onChange={(e) =>
            onChange({ ...values, bedrooms: Number(e.target.value) })
          }
          className="bg-white border-primary/20 focus:border-primary"
        />
      </div>
    </div>
  );
};