import { CalculatorIcon } from "lucide-react";

const CalculatorHeader = () => {
  return (
    <div className="text-center space-y-8 max-w-3xl mx-auto">
      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-8">
        <CalculatorIcon className="w-8 h-8 text-primary" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight text-gradient sm:text-6xl">
        Dubai Property Investment Calculator
      </h1>
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">How to Use This Calculator</h2>
        <div className="grid gap-4 text-left text-sm">
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">1</div>
            <p>Enter your investment amount (property purchase price)</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">2</div>
            <p>Adjust the annual rental return slider based on expected rental yield</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">3</div>
            <p>Adjust the property appreciation slider based on expected value increase</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">4</div>
            <p>View your projected returns over 5 years, including rental income and property appreciation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorHeader;