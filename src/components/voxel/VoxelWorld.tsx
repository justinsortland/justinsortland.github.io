'use client';

import { useRef, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import { VoxelAvatar } from './VoxelAvatar';
import { VoxelBuilding, type BuildingConfig } from './VoxelBuilding';
import { usePlayerControls } from './usePlayerControls';

// ─── Campus layout ────────────────────────────────────────────────────────────
//
//   ╔═══════════════════════════════════════╗
//   ║        [ML Lab]                       ║  z=-26
//   ║  [Tower]       [Gym]                  ║  z=-14
//   ║         [QUAD/FOUNTAIN]               ║  z=0
//   ║  [Office]       [Library]             ║  z=8
//   ║  [Workshop]     [Portal]              ║  z=22
//   ╚═══════════════════════════════════════╝

const BUILDINGS: BuildingConfig[] = [
  {
    id: 'counterparty-tower',
    label: 'Counterparty',
    sublabel: 'RESEARCH TOWER',
    section: '#projects',
    position: [-16, 0, -14],
    width: 3.5, depth: 3.5, floorCount: 9,
    variant: 'tower',
    primaryColor: '#3a5878', secondaryColor: '#2e4666',
    roofColor: '#00d4ff',
    emissive: '#001e2e', emissiveIntensity: 0.15,
    proximityRadius: 7,
  },
  {
    id: 'spactivity-gym',
    label: 'SPACtivity',
    sublabel: 'APPLIED COMPUTING LAB',
    section: '#projects',
    position: [16, 0, -14],
    width: 8, depth: 5, floorCount: 3,
    variant: 'gym',
    primaryColor: '#5c3070', secondaryColor: '#4a2460',
    roofColor: '#a855f7',
    emissive: '#12042a', emissiveIntensity: 0.12,
    proximityRadius: 8,
  },
  {
    id: 'ml-lab',
    label: 'ML Lab',
    sublabel: 'COMPUTATION CENTER',
    section: '#projects',
    position: [0, 0, -26],
    width: 4.5, depth: 4.5, floorCount: 6,
    variant: 'lab',
    primaryColor: '#8a6818', secondaryColor: '#7a5810',
    roofColor: '#f59e0b',
    emissive: '#1a0e00', emissiveIntensity: 0.1,
    proximityRadius: 7,
  },
  {
    id: 'experience-office',
    label: 'Experience',
    sublabel: 'ENGINEERING WING',
    section: '#experience',
    position: [-20, 0, 8],
    width: 6, depth: 4.5, floorCount: 5,
    variant: 'office',
    primaryColor: '#1e4060', secondaryColor: '#183452',
    roofColor: '#3b82f6',
    emissive: '#080f1e', emissiveIntensity: 0.1,
    proximityRadius: 8,
  },
  {
    id: 'classes-library',
    label: 'Classes',
    sublabel: 'ACADEMIC LIBRARY',
    section: '#classes',
    position: [20, 0, 8],
    width: 7, depth: 5, floorCount: 4,
    variant: 'library',
    primaryColor: '#3a2a60', secondaryColor: '#2e2050',
    roofColor: '#7c3aed',
    emissive: '#0d0618', emissiveIntensity: 0.1,
    proximityRadius: 8,
  },
  {
    id: 'skills-workshop',
    label: 'Skills',
    sublabel: 'MAKER SPACE',
    section: '#skills',
    position: [-14, 0, 22],
    width: 5, depth: 4, floorCount: 3,
    variant: 'workshop',
    primaryColor: '#7a3c14', secondaryColor: '#6a2c0c',
    roofColor: '#ea580c',
    emissive: '#140800', emissiveIntensity: 0.08,
    proximityRadius: 7,
  },
  {
    id: 'contact-portal',
    label: 'Contact',
    sublabel: 'ATRIUM',
    section: '#contact',
    position: [14, 0, 22],
    width: 3.5, depth: 3.5, floorCount: 4,
    variant: 'portal',
    primaryColor: '#186060', secondaryColor: '#105050',
    roofColor: '#00e5ff',
    emissive: '#003050', emissiveIntensity: 0.4,
    proximityRadius: 7,
  },
];

const BUILDING_XZ = BUILDINGS.map((b) => ({ x: b.position[0], z: b.position[2] }));

export type NearBuilding = BuildingConfig | null;

// ─── World bounds & AABB collision ────────────────────────────────────────────

const WORLD_BOUNDS = { minX: -28, maxX: 28, minZ: -32, maxZ: 28 };
const PLAYER_RADIUS = 0.9;

interface Collider { cx: number; cz: number; hw: number; hd: number }

const BUILDING_COLLIDERS: Collider[] = BUILDINGS.map((b) => ({
  cx: b.position[0],
  cz: b.position[2],
  hw: b.width  / 2 + PLAYER_RADIUS,
  hd: b.depth  / 2 + PLAYER_RADIUS,
}));

const PROP_COLLIDERS: Collider[] = [
  // Fountain (2.2×2.2 basin + player radius)
  { cx:  0,    cz:  0,    hw: 2.0,  hd: 2.0  },
  // Planters at quad corners
  { cx: -5.5,  cz: -5.5,  hw: 1.65, hd: 1.4  },
  { cx:  5.5,  cz: -5.5,  hw: 1.65, hd: 1.4  },
  { cx: -5.5,  cz:  5.5,  hw: 1.65, hd: 1.4  },
  { cx:  5.5,  cz:  5.5,  hw: 1.65, hd: 1.4  },
  // Trees (trunk ~0.15 radius + player radius ≈ 1.05)
  { cx: -8,    cz: -8,    hw: 1.05, hd: 1.05 },
  { cx:  8,    cz: -8,    hw: 1.05, hd: 1.05 },
  { cx: -8,    cz:  11,   hw: 1.05, hd: 1.05 }, // moved off z=8 path
  { cx:  8,    cz:  11,   hw: 1.05, hd: 1.05 }, // moved off z=8 path
  { cx: -3.5,  cz: -18,   hw: 1.05, hd: 1.05 },
  { cx:  3.5,  cz: -18,   hw: 1.05, hd: 1.05 },
  { cx: -3.5,  cz:  17,   hw: 1.05, hd: 1.05 },
  { cx:  3.5,  cz:  17,   hw: 1.05, hd: 1.05 },
  { cx: -24,   cz: -4,    hw: 1.05, hd: 1.05 },
  { cx:  24,   cz: -4,    hw: 1.05, hd: 1.05 },
  { cx: -22,   cz:  20,   hw: 1.05, hd: 1.05 },
  { cx:  20,   cz:  20,   hw: 1.05, hd: 1.05 },
  // Benches (seat 1.6 long × 0.44 deep; rotated benches have long axis along Z)
  { cx: -3.5,  cz:  0,    hw: 1.12, hd: 1.7  }, // bench rotY=PI/2
  { cx:  3.5,  cz:  0,    hw: 1.12, hd: 1.7  }, // bench rotY=-PI/2
  { cx:  0,    cz: -3.5,  hw: 1.7,  hd: 1.12 }, // bench rotY=0
  // Lamp posts (0.12×0.12 pole + player radius)
  { cx: -2.5,  cz: -11,   hw: 0.96, hd: 0.96 },
  { cx:  2.5,  cz: -11,   hw: 0.96, hd: 0.96 },
  { cx: -2.5,  cz: -19,   hw: 0.96, hd: 0.96 },
  { cx:  2.5,  cz: -19,   hw: 0.96, hd: 0.96 },
  { cx: -2.5,  cz:  15,   hw: 0.96, hd: 0.96 },
  { cx:  2.5,  cz:  15,   hw: 0.96, hd: 0.96 },
  { cx: -9,    cz:  10.5, hw: 0.96, hd: 0.96 },
  { cx:  9,    cz:  10.5, hw: 0.96, hd: 0.96 },
  { cx: -16,   cz:  10.5, hw: 0.96, hd: 0.96 },
  { cx:  16,   cz:  10.5, hw: 0.96, hd: 0.96 },
  // Info kiosk pole + screen (0.14×0.14 pole, 0.7 wide screen)
  { cx:  5.5,  cz:  5,    hw: 0.97, hd: 0.97 },
];

const ALL_COLLIDERS: Collider[] = [...BUILDING_COLLIDERS, ...PROP_COLLIDERS];

function isColliding(px: number, pz: number): boolean {
  for (const c of ALL_COLLIDERS) {
    if (px > c.cx - c.hw && px < c.cx + c.hw &&
        pz > c.cz - c.hd && pz < c.cz + c.hd) return true;
  }
  return false;
}

// ─── Basic campus prop components ─────────────────────────────────────────────

function VoxelTree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color="#6b4c2a" roughness={0.9} metalness={0} />
      </mesh>
      <mesh position={[0, 2.0, 0]}>
        <boxGeometry args={[1.6, 1.2, 1.6]} />
        <meshStandardMaterial color="#4a7c3f" roughness={0.85} metalness={0} />
      </mesh>
      <mesh position={[0, 2.9, 0]}>
        <boxGeometry args={[1.1, 1.0, 1.1]} />
        <meshStandardMaterial color="#5a9040" roughness={0.85} metalness={0} />
      </mesh>
      <mesh position={[0, 3.65, 0]}>
        <boxGeometry args={[0.7, 0.8, 0.7]} />
        <meshStandardMaterial color="#6aab48" roughness={0.85} metalness={0} />
      </mesh>
    </group>
  );
}

