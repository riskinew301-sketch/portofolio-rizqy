import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { MilestonesSection } from "@/components/sections/MilestonesSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      <HeroSection />
      <AboutSection />
      <MilestonesSection />
      <FeaturedProjectsSection />
    </div>
  );
}
