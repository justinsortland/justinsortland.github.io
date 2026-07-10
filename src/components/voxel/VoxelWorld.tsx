'use client';

import { useRef, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import { VoxelAvatar } from './VoxelAvatar';
import { VoxelBuilding, type BuildingConfig } from './VoxelBuilding';
import { usePlayerControls } from './usePlayerControls';

// ─── World layout ─────────────────────────────────────────────────────────────
//
//          [ML Lab]                  z ≈ -26
//   [Counterparty]  [SPACtivity]    z ≈ -14
//       Tower         Gym
//              START                z = 0
//   [Experience]   [Classes]        z ≈ +8
//      Office       Library
//   [Skills]     [Contact]         z ≈ +22
//   Workshop      Portal
//

const BUILDINGS: BuildingConfig[] = [
  {
    id: 'counterparty-tower',
    label: 'Counterparty',
    sublabel: 'TOWER · PROJECTS',
    section: '#projects',
    position: [-16, 0, -14],
    width: 3.5,  depth: 3.5,  floorCount: 9,
    variant: 'tower',
    primaryColor: '#3a5878',   secondaryColor: '#2e4666',
    roofColor: '#00d4ff',
    emissive: '#001e2e',       emissiveIntensity: 0.15,
    proximityRadius: 7,
  },
  {
    id: 'spactivity-gym',
    label: 'SPACtivity',
    sublabel: 'GYM · PROJECTS',
    section: '#projects',
    position: [16, 0, -14],
    width: 8,    depth: 5,    floorCount: 3,
    variant: 'gym',
    primaryColor: '#5c3070',   secondaryColor: '#4a2460',
    roofColor: '#a855f7',
    emissive: '#12042a',       emissiveIntensity: 0.12,
    proximityRadius: 8,
  },
  {
    id: 'ml-lab',
    label: 'ML Lab',
    sublabel: 'RESEARCH · PROJECTS',
    section: '#projects',
    position: [0, 0, -26],
    width: 4.5,  depth: 4.5,  floorCount: 6,
    variant: 'lab',
    primaryColor: '#8a6818',   secondaryColor: '#7a5810',
    roofColor: '#f59e0b',
    emissive: '#1a0e00',       emissiveIntensity: 0.1,
    proximityRadius: 7,
  },
  {
    id: 'experience-office',
    label: 'Experience',
    sublabel: 'OFFICE',
    section: '#experience',
    position: [-20, 0, 8],
    width: 6,    depth: 4.5,  floorCount: 5,
    variant: 'office',
    primaryColor: '#1e4060',   secondaryColor: '#183452',
    roofColor: '#3b82f6',
    emissive: '#080f1e',       emissiveIntensity: 0.1,
    proximityRadius: 8,
  },
  {
    id: 'classes-library',
    label: 'Classes',
    sublabel: 'LIBRARY',
    section: '#classes',
    position: [20, 0, 8],
    width: 7,    depth: 5,    floorCount: 4,
    variant: 'library',
    primaryColor: '#3a2a60',   secondaryColor: '#2e2050',
    roofColor: '#7c3aed',
    emissive: '#0d0618',       emissiveIntensity: 0.1,
    proximityRadius: 8,
  },
  {
    id: 'skills-workshop',
    label: 'Skills',
    sublabel: 'WORKSHOP',
    section: '#skills',
    position: [-14, 0, 22],
    width: 5,    depth: 4,    floorCount: 3,
    variant: 'workshop',
    primaryColor: '#7a3c14',   secondaryColor: '#6a2c0c',
    roofColor: '#ea580c',
    emissive: '#140800',       emissiveIntensity: 0.08,
    proximityRadius: 7,
  },
  {
    id: 'contact-portal',
    label: 'Contact',
    sublabel: 'PORTAL',
    section: '#contact',
    position: [14, 0, 22],
    width: 3.5,  depth: 3.5,  floorCount: 4,
    variant: 'portal',
    primaryColor: '#186060',   secondaryColor: '#105050',
    roofColor: '#00e5ff',
    emissive: '#003050',       emissiveIntensity: 0.4,
    proximityRadius: 7,
  },
];

// Pre-compute center XZ for proximity checks (avoids per-frame allocation)
const BUILDING_XZ = BUILDINGS.map((b) => ({ x: b.position[0], z: b.position[2] }));

export type NearBuilding = BuildingConfig | null;

// ─── Voxel tree ───────────────────────────────────────────────────────────────

function VoxelTree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color="#6b4c2a" roughness={0.9} metalness={0} />
      </mesh>
      {/* Lower canopy */}
      <mesh position={[0, 2.0, 0]}>
        <boxGeometry args={[1.6, 1.2, 1.6]} />
        <meshStandardMaterial color="#4a7c3f" roughness={0.85} metalness={0} />
      </mesh>
      {/* Mid canopy */}
      <mesh position={[0, 2.9, 0]}>
        <boxGeometry args={[1.1, 1.0, 1.1]} />
        <meshStandardMaterial color="#5a9040" roughness={0.85} metalness={0} />
      </mesh>
      {/* Top canopy */}
      <mesh position={[0, 3.65, 0]}>
        <boxGeometry args={[0.7, 0.8, 0.7]} />
        <meshStandardMaterial color="#6aab48" roughness={0.85} metalness={0} />
      </mesh>
    </group>
  );
}

