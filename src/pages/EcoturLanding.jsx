import TourismCarousel from '../pages/TourismCarousel'
import AboutSection from '../components/landing/AboutSection'
import FeaturedTours from '../components/landing/FeaturedTours'
import TestimonialsSection from '../components/landing/TestimonialsSection'
import WhyChooseUsSection from '../components/landing/WhyChooseUsSection'
import Footer from '../components/landing/Footer'

const EcoturLanding = () => {
  return (
    <div className="min-h-screen">
      <TourismCarousel />
      <AboutSection />
      <FeaturedTours />
      <TestimonialsSection />
      <WhyChooseUsSection />
      <Footer />
    </div>
  );
};

export default EcoturLanding;