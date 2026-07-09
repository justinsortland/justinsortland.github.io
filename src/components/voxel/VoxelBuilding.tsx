'use client';

// R3F JSX types (mesh, group, boxGeometry, etc.) come from src/types/r3f.d.ts
import { Html } from '@react-three/drei';

export interface BuildingConfig {
  id: string;
  /** Short name shown above the building */
  label: string;
  /** Smaller subtitle, e.g. "TOWER · PROJECT" */
  sublabel?: string;
  /** Anchor for page scroll, e.g. "#projects" */
  section: string;
  position: [number, number, number];
  width: number;
  depth: number;
  /** Number of 1-unit-tall block layers */
  floorCount: number;
  primaryColor: string;
  secondaryColor: string;
  roofColor: string;
  emissive?: string;
  emissiveIntensity?: number;
  proximityRadius: number;
}

/**
 * A voxel-style building made of stacked BoxGeometry blocks.
 * Each even/odd floor alternates between primaryColor and secondaryColor
 * to give a layered, blocky look. An Html label floats above the roof.
 */
export function VoxelBuilding({
  label,
  sublabel,
  width,
  depth,
  floorCount,
  primaryColor,
  secondaryColor,
  roofColor,
  emissive = '#000000',
  emissiveIntensity = 0.1,
}: BuildingConfig) {
  const floors = Array.from({ length: floorCount }, (_, i) => i);

  return (
    <group>
      {/* Stacked floor slabs */}
      {floors.map((i) => (
        <mesh key={i} position={[0, i + 0.46, 0]}>
          <boxGeometry args={[width, 0.9, depth]} />
          <meshLambertMaterial
            color={i % 2 === 0 ? primaryColor : secondaryColor}
            emissive={emissive}
            emissiveIntensity={emissiveIntensity}
          />
        </mesh>
      ))}

      {/* Roof slab — slightly wider than the building */}
      <mesh position={[0, floorCount + 0.05, 0]}>
        <boxGeometry args={[width + 0.4, 0.1, depth + 0.4]} />
        <meshLambertMaterial color={roofColor} emissive={roofColor} emissiveIntensity={0.3} />
      </mesh>

      {/* Rooftop block (antenna base / utility block) */}
      <mesh position={[0, floorCount + 0.22, 0]}>
        <boxGeometry args={[0.6, 0.24, 0.6]} />
        <meshLambertMaterial color={roofColor} emissive={roofColor} emissiveIntensity={0.5} />
      </mesh>

      {/* Billboard label — HTML overlay, always faces camera */}
      <Html
        position={[0, floorCount + 1.6, 0]}
        center
        distanceFactor={12}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        <div
          style={{
            background: 'rgba(10, 10, 15, 0.88)',
            border: '1px solid rgba(0, 212, 255, 0.35)',
            borderRadius: '5px',
            padding: '3px 10px 4px',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}
        >
          <div
            style={{
              color: '#00d4ff',
              fontFamily: 'ui-monospace, monospace',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.08em',
            }}
          >
            {label}
          </div>
          {sublabel && (
            <div
              style={{
                color: '#525268',
                fontFamily: 'ui-monospace, monospace',
                fontSize: '8px',
                letterSpacing: '0.12em',
                marginTop: '1px',
              }}
            >
              {sublabel}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}