function Rock({ position, rotY = 0, scale = 1 }: {
  position: [number, number, number]; rotY?: number; scale?: number;
}) {
  return (
    <mesh position={position} rotation={[0, rotY, 0]}>
      <boxGeometry args={[0.6 * scale, 0.35 * scale, 0.5 * scale]} />
      <meshStandardMaterial color="#a09888" roughness={1.0} metalness={0} />
    </mesh>
  );
}

function LampPost({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 2.0, 0]}>
        <boxGeometry args={[0.12, 4.0, 0.12]} />
        <meshStandardMaterial color="#505868" roughness={0.6} metalness={0.5} />
      </mesh>
      <mesh position={[0, 4.15, 0]}>
        <boxGeometry args={[0.44, 0.16, 0.44]} />
        <meshStandardMaterial color="#606870" roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh position={[0, 4.07, 0]}>
        <boxGeometry args={[0.28, 0.06, 0.28]} />
        <meshStandardMaterial color="#ffe8a8" emissive="#ffe8a8" emissiveIntensity={0.9} roughness={0.3} metalness={0} />
      </mesh>
    </group>
  );
}

function Planter({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.28, 0]}>
        <boxGeometry args={[1.5, 0.56, 1.0]} />
        <meshStandardMaterial color="#8c8070" roughness={0.9} metalness={0} />
      </mesh>
      <mesh position={[0, 0.63, 0]}>
        <boxGeometry args={[1.3, 0.18, 0.82]} />
        <meshStandardMaterial color="#548840" roughness={0.9} metalness={0} />
      </mesh>
    </group>
  );
}

