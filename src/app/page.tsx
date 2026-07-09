import { VoxelHero } from '@/components/VoxelHero';
import { IntroSection } from '@/components/sections/IntroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ClassesSection } from '@/components/sections/ClassesSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      {/* ── Phase 2 verification banner ─────────────────────────────────────
          Remove this once the 3-D world is confirmed rendering correctly.     */}
      <div
        style={{
          background: 'rgba(0, 212, 255, 0.08)',
          borderBottom: '1px solid rgba(0, 212, 255, 0.25)',
          padding: '10px 24px',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            color: '#00d4ff',
            fontFamily: 'monospace',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          ⬛ Interactive Portfolio World — scroll the canvas below or use WASD to move
        </span>
      </div>

      {/* ── Voxel world hero (full-viewport, client-only Three.js scene) ── */}
      <VoxelHero />

      <IntroSection />
      <ProjectsSection />
      <ExperienceSection />
      <ClassesSection />
      <ContactSection />
    </>
  );
}
