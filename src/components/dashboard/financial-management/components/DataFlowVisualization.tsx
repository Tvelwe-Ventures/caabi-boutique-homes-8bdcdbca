
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowRight, Database, Server, Cloud } from 'lucide-react';

interface ActiveFlows {
  hostaway: boolean;
  pricelabs: boolean;
  realestate: boolean;
}

const DataFlowVisualization = () => {
  const [activeFlows, setActiveFlows] = useState<ActiveFlows>({
    hostaway: false,
    pricelabs: false,
    realestate: false
  });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFlows(prev => ({
        hostaway: Math.random() > 0.3,
        pricelabs: Math.random() > 0.3,
        realestate: Math.random() > 0.3
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full p-4 bg-gray-50">
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-lg">Real-Time Data Integration Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-[400px] flex items-center justify-center">
            {/* Data Sources Column */}
            <div className="absolute left-8 flex flex-col gap-12">
              {/* Hostaway */}
              <div className={`transition-all duration-500 ${activeFlows.hostaway ? 'scale-105' : ''}`}>
                <div className="flex items-center">
                  <div className="w-32 h-16 bg-blue-500 rounded-lg shadow-lg flex flex-col items-center justify-center text-white">
                    <Database className="w-6 h-6 mb-1" />
                    <span className="text-sm font-medium">Hostaway</span>
                  </div>
                  <div className={`ml-3 w-16 h-1.5 bg-blue-500 transition-opacity duration-300 ${activeFlows.hostaway ? 'opacity-100' : 'opacity-30'}`} />
                </div>
              </div>

              {/* PriceLabs */}
              <div className={`transition-all duration-500 ${activeFlows.pricelabs ? 'scale-105' : ''}`}>
                <div className="flex items-center">
                  <div className="w-32 h-16 bg-green-500 rounded-lg shadow-lg flex flex-col items-center justify-center text-white">
                    <Database className="w-6 h-6 mb-1" />
                    <span className="text-sm font-medium">PriceLabs</span>
                  </div>
                  <div className={`ml-3 w-16 h-1.5 bg-green-500 transition-opacity duration-300 ${activeFlows.pricelabs ? 'opacity-100' : 'opacity-30'}`} />
                </div>
              </div>

              {/* Real Estate API */}
              <div className={`transition-all duration-500 ${activeFlows.realestate ? 'scale-105' : ''}`}>
                <div className="flex items-center">
                  <div className="w-32 h-16 bg-orange-500 rounded-lg shadow-lg flex flex-col items-center justify-center text-white">
                    <Database className="w-6 h-6 mb-1" />
                    <span className="text-sm font-medium">Real Estate API</span>
                  </div>
                  <div className={`ml-3 w-16 h-1.5 bg-orange-500 transition-opacity duration-300 ${activeFlows.realestate ? 'opacity-100' : 'opacity-30'}`} />
                </div>
              </div>
            </div>

            {/* Processing Node */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col gap-6">
              <div className="w-36 h-20 bg-purple-500 rounded-lg shadow-lg flex flex-col items-center justify-center text-white">
                <Server className="w-6 h-6 mb-1" />
                <span className="text-sm font-medium">Analytics Engine</span>
              </div>
              <div className="w-36 h-20 bg-indigo-500 rounded-lg shadow-lg flex flex-col items-center justify-center text-white">
                <Server className="w-6 h-6 mb-1" />
                <span className="text-sm font-medium">ML Processing</span>
              </div>
            </div>

            {/* Central Platform */}
            <div className="absolute right-8">
              <div className="w-40 h-40 bg-blue-600 rounded-full shadow-lg flex flex-col items-center justify-center text-white relative">
                <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping" />
                <Cloud className="w-10 h-10 mb-2" />
                <span className="text-sm font-medium">Central</span>
                <span className="text-sm font-medium">Platform</span>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="absolute top-2 right-2 flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${activeFlows.hostaway ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className="text-xs text-gray-600">Hostaway Data Flow</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${activeFlows.pricelabs ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className="text-xs text-gray-600">PriceLabs Data Flow</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${activeFlows.realestate ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className="text-xs text-gray-600">Real Estate Data Flow</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataFlowVisualization;
