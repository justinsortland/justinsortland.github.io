'use client';

import { useRef, useState, useCallback } from 'react';
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
    primaryColor: '#0a1628',   secondaryColor: '#0d1e35',
    roofColor: '#00d4ff',
    emissive: '#001e2e',       emissiveIntensity: 0.2,
    proximityRadius: 7,
  },
  {
    id: 'spactivity-gym',
    label: 'SPACtivity',
    sublabel: 'GYM · PROJECTS',
    section: '#projects',
    position: [16, 0, -14],
    width: 8,    depth: 5,    floorCount: 3,
    primaryColor: '#18082a',   secondaryColor: '#1d0c32',
    roofColor: '#a855f7',
    emissive: '#12042a',       emissiveIntensity: 0.2,
    proximityRadius: 8,
  },
  {
    id: 'ml-lab',
    label: 'ML Lab',
    sublabel: 'RESEARCH · PROJECTS',
    section: '#projects',
    position: [0, 0, -26],
    width: 4.5,  depth: 4.5,  floorCount: 6,
    primaryColor: '#18100a',   secondaryColor: '#1e140a',
    roofColor: '#f59e0b',
    emissive: '#1a0e00',       emissiveIntensity: 0.15,
    proximityRadius: 7,
  },
  {
    id: 'experience-office',
    label: 'Experience',
    sublabel: 'OFFICE',
    section: '#experience',
    position: [-20, 0, 8],
    width: 6,    depth: 4.5,  floorCount: 5,
    primaryColor: '#0d1830',   secondaryColor: '#101d38',
    roofColor: '#3b82f6',
    emissive: '#080f1e',       emissiveIntensity: 0.15,
    proximityRadius: 8,
  },
  {
    id: 'classes-library',
    label: 'Classes',
    sublabel: 'LIBRARY',
    section: '#classes',
    position: [20, 0, 8],
    width: 7,    depth: 5,    floorCount: 4,
    primaryColor: '#120a22',   secondaryColor: '#17102c',
    roofColor: '#7c3aed',
    emissive: '#0d0618',       emissiveIntensity: 0.15,
    proximityRadius: 8,
  },
  {
    id: 'skills-workshop',
    label: 'Skills',
    sublabel: 'WORKSHOP',
    section: '#skills',
    position: [-14, 0, 22],
    width: 5,    depth: 4,    floorCount: 3,
    primaryColor: '#1a0c00',   secondaryColor: '#221000',
    roofColor: '#ea580c',
    emissive: '#140800',       emissiveIntensity: 0.12,
    proximityRadius: 7,
  },
  {
    id: 'contact-portal',
    label: 'Contact',
    sublabel: 'PORTAL',
    section: '#contact',
    position: [14, 0, 22],
    width: 3.5,  depth: 3.5,  floorCount: 4,
    primaryColor: '#00151f',   secondaryColor: '#001a28',
    roofColor: '#00e5ff',
    emissive: '#003050',       emissiveIntensity: 0.55,
    proximityRadius: 7,
  },
];

// Pre-compute center XZ for proximity checks (avoids per-frame allocation)
const BUILDING_XZ = BUILDINGS.map((b) => ({ x: b.position[0], z: b.position[2] }));

export type NearBuilding = BuildingConfig | null;

// ─── Inner scene (rendered inside the R3F Canvas) ─────────────────────────────

function Ground() {
  return (
    <>
      {/* Base ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshLambertMaterial color="#0c0c14" />
      </mesh>
      {/* Voxel grid — subtle, not a dominant feature */}
      <gridHelper args={[120, 60, '#1a1a28', '#14141e']} />
    </>
  );
}

interface SceneContentProps {
  onNearBuilding: (b: NearBuilding) => void;
  onBuildingClick?: (b: BuildingConfig) => void;
}

function SceneContent({ onNearBuilding, onBuildingClick }: SceneContentProps) {
  // Player position and facing direction — refs to avoid re-renders in frame loop
  const playerPos   = useRef(new Vector3(0, 0, 0));
  const playerRotY  = useRef(Math.PI); // start facing north (-Z)
  const isMovingRef = useRef(false);
  const avatarGroup = useRef<Group>(null);

  // Track current near building id so we only call setState on change
  const currentNearId = useRef<string | null>(null);

  // Temporary vector reused every frame (avoids per-frame GC)
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
      // Normalize diagonal so speed is equal in all directions
      const len = Math.sqrt(dx * dx + dz * dz);
      dx /= len;
      dz /= len;

      playerPos.current.x = Math.max(-42, Math.min(42,
        playerPos.current.x + dx * SPEED * delta));
      playerPos.current.z = Math.max(-42, Math.min(42,
        playerPos.current.z + dz * SPEED * delta));

      // Avatar faces the direction of movement
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
    // Smooth lerp toward target
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

    // Only trigger React state update when the nearest building actually changes
    const nearId = nearestBuilding?.id ?? null;
    if (nearId !== currentNearId.current) {
      currentNearId.current = nearId;
      onNearBuilding(nearestBuilding);
    }
  });

  return (
    <>
      {/* Scene globals */}
      <color attach="background" args={['#0a0a0f']} />
      <fog attach="fog" args={['#0a0a0f', 30, 72]} />

      {/* Lighting */}
      <ambientLight intensity={0.55} color="#1a1a3a" />
      <directionalLight position={[10, 22, 10]} intensity={1.1} color="#e8eeff" />
      {/* Subtle cyan fill from below for voxel-world atmosphere */}
      <pointLight position={[0, 4, 0]} intensity={0.4} color="#00d4ff" distance={30} />

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

      {/* Player avatar — position/rotation driven by useFrame above */}
      <group ref={avatarGroup}>
        <VoxelAvatar isMovingRef={isMovingRef} />
      </group>
    </>
  );
}

// ─── Public export (includes Canvas + 2-D overlays) ──────────────────────────

interface VoxelWorldProps {
  /** Called whenever the nearest building changes (or becomes null) */
  onNearBuilding?: (b: NearBuilding) => void;
  /** Called when the user clicks a building label */
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
      camera={{ position: [0, 10, 14], fov: 60, near: 0.1, far: 110 }}
      gl={{ antialias: false }}
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
