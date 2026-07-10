import { VoxelHero } from '@/components/VoxelHero';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ClassesSection } from '@/components/sections/ClassesSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <VoxelHero />
      <ProjectsSection />
      <ExperienceSection />
      <ClassesSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
