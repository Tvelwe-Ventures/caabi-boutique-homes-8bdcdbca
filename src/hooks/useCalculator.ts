import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { CalculatorSettings } from "@/components/calculator/types";

export const useCalculator = () => {
  const { toast } = useToast();
  const [investmentAmount, setInvestmentAmount] = useState(1000000);
  const [annualReturn, setAnnualReturn] = useState(9.9);
  const [appreciation, setAppreciation] = useState(5.65);

  const { data: savedSettings } = useQuery({
    queryKey: ['calculatorSettings'],
    queryFn: async () => {
      try {
        console.log('Attempting to fetch calculator settings...');
        const { data, error } = await supabase
          .from('calculator_settings')
          .select('*')
          .single();
        
        if (error) {
          console.warn('Supabase query returned error:', error);
          return null;
        }
        
        console.log('Successfully fetched settings:', data);
        return data as CalculatorSettings;
      } catch (error) {
        console.warn('Failed to fetch calculator settings:', error);
        return null;
      }
    },
    retry: false,
    gcTime: 0
  });

  useEffect(() => {
    if (savedSettings) {
      setInvestmentAmount(savedSettings.investment_amount);
      setAnnualReturn(savedSettings.annual_return);
      setAppreciation(savedSettings.appreciation);
    }
  }, [savedSettings]);

  const handleValueChange = async () => {
    try {
      const { error } = await supabase
        .from('calculator_settings')
        .upsert({
          investment_amount: investmentAmount,
          annual_return: annualReturn,
          appreciation: appreciation,
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

  const generateChartData = () => {
    const years = 5;
    const data = [];
    
    for (let i = 0; i <= years * 12; i++) {
      const month = i;
      const rentalReturn = Number(investmentAmount) * (Math.pow(1 + (Number(annualReturn) / 100) / 12, i) - 1);
      const propertyAppreciation = Number(investmentAmount) * (Math.pow(1 + (Number(appreciation) / 100) / 12, i) - 1);
      
      data.push({
        month,
        rental: rentalReturn,
        appreciation: propertyAppreciation,
        total: rentalReturn + propertyAppreciation
      });
    }
    
    return data;
  };

  return {
    investmentAmount,
    setInvestmentAmount,
    annualReturn,
    setAnnualReturn,
    appreciation,
    setAppreciation,
    handleValueChange,
    generateChartData
  };
};