function Bench({ position, rotY = 0 }: { position: [number, number, number]; rotY?: number }) {
  return (
    <group position={position} rotation={[0, rotY, 0]}>
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[1.6, 0.07, 0.44]} />
        <meshStandardMaterial color="#7a6040" roughness={0.9} metalness={0} />
      </mesh>
      <mesh position={[0, 0.76, -0.17]}>
        <boxGeometry args={[1.6, 0.48, 0.07]} />
        <meshStandardMaterial color="#7a6040" roughness={0.9} metalness={0} />
      </mesh>
      <mesh position={[-0.6, 0.2, 0]}>
        <boxGeometry args={[0.07, 0.42, 0.38]} />
        <meshStandardMaterial color="#484858" roughness={0.7} metalness={0.4} />
      </mesh>
      <mesh position={[0.6, 0.2, 0]}>
        <boxGeometry args={[0.07, 0.42, 0.38]} />
        <meshStandardMaterial color="#484858" roughness={0.7} metalness={0.4} />
      </mesh>
    </group>
  );
}

function InfoKiosk({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[0.14, 1.4, 0.14]} />
        <meshStandardMaterial color="#5a5060" roughness={0.7} metalness={0.3} />
      </mesh>
      <mesh position={[0, 1.55, 0.1]}>
        <boxGeometry args={[0.7, 0.5, 0.06]} />
        <meshStandardMaterial color="#1a2840" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[0, 1.55, 0.14]}>
        <boxGeometry args={[0.58, 0.4, 0.01]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.5} roughness={0.3} metalness={0} />
      </mesh>
    </group>
  );
}

// ─── Per-building thematic detail components ──────────────────────────────────
// All positions are relative to the building's group (building center).

function CounterpartyDetail() {
  // Flagship civic-tech / permit-review tower
  // Details on south face (z+), which faces the approach path
  const fz = 1.75 + 0.08;
  return (
    <group>
      {/* Wide approach steps */}
      <mesh position={[0, 0.1, fz + 0.55]}>
        <boxGeometry args={[5.0, 0.2, 1.0]} />
        <meshStandardMaterial color="#a8a090" roughness={0.9} metalness={0} />
      </mesh>
      <mesh position={[0, 0.22, fz + 0.1]}>
        <boxGeometry args={[4.4, 0.44, 0.35]} />
        <meshStandardMaterial color="#b0a898" roughness={0.9} metalness={0} />
      </mesh>
      {/* Entrance columns */}
      <mesh position={[-1.1, 1.3, fz]}>
        <boxGeometry args={[0.26, 2.6, 0.26]} />
        <meshStandardMaterial color="#d0c8b8" roughness={0.8} metalness={0.05} />
      </mesh>
      <mesh position={[ 1.1, 1.3, fz]}>
        <boxGeometry args={[0.26, 2.6, 0.26]} />
        <meshStandardMaterial color="#d0c8b8" roughness={0.8} metalness={0.05} />
      </mesh>
      {/* Entrance awning */}
      <mesh position={[0, 2.7, fz + 0.28]}>
        <boxGeometry args={[3.2, 0.12, 0.65]} />
        <meshStandardMaterial color="#2e4666" roughness={0.7} metalness={0.2} />
      </mesh>
      {/* Permit review display (glowing panel) */}
      <mesh position={[0, 1.4, fz + 0.04]}>
        <boxGeometry args={[1.6, 0.85, 0.06]} />
        <meshStandardMaterial color="#001830" roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, 1.4, fz + 0.08]}>
        <boxGeometry args={[1.3, 0.62, 0.01]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.4} roughness={0.3} metalness={0} />
      </mesh>
    </group>
  );
}

