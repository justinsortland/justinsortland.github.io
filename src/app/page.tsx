import { VoxelHero } from '@/components/VoxelHero';
import { IntroSection } from '@/components/sections/IntroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ClassesSection } from '@/components/sections/ClassesSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <VoxelHero />
      <IntroSection />
      <ProjectsSection />
      <ExperienceSection />
      <ClassesSection />
      {/* Skills anchor — section component added in Phase 4 */}
      <div id="skills" />
      <ContactSection />
    </>
  );
}
