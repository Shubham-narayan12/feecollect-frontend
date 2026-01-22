import SchoolNavbar from "../Components/SchoolUi/Homepage/SchoolNavbar";
import HomeHeroSlider from "../Components/SchoolUi/Homepage/HomeHeroSlider";
import WelcomeSection from "../Components/SchoolUi/Homepage/WelcomeSection";
import VisionMissionSection from "../Components/SchoolUi/Homepage/VisionMissionSection";
import SustainabilitySection from "../Components/SchoolUi/Homepage/SustainabilitySection";
import FacilitiesSection from "../Components/SchoolUi/Homepage/FacilitiesSection";

export default function SchoolHome() {
  return (
    <div className="min-h-screen bg-white">
      <SchoolNavbar />
      <HomeHeroSlider />
      <WelcomeSection />
      <VisionMissionSection />
      <SustainabilitySection />
      <FacilitiesSection />
    </div>
  );
}