// ─── Rock cluster ─────────────────────────────────────────────────────────────

function Rock({ position, rotY = 0, scale = 1 }: {
  position: [number, number, number];
  rotY?: number;
  scale?: number;
}) {
  return (
    <mesh position={position} rotation={[0, rotY, 0]}>
      <boxGeometry args={[0.6 * scale, 0.35 * scale, 0.5 * scale]} />
      <meshStandardMaterial color="#a09888" roughness={1.0} metalness={0} />
    </mesh>
  );
}

// ─── Ground environment ───────────────────────────────────────────────────────

function Ground() {
  return (
    <>
      {/* Grass field */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#7a9c5e" roughness={1.0} metalness={0} />
      </mesh>

      {/* Central stone plaza */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#b8ae9e" roughness={0.9} metalness={0} />
      </mesh>

      {/* Stone paths — laid slightly above grass to prevent z-fighting */}
      {/* North axis (toward ML Lab / Counterparty / SPACtivity) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, -20]}>
        <planeGeometry args={[3, 20]} />
        <meshStandardMaterial color="#b0a898" roughness={0.9} metalness={0} />
      </mesh>
      {/* South axis (toward Skills / Contact) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 21]}>
        <planeGeometry args={[3, 22]} />
        <meshStandardMaterial color="#b0a898" roughness={0.9} metalness={0} />
      </mesh>
      {/* West spur (toward Experience) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-14, 0.001, 5]}>
        <planeGeometry args={[15, 3]} />
        <meshStandardMaterial color="#b0a898" roughness={0.9} metalness={0} />
      </mesh>
      {/* East spur (toward Classes) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[14, 0.001, 5]}>
        <planeGeometry args={[15, 3]} />
        <meshStandardMaterial color="#b0a898" roughness={0.9} metalness={0} />
      </mesh>

      {/* Trees — flanking paths and plazas */}
      <VoxelTree position={[-8,  0, -8]}  />
      <VoxelTree position={[ 8,  0, -8]}  />
      <VoxelTree position={[-10, 0,  4]}  />
      <VoxelTree position={[ 10, 0,  4]}  />
      <VoxelTree position={[-6,  0, 17]}  />
      <VoxelTree position={[ 6,  0, 17]}  />
      <VoxelTree position={[ 0,  0, -19]} />
      <VoxelTree position={[-24, 0, -3]}  />
      <VoxelTree position={[ 24, 0, -3]}  />

      {/* Rocks */}
      <Rock position={[-11, 0.1, -11]} rotY={0.4}  scale={1.2} />
      <Rock position={[ 12, 0.1, -10]} rotY={1.1}  scale={0.9} />
      <Rock position={[-19, 0.1,  18]} rotY={0.7}  scale={1.0} />
      <Rock position={[ 19, 0.1,  18]} rotY={2.1}  scale={1.1} />
    </>
  );
}

// ─── Inner scene (rendered inside the R3F Canvas) ─────────────────────────────

interface SceneContentProps {
  onNearBuilding: (b: NearBuilding) => void;
  onBuildingClick?: (b: BuildingConfig) => void;
}

function SceneContent({ onNearBuilding, onBuildingClick }: SceneContentProps) {
  const playerPos   = useRef(new Vector3(0, 0, 0));
  const playerRotY  = useRef(Math.PI);
  const isMovingRef = useRef(false);
  const avatarGroup = useRef<Group>(null);
  const currentNearId = useRef<string | null>(null);
  const camTarget = useRef(new Vector3(0, 10, 14));

  const keys    = usePlayerControls();
  const { camera } = useThree();

  useFrame((_, delta) => {
    // ── Movement ──────────────────────────────────────────────────────────────
    const SPEED = 8;
    const k = keys.current;
    let dx = 0;
    let dz = 0;

    if (k.w || k.ArrowUp)    dz -= 1;
    if (k.s || k.ArrowDown)  dz += 1;
    if (k.a || k.ArrowLeft)  dx -= 1;
    if (k.d || k.ArrowRight) dx += 1;

    const moving = dx !== 0 || dz !== 0;
    isMovingRef.current = moving;

    if (moving) {
      const len = Math.sqrt(dx * dx + dz * dz);
      dx /= len;
      dz /= len;

      playerPos.current.x = Math.max(-42, Math.min(42,
        playerPos.current.x + dx * SPEED * delta));
      playerPos.current.z = Math.max(-42, Math.min(42,
        playerPos.current.z + dz * SPEED * delta));

      playerRotY.current = Math.atan2(dx, dz);
    }

    // ── Avatar transform ─────────────────────────────────────────────────────
    if (avatarGroup.current) {
      avatarGroup.current.position.copy(playerPos.current);
      avatarGroup.current.rotation.y = playerRotY.current;
    }

    // ── Camera follow (3rd-person, slightly above-and-behind) ────────────────
    camTarget.current.set(
      playerPos.current.x,
      playerPos.current.y + 10,
      playerPos.current.z + 14,
    );
    camera.position.x += (camTarget.current.x - camera.position.x) * 0.08;
    camera.position.y += (camTarget.current.y - camera.position.y) * 0.08;
    camera.position.z += (camTarget.current.z - camera.position.z) * 0.08;
    camera.lookAt(playerPos.current.x, playerPos.current.y + 1.5, playerPos.current.z);

    // ── Proximity detection ───────────────────────────────────────────────────
    let nearestBuilding: NearBuilding = null;
    let minDist = Infinity;
    const px = playerPos.current.x;
    const pz = playerPos.current.z;

    for (let i = 0; i < BUILDINGS.length; i++) {
      const bx = BUILDING_XZ[i].x;
      const bz = BUILDING_XZ[i].z;
      const d = Math.sqrt((px - bx) ** 2 + (pz - bz) ** 2);
      if (d < BUILDINGS[i].proximityRadius && d < minDist) {
        minDist = d;
        nearestBuilding = BUILDINGS[i];
      }
    }

    const nearId = nearestBuilding?.id ?? null;
    if (nearId !== currentNearId.current) {
      currentNearId.current = nearId;
      onNearBuilding(nearestBuilding);
    }
  });

  return (
    <>
      {/* Sky + fog */}
      <color attach="background" args={['#b8d4ec']} />
      <fog attach="fog" args={['#c0d8f0', 55, 105]} />

      {/* Lighting — daylight hemisphere + warm sun + cool fill */}
      <hemisphereLight args={['#87ceeb', '#8b9e6e', 0.8]} />
      <ambientLight intensity={0.3} color="#fff4e0" />
      {/* Main sun — warm golden from upper-right-front */}
      <directionalLight
        position={[25, 35, 15]}
        intensity={1.5}
        color="#ffe8b0"
        castShadow
      />
      {/* Cool fill from upper-left-back */}
      <directionalLight position={[-10, 15, -20]} intensity={0.35} color="#b0d0ff" />

      <Ground />

      {/* Buildings */}
      {BUILDINGS.map((b) => (
        <group key={b.id} position={b.position}>
          <VoxelBuilding
            {...b}
            onBuildingClick={onBuildingClick ? () => onBuildingClick(b) : undefined}
          />
        </group>
      ))}

      {/* Player avatar */}
      <group ref={avatarGroup}>
        <VoxelAvatar isMovingRef={isMovingRef} />
      </group>
    </>
  );
}

// ─── Public export (includes Canvas + 2-D overlays) ──────────────────────────

interface VoxelWorldProps {
  onNearBuilding?: (b: NearBuilding) => void;
  onBuildingClick?: (b: BuildingConfig) => void;
}

export default function VoxelWorld({ onNearBuilding, onBuildingClick }: VoxelWorldProps) {
  const handleNear = useCallback(
    (b: NearBuilding) => onNearBuilding?.(b),
    [onNearBuilding],
  );

  const handleClick = useCallback(
    (b: BuildingConfig) => onBuildingClick?.(b),
    [onBuildingClick],
  );

  return (
    <Canvas
      camera={{ position: [0, 10, 14], fov: 60, near: 0.1, far: 120 }}
      gl={{ antialias: true }}
      dpr={[1, 1.5]}
      style={{ display: 'block', width: '100%', height: '100%' }}
    >
      <SceneContent onNearBuilding={handleNear} onBuildingClick={handleClick} />
    </Canvas>
  );
}

// Re-export BUILDINGS so VoxelHero can use building metadata without importing
// the full Three.js module on the server side.
export { BUILDINGS };