function SpactivityDetail() {
  // Gym / applied-computing lab: scoreboard + court markings
  const fz = 2.5 + 0.06;
  return (
    <group>
      {/* Court line markings (flat on ground) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, fz + 1.0]}>
        <planeGeometry args={[5.5, 0.1]} />
        <meshStandardMaterial color="#c85aff" roughness={0.9} metalness={0} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, fz + 1.7]}>
        <planeGeometry args={[5.5, 0.1]} />
        <meshStandardMaterial color="#c85aff" roughness={0.9} metalness={0} />
      </mesh>
      {/* Centre circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, fz + 1.35]}>
        <planeGeometry args={[1.4, 1.4]} />
        <meshStandardMaterial color="#c85aff" roughness={0.9} metalness={0} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, fz + 1.35]}>
        <planeGeometry args={[1.1, 1.1]} />
        <meshStandardMaterial color="#7a9c5e" roughness={1.0} metalness={0} />
      </mesh>
      {/* Scoreboard housing */}
      <mesh position={[0, 2.3, fz + 0.04]}>
        <boxGeometry args={[3.0, 1.0, 0.1]} />
        <meshStandardMaterial color="#120820" roughness={0.5} metalness={0.2} />
      </mesh>
      {/* Scoreboard glow */}
      <mesh position={[0, 2.3, fz + 0.1]}>
        <boxGeometry args={[2.5, 0.68, 0.01]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.55} roughness={0.3} metalness={0} />
      </mesh>
      {/* Entrance sign */}
      <mesh position={[0, 1.6, fz + 0.04]}>
        <boxGeometry args={[3.8, 0.24, 0.07]} />
        <meshStandardMaterial color="#4a2460" roughness={0.7} metalness={0.2} />
      </mesh>
    </group>
  );
}

function MlLabDetail() {
  // Research computation center: antenna, monitor, vents
  const fz = 2.25 + 0.06;
  return (
    <group>
      {/* Roof antenna mast */}
      <mesh position={[1.2, 7.2, 1.2]}>
        <boxGeometry args={[0.1, 2.4, 0.1]} />
        <meshStandardMaterial color="#808890" roughness={0.6} metalness={0.5} />
      </mesh>
      {/* Blinking beacon tip */}
      <mesh position={[1.2, 8.5, 1.2]}>
        <boxGeometry args={[0.22, 0.22, 0.22]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.9} roughness={0.2} metalness={0} />
      </mesh>
      {/* Research monitor (south face) */}
      <mesh position={[0, 2.0, fz + 0.04]}>
        <boxGeometry args={[1.7, 0.95, 0.07]} />
        <meshStandardMaterial color="#0c1010" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[0, 2.0, fz + 0.09]}>
        <boxGeometry args={[1.4, 0.68, 0.01]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.6} roughness={0.3} metalness={0} />
      </mesh>
      {/* Side equipment rack */}
      <mesh position={[-2.33, 3.0, 0]}>
        <boxGeometry args={[0.06, 0.55, 1.6]} />
        <meshStandardMaterial color="#9a9880" roughness={0.8} metalness={0.2} />
      </mesh>
      {/* Small sensor node */}
      <mesh position={[0, 6.55, 0]}>
        <boxGeometry args={[0.5, 0.12, 0.5]} />
        <meshStandardMaterial color="#b0a880" roughness={0.7} metalness={0.2} />
      </mesh>
    </group>
  );
}

