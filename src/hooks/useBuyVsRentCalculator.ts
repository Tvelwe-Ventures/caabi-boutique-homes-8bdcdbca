import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useBuyVsRentCalculator = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    propertyPrice: 1000000,
    downPayment: 200000,
    mortgageTerm: 25,
    interestRate: 4.99,
    monthlyRent: 8000,
    rentIncreaseRate: 5,
    propertyAppreciationRate: 5,
    maintenanceCostRate: 1,
    propertyTaxRate: 2,
    insuranceRate: 0.5,
  });

  const { data: savedSettings } = useQuery({
    queryKey: ['buyRentSettings'],
    queryFn: async () => {
      console.log('Fetching buy vs rent settings...');
      const { data, error } = await supabase
        .from('buy_rent_settings')
        .select('*')
        .single();
      
      if (error) {
        console.warn('Error fetching settings:', error);
        return null;
      }
      
      console.log('Successfully fetched settings:', data);
      return data;
    },
    retry: false,
    gcTime: 0
  });

  useEffect(() => {
    if (savedSettings) {
      setSettings({
        propertyPrice: savedSettings.property_price,
        downPayment: savedSettings.down_payment,
        mortgageTerm: savedSettings.mortgage_term,
        interestRate: savedSettings.interest_rate,
        monthlyRent: savedSettings.monthly_rent,
        rentIncreaseRate: savedSettings.rent_increase_rate,
        propertyAppreciationRate: savedSettings.property_appreciation_rate,
        maintenanceCostRate: savedSettings.maintenance_cost_rate,
        propertyTaxRate: savedSettings.property_tax_rate,
        insuranceRate: savedSettings.insurance_rate,
      });
    }
  }, [savedSettings]);

  const handleSettingChange = async (key: keyof typeof settings, value: number) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);

    try {
      const { error } = await supabase
        .from('buy_rent_settings')
        .upsert({
          property_price: newSettings.propertyPrice,
          down_payment: newSettings.downPayment,
          mortgage_term: newSettings.mortgageTerm,
          interest_rate: newSettings.interestRate,
          monthly_rent: newSettings.monthlyRent,
          rent_increase_rate: newSettings.rentIncreaseRate,
          property_appreciation_rate: newSettings.propertyAppreciationRate,
          maintenance_cost_rate: newSettings.maintenanceCostRate,
          property_tax_rate: newSettings.propertyTaxRate,
          insurance_rate: newSettings.insuranceRate,
        });

      if (error) {
        console.warn('Error saving settings:', error);
        toast({
          title: "Note",
          description: "Changes saved locally. Connect to save online.",
          duration: 3000,
        });
        return;
      }

      toast({
        title: "Settings saved",
        description: "Your calculator settings have been saved successfully.",
        duration: 3000,
      });
    } catch (error) {
      console.warn('Failed to save settings:', error);
      toast({
        title: "Note",
        description: "Changes saved locally. Connect to save online.",
        duration: 3000,
      });
    }
  };

  const calculateMortgagePayment = () => {
    const principal = settings.propertyPrice - settings.downPayment;
    const monthlyRate = settings.interestRate / 100 / 12;
    const numberOfPayments = settings.mortgageTerm * 12;
    
    const monthlyPayment = 
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return monthlyPayment;
  };

  const generateComparisonData = () => {
    const years = settings.mortgageTerm;
    const monthlyMortgage = calculateMortgagePayment();
    const data = [];

    let rentAmount = settings.monthlyRent;
    let propertyValue = settings.propertyPrice;
    let totalRentPaid = 0;
    let totalMortgagePaid = 0;
    let totalMaintenancePaid = 0;
    let totalTaxesPaid = 0;
    let totalInsurancePaid = 0;

    for (let year = 0; year <= years; year++) {
      // Calculate yearly costs
      const yearlyRent = rentAmount * 12;
      const yearlyMortgage = monthlyMortgage * 12;
      const yearlyMaintenance = (propertyValue * settings.maintenanceCostRate) / 100;
      const yearlyTaxes = (propertyValue * settings.propertyTaxRate) / 100;
      const yearlyInsurance = (propertyValue * settings.insuranceRate) / 100;

      // Update running totals
      totalRentPaid += yearlyRent;
      totalMortgagePaid += yearlyMortgage;
      totalMaintenancePaid += yearlyMaintenance;
      totalTaxesPaid += yearlyTaxes;
      totalInsurancePaid += yearlyInsurance;

      // Calculate total costs
      const buyingCosts = totalMortgagePaid + totalMaintenancePaid + totalTaxesPaid + totalInsurancePaid;
      const rentingCosts = totalRentPaid;

      data.push({
        year,
        propertyValue,
        rentAmount: rentAmount * 12,
        mortgagePayment: yearlyMortgage,
        maintenanceCost: yearlyMaintenance,
        propertyTax: yearlyTaxes,
        insurance: yearlyInsurance,
        totalBuyingCosts: buyingCosts,
        totalRentingCosts: rentingCosts,
        netWorthBuying: propertyValue - (settings.propertyPrice - settings.downPayment) + settings.downPayment - buyingCosts,
        netWorthRenting: -rentingCosts,
      });

      // Update values for next year
      rentAmount *= (1 + settings.rentIncreaseRate / 100);
      propertyValue *= (1 + settings.propertyAppreciationRate / 100);
    }

    return data;
  };

  return {
    settings,
    handleSettingChange,
    generateComparisonData,
    calculateMortgagePayment,
  };
};