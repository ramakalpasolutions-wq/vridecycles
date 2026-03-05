import Hero from './components/Hero';
import FeaturedCycles from './components/FeaturedCycles';
import StatsCounter from './components/StatsCounter';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import LocationMap from './components/LocationMap';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCycles />
      <StatsCounter />
      <WhyChooseUs />
      <Testimonials />
      <LocationMap />
    </>
  );
}