function ExperienceDetail() {
  // Engineering wing / professional office
  const fz = 2.25 + 0.06;
  return (
    <group>
      {/* Lobby awning */}
      <mesh position={[0, 2.3, fz + 0.32]}>
        <boxGeometry args={[5.5, 0.12, 0.7]} />
        <meshStandardMaterial color="#1e4060" roughness={0.7} metalness={0.2} />
      </mesh>
      {/* Corporate nameplate */}
      <mesh position={[0, 1.45, fz + 0.04]}>
        <boxGeometry args={[2.5, 0.46, 0.07]} />
        <meshStandardMaterial color="#0a1830" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[0, 1.45, fz + 0.09]}>
        <boxGeometry args={[2.1, 0.28, 0.01]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.45} roughness={0.3} metalness={0} />
      </mesh>
      {/* Flagpole */}
      <mesh position={[2.7, 2.0, fz]}>
        <boxGeometry args={[0.08, 4.0, 0.08]} />
        <meshStandardMaterial color="#707888" roughness={0.6} metalness={0.5} />
      </mesh>
      {/* Flag */}
      <mesh position={[2.7, 4.0, fz - 0.18]}>
        <boxGeometry args={[0.06, 0.55, 0.45]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.2} roughness={0.8} metalness={0} />
      </mesh>
      {/* Glass lobby panel */}
      <mesh position={[0, 2.0, fz + 0.04]}>
        <boxGeometry args={[4.0, 1.8, 0.04]} />
        <meshStandardMaterial color="#b8d8f0" roughness={0.1} metalness={0.05} />
      </mesh>
    </group>
  );
}

function LibraryDetail() {
  // Academic library: classical columns + pediment + steps
  const fz = 2.5 + 0.06;
  const colPositions: [number, number, number][] = [[-2.5, 1.6, fz], [0, 1.6, fz], [2.5, 1.6, fz]];
  return (
    <group>
      {/* Classical columns */}
      {colPositions.map(([cx, cy, cz], i) => (
        <mesh key={i} position={[cx, cy, cz]}>
          <boxGeometry args={[0.32, 3.2, 0.32]} />
          <meshStandardMaterial color="#d4cec4" roughness={0.85} metalness={0} />
        </mesh>
      ))}
      {/* Lintel / entablature */}
      <mesh position={[0, 3.35, fz]}>
        <boxGeometry args={[6.2, 0.28, 0.38]} />
        <meshStandardMaterial color="#d0cac0" roughness={0.85} metalness={0} />
      </mesh>
      {/* Pediment triangle top */}
      <mesh position={[0, 3.75, fz - 0.04]}>
        <boxGeometry args={[4.5, 0.22, 0.28]} />
        <meshStandardMaterial color="#c8c2b8" roughness={0.85} metalness={0} />
      </mesh>
      {/* Approach steps */}
      <mesh position={[0, 0.08, fz + 0.6]}>
        <boxGeometry args={[7.0, 0.16, 0.9]} />
        <meshStandardMaterial color="#c0b8a8" roughness={0.9} metalness={0} />
      </mesh>
      <mesh position={[0, 0.2, fz + 0.18]}>
        <boxGeometry args={[6.4, 0.4, 0.32]} />
        <meshStandardMaterial color="#b8b0a0" roughness={0.9} metalness={0} />
      </mesh>
    </group>
  );
}

function WorkshopDetail() {
  // Maker space: workbench + tool cabinet + gear accent
  const fz = 2.0 + 0.06;
  return (
    <group>
      {/* Workbench surface */}
      <mesh position={[0, 0.56, fz + 0.32]}>
        <boxGeometry args={[3.0, 0.1, 0.56]} />
        <meshStandardMaterial color="#6a4820" roughness={0.9} metalness={0} />
      </mesh>
      {/* Bench legs */}
      <mesh position={[-1.3, 0.28, fz + 0.32]}>
        <boxGeometry args={[0.1, 0.56, 0.5]} />
        <meshStandardMaterial color="#4a3818" roughness={0.9} metalness={0} />
      </mesh>
      <mesh position={[ 1.3, 0.28, fz + 0.32]}>
        <boxGeometry args={[0.1, 0.56, 0.5]} />
        <meshStandardMaterial color="#4a3818" roughness={0.9} metalness={0} />
      </mesh>
      {/* Tool cabinet */}
      <mesh position={[-1.8, 0.65, fz + 0.28]}>
        <boxGeometry args={[0.55, 1.3, 0.42]} />
        <meshStandardMaterial color="#5a4020" roughness={0.8} metalness={0} />
      </mesh>
      {/* Gear / rotary icon on wall */}
      <mesh position={[1.2, 2.2, fz + 0.05]}>
        <boxGeometry args={[0.72, 0.72, 0.09]} />
        <meshStandardMaterial color="#ea580c" emissive="#ea580c" emissiveIntensity={0.35} roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Supply box */}
      <mesh position={[0.6, 0.32, fz + 0.32]}>
        <boxGeometry args={[0.5, 0.55, 0.38]} />
        <meshStandardMaterial color="#c85020" roughness={0.8} metalness={0} />
      </mesh>
    </group>
  );
}

