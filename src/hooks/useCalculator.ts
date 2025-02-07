import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
        console.log('Fetching calculator settings...');
        const session = await supabase.auth.getSession();
        
        if (!session.data.session) {
          console.log('No authenticated session, using default settings');
          return {
            investment_amount: 1000000,
            annual_return: 9.9,
            appreciation: 5.65
          };
        }

        const { data, error } = await supabase
          .from('calculator_settings')
          .select('*')
          .eq('user_id', session.data.session.user.id)
          .maybeSingle();
        
        if (error) {
          console.error('Error fetching settings:', error);
          throw error;
        }
        
        console.log('Successfully fetched settings:', data);
        return data || {
          investment_amount: 1000000,
          annual_return: 9.9,
          appreciation: 5.65
        };
      } catch (error) {
        console.error('Failed to fetch calculator settings:', error);
        return {
          investment_amount: 1000000,
          annual_return: 9.9,
          appreciation: 5.65
        };
      }
    },
    retry: 1,
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
      console.log('Saving calculator settings...');
      const session = await supabase.auth.getSession();
      
      if (!session.data.session) {
        toast({
          title: "Note",
          description: "Sign in to save your settings online.",
          duration: 3000,
        });
        return;
      }

      const { error } = await supabase
        .from('calculator_settings')
        .upsert({
          investment_amount: investmentAmount,
          annual_return: annualReturn,
          appreciation: appreciation,
          user_id: session.data.session.user.id
        });
      
      if (error) {
        console.error('Error saving settings:', error);
        toast({
          title: "Error",
          description: "Failed to save settings. Your changes are only saved locally.",
          duration: 3000,
        });
        return;
      }

      toast({
        title: "Success",
        description: "Your calculator settings have been saved.",
        duration: 3000,
      });
    } catch (error) {
      console.error('Failed to save settings:', error);
      toast({
        title: "Error",
        description: "Failed to save settings. Your changes are only saved locally.",
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