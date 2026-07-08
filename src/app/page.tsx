import { HeroSection } from '@/components/sections/HeroSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ClassesSection } from '@/components/sections/ClassesSection';
import { IntroSection } from '@/components/sections/IntroSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <ExperienceSection />
      <ProjectsSection />
      <ClassesSection />
      <ContactSection />
    </>
  );
}
