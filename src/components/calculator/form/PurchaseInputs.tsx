import { Input } from "@/components/ui/input";
import { Building2, Coins, CreditCard } from "lucide-react";

interface PurchaseInputsProps {
  values: {
    purchaseValue: number;
    paymentType: 'mortgage';
    downPayment: number;
    monthlyMortgage: number;
    reraFees: number;
    interiorCosts: number;
  };
  onChange: (values: any) => void;
}

export const PurchaseInputs = ({ values, onChange }: PurchaseInputsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-primary" />
          Purchase Value (AED)
        </label>
        <Input
          type="number"
          value={values.purchaseValue}
          onChange={(e) =>
            onChange({ ...values, purchaseValue: Number(e.target.value) })
          }
          className="bg-white border-primary/20 focus:border-primary"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-primary" />
          Down Payment (AED)
        </label>
        <Input
          type="number"
          value={values.downPayment}
          onChange={(e) =>
            onChange({ ...values, downPayment: Number(e.target.value) })
          }
          className="bg-white border-primary/20 focus:border-primary"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Coins className="w-4 h-4 text-primary" />
          Monthly Mortgage (AED)
        </label>
        <Input
          type="number"
          value={values.monthlyMortgage}
          onChange={(e) =>
            onChange({ ...values, monthlyMortgage: Number(e.target.value) })
          }
          className="bg-white border-primary/20 focus:border-primary"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-primary" />
          Interior Costs (AED)
        </label>
        <Input
          type="number"
          value={values.interiorCosts}
          onChange={(e) =>
            onChange({ ...values, interiorCosts: Number(e.target.value) })
          }
          className="bg-white border-primary/20 focus:border-primary"
        />
      </div>
    </div>
  );
};