function PortalDetail() {
  // Contact atrium: glowing archway + beacon + terminal
  const fz = 1.75 + 0.08;
  return (
    <group>
      {/* Arch left post */}
      <mesh position={[-1.35, 1.65, fz + 0.22]}>
        <boxGeometry args={[0.22, 3.3, 0.22]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.4} roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Arch right post */}
      <mesh position={[ 1.35, 1.65, fz + 0.22]}>
        <boxGeometry args={[0.22, 3.3, 0.22]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.4} roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Arch lintel */}
      <mesh position={[0, 3.4, fz + 0.22]}>
        <boxGeometry args={[2.92, 0.22, 0.22]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.4} roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Beacon orb */}
      <mesh position={[0, 4.1, fz + 0.22]}>
        <boxGeometry args={[0.48, 0.48, 0.48]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={1.1} roughness={0.1} metalness={0} />
      </mesh>
      {/* Communication terminal / mailbox */}
      <mesh position={[1.9, 0.62, fz]}>
        <boxGeometry args={[0.36, 0.92, 0.28]} />
        <meshStandardMaterial color="#106868" roughness={0.7} metalness={0.3} />
      </mesh>
      <mesh position={[1.9, 1.12, fz + 0.15]}>
        <boxGeometry args={[0.28, 0.2, 0.06]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.6} roughness={0.3} metalness={0} />
      </mesh>
    </group>
  );
}

// Dispatch the right detail component per building id
function BuildingDetail({ id }: { id: string }) {
  switch (id) {
    case 'counterparty-tower': return <CounterpartyDetail />;
    case 'spactivity-gym':     return <SpactivityDetail />;
    case 'ml-lab':             return <MlLabDetail />;
    case 'experience-office':  return <ExperienceDetail />;
    case 'classes-library':    return <LibraryDetail />;
    case 'skills-workshop':    return <WorkshopDetail />;
    case 'contact-portal':     return <PortalDetail />;
    default: return null;
  }
}

// ─── Campus environment (ground + connected path network + props) ─────────────

