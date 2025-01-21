import RentalComparisonChart from "./charts/RentalComparisonChart";
import ChartLegend from "./charts/ChartLegend";
import ShortTermContent from "./sections/ShortTermContent";
import { CardSpotlight } from "./ui/card-spotlight";

const WhyShortTerm = () => {
  const legendItems = [
    {
      color: "#7E69AB",
      label: "Short term letting over 12 month period",
      total: "AED 130,000"
    },
    {
      color: "#FF6B6B",
      label: "12 month tenancy contract",
      total: "AED 90,000"
    }
  ];

  const disclaimer = "* For illustration purposes only. The long term rent variables could potentially match the short-term revenue in some cases.";

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12">
          Why <span className="text-primary">short-term</span> let?
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <CardSpotlight className="backdrop-blur-xl">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4 text-white">
                Short term letting against 12 months tenancy contract
              </h3>
              
              <RentalComparisonChart />
              <ChartLegend items={legendItems} disclaimer={disclaimer} />
            </div>
          </CardSpotlight>

          <CardSpotlight>
            <ShortTermContent />
          </CardSpotlight>
        </div>
      </div>
    </section>
  );
};

export default WhyShortTerm;