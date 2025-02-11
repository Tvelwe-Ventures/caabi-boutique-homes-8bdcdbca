
interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard = ({ title, description }: FeatureCardProps) => (
  <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
    <div className="text-primary text-lg font-semibold mb-2">{title}</div>
    <p className="text-gray-600">{description}</p>
  </div>
);

export const Features = () => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-primary-light/20 via-white to-secondary-light/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <FeatureCard
              title="Instant Booking"
              description="Secure your stay immediately with our real-time booking system"
            />
            <FeatureCard
              title="Best Price Guarantee"
              description="Get the best rates directly through our platform"
            />
            <FeatureCard
              title="24/7 Support"
              description="Our dedicated team is here to assist you around the clock"
            />
          </div>

          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Book With Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-8">
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-primary mb-4">Premium Locations</h3>
                <p className="text-gray-600">
                  All our properties are handpicked in Dubai's most desirable neighborhoods,
                  ensuring you get the best experience during your stay.
                </p>
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-primary mb-4">Luxury Amenities</h3>
                <p className="text-gray-600">
                  From high-end furnishings to premium services, every property is equipped
                  to provide a five-star experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