function CampusEnvironment() {
  return (
    <>
      {/* ── Grass field ───────────────────────────────────────────────────── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#7a9c5e" roughness={1.0} metalness={0} />
      </mesh>

      {/* ── Central quad ──────────────────────────────────────────────────── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#b4aa9a" roughness={0.9} metalness={0} />
      </mesh>

      {/* ── Connected path network ────────────────────────────────────────── */}
      {/*
          Main axes:
            N spine 1: quad north edge (z=-7) to z=-14 cross-street
            N spine 2: z=-14 cross-street to ML Lab (z≈-24)
            E-W cross: Counterparty (x=-14) ←→ spine ←→ SPACtivity (x=16) at z=-14
            S spine:   quad south edge (z=+7) to z=+22 cross-street
            E-W at z=+8: quad ←→ Office (x=-20) / Library (x=+20)
            SW branch: spine (z=+22) → Skills (x=-14)
            SE branch: spine (z=+22) → Contact (x=+14)
      */}

      {/* N spine — quad north edge (z=-7) to ML Lab front (z=-24) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, -15.5]}>
        <planeGeometry args={[3, 17]} />
        <meshStandardMaterial color="#b0a898" roughness={0.9} metalness={0} />
      </mesh>
      {/* E-W cross-street at z=-14 — Counterparty (x=-16) to SPACtivity (x=+16) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, -14]}>
        <planeGeometry args={[40, 3]} />
        <meshStandardMaterial color="#b0a898" roughness={0.9} metalness={0} />
      </mesh>
      {/* S spine — quad south edge (z=+7) to z=+22 cross-street */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 14.5]}>
        <planeGeometry args={[3, 15]} />
        <meshStandardMaterial color="#b0a898" roughness={0.9} metalness={0} />
      </mesh>
      {/* E-W cross-street at z=+8 — Experience (x=-20) to Classes (x=+20) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 8]}>
        <planeGeometry args={[44, 3]} />
        <meshStandardMaterial color="#b0a898" roughness={0.9} metalness={0} />
      </mesh>
      {/* E-W cross-street at z=+22 — Skills (x=-14) to Contact (x=+14) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 22]}>
        <planeGeometry args={[30, 3]} />
        <meshStandardMaterial color="#b0a898" roughness={0.9} metalness={0} />
      </mesh>

      {/* ── Central fountain ──────────────────────────────────────────────── */}
      <mesh position={[0, 0.16, 0]}>
        <boxGeometry args={[2.2, 0.32, 2.2]} />
        <meshStandardMaterial color="#a8a090" roughness={0.75} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.34, 0]}>
        <boxGeometry args={[1.6, 0.06, 1.6]} />
        <meshStandardMaterial color="#5ab4c8" roughness={0.15} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[0.12, 0.5, 0.12]} />
        <meshStandardMaterial color="#a8a090" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* ── Trees ─────────────────────────────────────────────────────────── */}
      {/* Quad corners */}
      <VoxelTree position={[-8,  0, -8]}  />
      <VoxelTree position={[ 8,  0, -8]}  />
      <VoxelTree position={[-8,  0,  11]} />
      <VoxelTree position={[ 8,  0,  11]} />
      {/* Along N spine */}
      <VoxelTree position={[-3.5, 0, -18]} />
      <VoxelTree position={[ 3.5, 0, -18]} />
      {/* Along S spine */}
      <VoxelTree position={[-3.5, 0, 17]}  />
      <VoxelTree position={[ 3.5, 0, 17]}  />
      {/* Near perimeter */}
      <VoxelTree position={[-24, 0, -4]}  />
      <VoxelTree position={[ 24, 0, -4]}  />
      <VoxelTree position={[-22, 0, 20]}  />
      <VoxelTree position={[ 20, 0, 20]}  />

      {/* ── Lamp posts (flanking paths) ───────────────────────────────────── */}
      {/* N spine lamps */}
      <LampPost position={[-2.5, 0, -11]} />
      <LampPost position={[ 2.5, 0, -11]} />
      <LampPost position={[-2.5, 0, -19]} />
      <LampPost position={[ 2.5, 0, -19]} />
      {/* S spine lamps */}
      <LampPost position={[-2.5, 0, 15]}  />
      <LampPost position={[ 2.5, 0, 15]}  />
      {/* E-W lamps flanking z=8 path (moved north of path) */}
      <LampPost position={[-9,  0, 10.5]} />
      <LampPost position={[ 9,  0, 10.5]} />
      <LampPost position={[-16, 0, 10.5]} />
      <LampPost position={[ 16, 0, 10.5]} />

      {/* ── Planters at quad corners ──────────────────────────────────────── */}
      <Planter position={[-5.5, 0, -5.5]} />
      <Planter position={[ 5.5, 0, -5.5]} />
      <Planter position={[-5.5, 0,  5.5]} />
      <Planter position={[ 5.5, 0,  5.5]} />

      {/* ── Benches facing the fountain ───────────────────────────────────── */}
      <Bench position={[-3.5, 0, 0]} rotY={ Math.PI / 2} />
      <Bench position={[ 3.5, 0, 0]} rotY={-Math.PI / 2} />
      <Bench position={[0, 0, -3.5]} rotY={0} />

      {/* ── Info kiosk near player start ──────────────────────────────────── */}
      <InfoKiosk position={[5.5, 0, 5]} />

      {/* ── Rocks (accent) ────────────────────────────────────────────────── */}
      <Rock position={[-11, 0.1, -11]} rotY={0.4}  scale={1.2} />
      <Rock position={[ 12, 0.1, -10]} rotY={1.1}  scale={0.9} />
      <Rock position={[-19, 0.1,  18]} rotY={0.7}  scale={1.0} />
      <Rock position={[ 19, 0.1,  18]} rotY={2.1}  scale={1.1} />

      {/* ── Perimeter hedges — campus boundary ───────────────────────────── */}
      <mesh position={[0, 1.0, -35]}>
        <boxGeometry args={[68, 2.0, 2.4]} />
        <meshStandardMaterial color="#2e5828" roughness={1.0} metalness={0} />
      </mesh>
      <mesh position={[0, 1.0, 31]}>
        <boxGeometry args={[68, 2.0, 2.4]} />
        <meshStandardMaterial color="#2e5828" roughness={1.0} metalness={0} />
      </mesh>
      <mesh position={[-31, 1.0, -2]}>
        <boxGeometry args={[2.4, 2.0, 70]} />
        <meshStandardMaterial color="#2e5828" roughness={1.0} metalness={0} />
      </mesh>
      <mesh position={[31, 1.0, -2]}>
        <boxGeometry args={[2.4, 2.0, 70]} />
        <meshStandardMaterial color="#2e5828" roughness={1.0} metalness={0} />
      </mesh>
    </>
  );
}

// ─── Inner scene ──────────────────────────────────────────────────────────────

interface SceneContentProps {
  onNearBuilding: (b: NearBuilding) => void;
  onBuildingClick?: (b: BuildingConfig) => void;
  panelOpen: boolean;
}

