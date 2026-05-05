import HomeHeroSlider from "../Components/SchoolUi/Homepage/HomeHeroSlider";
import WelcomeSection from "../Components/SchoolUi/Homepage/WelcomeSection";
import VisionMissionSection from "../Components/SchoolUi/Homepage/VisionMissionSection";
import SustainabilitySection from "../Components/SchoolUi/Homepage/SustainabilitySection";
import FacilitiesSection from "../Components/SchoolUi/Homepage/FacilitiesSection";
import GallerySection from "../Components/SchoolUi/Homepage/GallerySection";
import SecureFutureSection from "../Components/SchoolUi/Homepage/SecureFutureSection";

export default function SchoolHome() {
  return (
    <div className="min-h-screen bg-white">
      <HomeHeroSlider />
      <WelcomeSection />
      <VisionMissionSection />
      <SustainabilitySection />
       <GallerySection />
      <FacilitiesSection />
     
      <SecureFutureSection />
    </div>
  );
}