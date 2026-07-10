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
  /** Building archetype — drives setbacks and spires */
  variant?: string;
  primaryColor: string;
  secondaryColor: string;
  roofColor: string;
  emissive?: string;
  emissiveIntensity?: number;
  proximityRadius: number;
}

/**
 * A voxel-style building with PBR materials, a stone pedestal, and optional
 * tower setback + spire for the 'tower' variant.
 */
interface VoxelBuildingProps extends BuildingConfig {
  onBuildingClick?: () => void;
}

export function VoxelBuilding({
  label,
  sublabel,
  width,
  depth,
  floorCount,
  variant,
  primaryColor,
  secondaryColor,
  roofColor,
  emissive = '#000000',
  emissiveIntensity = 0.1,
  onBuildingClick,
}: VoxelBuildingProps) {
  const isTower = variant === 'tower';
  const setbackFloor = Math.floor(floorCount * 0.65);
  const floors = Array.from({ length: floorCount }, (_, i) => i);

  // Tower label sits above the spire; all others just above the roof
  const labelY = isTower ? floorCount + 6.2 : floorCount + 1.6;

  // Roof dimensions match the top floor width/depth
  const roofW = (isTower ? width * 0.7 : width) + 0.4;
  const roofD = (isTower ? depth * 0.7 : depth) + 0.4;

  return (
    <group>
      {/* Stone base pedestal */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[width + 1.0, 0.16, depth + 1.0]} />
        <meshStandardMaterial color="#b0a898" roughness={0.9} metalness={0} />
      </mesh>

      {/* Stacked floor slabs */}
      {floors.map((i) => {
        const isUpper = isTower && i >= setbackFloor;
        const fw = isUpper ? width * 0.7 : width;
        const fd = isUpper ? depth * 0.7 : depth;
        return (
          <mesh key={i} position={[0, i + 0.46, 0]}>
            <boxGeometry args={[fw, 0.9, fd]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? primaryColor : secondaryColor}
              emissive={emissive}
              emissiveIntensity={emissiveIntensity}
              roughness={0.65}
              metalness={0.15}
            />
          </mesh>
        );
      })}

      {/* Roof slab — slightly wider than top floor */}
      <mesh position={[0, floorCount + 0.05, 0]}>
        <boxGeometry args={[roofW, 0.1, roofD]} />
        <meshStandardMaterial
          color={roofColor}
          emissive={roofColor}
          emissiveIntensity={0.25}
          roughness={0.5}
          metalness={0.2}
        />
      </mesh>

      {/* Rooftop block (antenna base / HVAC) */}
      <mesh position={[0, floorCount + 0.22, 0]}>
        <boxGeometry args={[0.6, 0.24, 0.6]} />
        <meshStandardMaterial
          color={roofColor}
          emissive={roofColor}
          emissiveIntensity={0.45}
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* Tower-only: spire shaft + tip */}
      {isTower && (
        <>
          <mesh position={[0, floorCount + 2.4, 0]}>
            <boxGeometry args={[0.18, 4.0, 0.18]} />
            <meshStandardMaterial
              color={roofColor}
              emissive={roofColor}
              emissiveIntensity={0.65}
              roughness={0.35}
              metalness={0.3}
            />
          </mesh>
          <mesh position={[0, floorCount + 4.7, 0]}>
            <boxGeometry args={[0.1, 0.6, 0.1]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive={roofColor}
              emissiveIntensity={1.0}
              roughness={0.2}
              metalness={0.5}
            />
          </mesh>
        </>
      )}

      {/* Billboard label — HTML overlay, always faces camera */}
      <Html
        position={[0, labelY, 0]}
        center
        distanceFactor={12}
        style={{ pointerEvents: onBuildingClick ? 'auto' : 'none', userSelect: 'none' }}
      >
        <div
          onClick={onBuildingClick}
          style={{
            background: 'rgba(8, 12, 22, 0.88)',
            border: '1px solid rgba(0, 212, 255, 0.35)',
            borderRadius: '5px',
            padding: '3px 10px 4px',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            cursor: onBuildingClick ? 'pointer' : 'default',
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