function SceneContent({ onNearBuilding, onBuildingClick, panelOpen }: SceneContentProps) {
  const playerPos     = useRef(new Vector3(0, 0, 5));
  const playerRotY    = useRef(Math.PI);
  const isMovingRef   = useRef(false);
  const avatarGroup   = useRef<Group>(null);
  const currentNearId = useRef<string | null>(null);
  const camTarget     = useRef(new Vector3(0, 10, 14));

  // Ref copy of panelOpen so useFrame reads it without stale closures
  const panelOpenRef = useRef(false);
  panelOpenRef.current = panelOpen;

  const keys    = usePlayerControls();
  const { camera } = useThree();

  useFrame((_, delta) => {
    const isPanelOpen = panelOpenRef.current;

    // ── Movement (frozen while panel is open) ────────────────────────────
    const SPEED = 8;
    const k = keys.current;
    let dx = 0, dz = 0;

    if (!isPanelOpen) {
      if (k.w || k.ArrowUp)    dz -= 1;
      if (k.s || k.ArrowDown)  dz += 1;
      if (k.a || k.ArrowLeft)  dx -= 1;
      if (k.d || k.ArrowRight) dx += 1;
    }

    const moving = dx !== 0 || dz !== 0;
    isMovingRef.current = moving;

    if (moving) {
      const len = Math.sqrt(dx * dx + dz * dz);
      dx /= len;
      dz /= len;

      const nx = Math.max(WORLD_BOUNDS.minX, Math.min(WORLD_BOUNDS.maxX,
        playerPos.current.x + dx * SPEED * delta));
      const nz = Math.max(WORLD_BOUNDS.minZ, Math.min(WORLD_BOUNDS.maxZ,
        playerPos.current.z + dz * SPEED * delta));

      // Separate X/Z collision for wall-sliding
      if (!isColliding(nx, playerPos.current.z)) playerPos.current.x = nx;
      if (!isColliding(playerPos.current.x, nz)) playerPos.current.z = nz;

      playerRotY.current = Math.atan2(dx, dz);
    }

    // ── Avatar transform ──────────────────────────────────────────────────
    if (avatarGroup.current) {
      avatarGroup.current.position.copy(playerPos.current);
      avatarGroup.current.rotation.y = playerRotY.current;
    }

    // ── Camera follow ─────────────────────────────────────────────────────
    camTarget.current.set(
      playerPos.current.x,
      playerPos.current.y + 10,
      playerPos.current.z + 14,
    );
    camera.position.x += (camTarget.current.x - camera.position.x) * 0.08;
    camera.position.y += (camTarget.current.y - camera.position.y) * 0.08;
    camera.position.z += (camTarget.current.z - camera.position.z) * 0.08;
    camera.lookAt(playerPos.current.x, playerPos.current.y + 1.5, playerPos.current.z);

    // ── Proximity detection ───────────────────────────────────────────────
    let nearestBuilding: NearBuilding = null;
    let minDist = Infinity;
    const px = playerPos.current.x;
    const pz = playerPos.current.z;

    for (let i = 0; i < BUILDINGS.length; i++) {
      const d = Math.sqrt((px - BUILDING_XZ[i].x) ** 2 + (pz - BUILDING_XZ[i].z) ** 2);
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
      <color attach="background" args={['#b8d4ec']} />
      <fog attach="fog" args={['#c0d8f0', 55, 105]} />

      <hemisphereLight args={['#87ceeb', '#8b9e6e', 0.8]} />
      <ambientLight intensity={0.3} color="#fff4e0" />
      <directionalLight position={[25, 35, 15]} intensity={1.5} color="#ffe8b0" castShadow />
      <directionalLight position={[-10, 15, -20]} intensity={0.35} color="#b0d0ff" />

      <CampusEnvironment />

      {BUILDINGS.map((b) => (
        <group key={b.id} position={b.position}>
          <VoxelBuilding
            {...b}
            onBuildingClick={onBuildingClick ? () => onBuildingClick(b) : undefined}
            panelOpen={panelOpen}
          />
          <BuildingDetail id={b.id} />
        </group>
      ))}

      <group ref={avatarGroup}>
        <VoxelAvatar isMovingRef={isMovingRef} />
      </group>
    </>
  );
}

// ─── Public export ─────────────────────────────────────────────────────────────

interface VoxelWorldProps {
  onNearBuilding?: (b: NearBuilding) => void;
  onBuildingClick?: (b: BuildingConfig) => void;
  panelOpen?: boolean;
}

export default function VoxelWorld({
  onNearBuilding,
  onBuildingClick,
  panelOpen = false,
}: VoxelWorldProps) {
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
      <SceneContent
        onNearBuilding={handleNear}
        onBuildingClick={handleClick}
        panelOpen={panelOpen}
      />
    </Canvas>
  );
}

export { BUILDINGS };
