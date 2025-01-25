import { Building2, Clock, Trophy } from "lucide-react";
import { Particles } from "./ui/particles";
import { StandardCard } from "./ui/standard-card";

const services = [
  {
    Icon: Building2,
    name: "Premium Properties",
    description: "Exclusive properties in Downtown Dubai's most sought-after locations",
    isFeatured: true
  },
  {
    Icon: Clock,
    name: "Personal Service",
    description: "Dedicated support team available 24/7 for all your needs",
    isFeatured: false
  },
  {
    Icon: Trophy,
    name: "Expert Management",
    description: "Professional property management with proven results",
    isFeatured: true
  }
];

const Services = () => {
  return (
    <section className="relative py-12 md:py-24 bg-gradient-to-b from-white via-white to-gray-50/30">
      <Particles
        className="absolute inset-0 -z-10 opacity-30"
        quantity={20}
        staticity={90}
        color="#1EAEDB"
      />
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <StandardCard
              key={index}
              icon={service.Icon}
              title={service.name}
              description={service.description}
              action={{ label: "Learn more" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;