'use client';

import { useRef, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import { VoxelAvatar } from './VoxelAvatar';
import { VoxelBuilding, type BuildingConfig } from './VoxelBuilding';
import { usePlayerControls } from './usePlayerControls';

// ─── Campus layout ────────────────────────────────────────────────────────────
//
//      ╔══════════════════════════════╗
//      ║    [ML Lab]                  ║  z ≈ -26
//      ║  [Tower]    [Gym]            ║  z ≈ -14
//      ║       QUAD / FOUNTAIN        ║  z = 0
//      ║  [Office]   [Library]        ║  z ≈ +8
//      ║  [Workshop] [Portal]         ║  z ≈ +22
//      ╚══════════════════════════════╝  campus perimeter hedge

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

// Pre-compute center XZ for proximity checks
const BUILDING_XZ = BUILDINGS.map((b) => ({ x: b.position[0], z: b.position[2] }));

export type NearBuilding = BuildingConfig | null;

// ─── World bounds & collision ─────────────────────────────────────────────────

const WORLD_BOUNDS = { minX: -28, maxX: 28, minZ: -32, maxZ: 28 };

// Player half-width added as padding around each building AABB
const PLAYER_RADIUS = 0.9;

interface Collider { cx: number; cz: number; hw: number; hd: number }

const BUILDING_COLLIDERS: Collider[] = BUILDINGS.map((b) => ({
  cx: b.position[0],
  cz: b.position[2],
  hw: b.width  / 2 + PLAYER_RADIUS,
  hd: b.depth  / 2 + PLAYER_RADIUS,
}));

function isColliding(px: number, pz: number): boolean {
  for (const c of BUILDING_COLLIDERS) {
    if (px > c.cx - c.hw && px < c.cx + c.hw &&
        pz > c.cz - c.hd && pz < c.cz + c.hd) return true;
  }
  return false;
}

// ─── Campus prop components ───────────────────────────────────────────────────

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

// Slim metal lamp post — no point light for performance
function LampPost({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Shaft */}
      <mesh position={[0, 2.0, 0]}>
        <boxGeometry args={[0.12, 4.0, 0.12]} />
        <meshStandardMaterial color="#505868" roughness={0.6} metalness={0.5} />
      </mesh>
      {/* Head housing */}
      <mesh position={[0, 4.15, 0]}>
        <boxGeometry args={[0.44, 0.16, 0.44]} />
        <meshStandardMaterial color="#606870" roughness={0.5} metalness={0.5} />
      </mesh>
      {/* Warm lens glow */}
      <mesh position={[0, 4.07, 0]}>
        <boxGeometry args={[0.28, 0.06, 0.28]} />
        <meshStandardMaterial
          color="#ffe8a8"
          emissive="#ffe8a8"
          emissiveIntensity={0.9}
          roughness={0.3}
          metalness={0}
        />
      </mesh>
    </group>
  );
}

// Concrete planter with green top
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

// Wooden slat bench on metal frame
function Bench({ position, rotY = 0 }: {
  position: [number, number, number];
  rotY?: number;
}) {
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

// Campus info kiosk — glowing screen near player start
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
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0}
        />
      </mesh>
    </group>
  );
}

// ─── Campus environment (ground + props) ─────────────────────────────────────

function CampusEnvironment() {
  return (
    <>
      {/* ── Ground planes ─────────────────────────────────────────────────── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#7a9c5e" roughness={1.0} metalness={0} />
      </mesh>

      {/* Central quad — concrete */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#b4aa9a" roughness={0.9} metalness={0} />
      </mesh>

      {/* ── Stone paths ───────────────────────────────────────────────────── */}
      {/* North axis → ML Lab / Tower / Gym */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, -20]}>
        <planeGeometry args={[3, 20]} />
        <meshStandardMaterial color="#b0a898" roughness={0.9} metalness={0} />
      </mesh>
      {/* South axis → Skills / Contact */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 21]}>
        <planeGeometry args={[3, 22]} />
        <meshStandardMaterial color="#b0a898" roughness={0.9} metalness={0} />
      </mesh>
      {/* West spur → Experience wing */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-14, 0.002, 5]}>
        <planeGeometry args={[15, 3]} />
        <meshStandardMaterial color="#b0a898" roughness={0.9} metalness={0} />
      </mesh>
      {/* East spur → Library */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[14, 0.002, 5]}>
        <planeGeometry args={[15, 3]} />
        <meshStandardMaterial color="#b0a898" roughness={0.9} metalness={0} />
      </mesh>

      {/* ── Central fountain ──────────────────────────────────────────────── */}
      <mesh position={[0, 0.16, 0]}>
        <boxGeometry args={[2.2, 0.32, 2.2]} />
        <meshStandardMaterial color="#a8a090" roughness={0.75} metalness={0.1} />
      </mesh>
      {/* Water surface */}
      <mesh position={[0, 0.34, 0]}>
        <boxGeometry args={[1.6, 0.06, 1.6]} />
        <meshStandardMaterial color="#5ab4c8" roughness={0.15} metalness={0.05} />
      </mesh>
      {/* Center spout */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[0.12, 0.5, 0.12]} />
        <meshStandardMaterial color="#a8a090" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* ── Trees — flanking paths and buildings ─────────────────────────── */}
      <VoxelTree position={[-8,  0, -8]}  />
      <VoxelTree position={[ 8,  0, -8]}  />
      <VoxelTree position={[-10, 0,  4]}  />
      <VoxelTree position={[ 10, 0,  4]}  />
      <VoxelTree position={[-6,  0, 17]}  />
      <VoxelTree position={[ 6,  0, 17]}  />
      <VoxelTree position={[ 0,  0, -19]} />
      <VoxelTree position={[-25, 0, -4]}  />
      <VoxelTree position={[ 25, 0, -4]}  />
      <VoxelTree position={[-22, 0, 20]}  />
      <VoxelTree position={[ 20, 0, 20]}  />

      {/* ── Campus lamp posts — flanking main paths ───────────────────────── */}
      <LampPost position={[-2.5, 0, -10]} />
      <LampPost position={[ 2.5, 0, -10]} />
      <LampPost position={[-2.5, 0, -20]} />
      <LampPost position={[ 2.5, 0, -20]} />
      <LampPost position={[-2.5, 0,  15]} />
      <LampPost position={[ 2.5, 0,  15]} />
      <LampPost position={[-10,  0, 3.5]} />
      <LampPost position={[ 10,  0, 3.5]} />
      <LampPost position={[-16,  0, 3.5]} />
      <LampPost position={[ 16,  0, 3.5]} />

      {/* ── Planters — quad corners ───────────────────────────────────────── */}
      <Planter position={[-5.5, 0, -5.5]} />
      <Planter position={[ 5.5, 0, -5.5]} />
      <Planter position={[-5.5, 0,  5.5]} />
      <Planter position={[ 5.5, 0,  5.5]} />

      {/* ── Benches — facing the fountain ─────────────────────────────────── */}
      <Bench position={[-3.5, 0, 0]} rotY={ Math.PI / 2} />
      <Bench position={[ 3.5, 0, 0]} rotY={-Math.PI / 2} />
      <Bench position={[0, 0, -3.5]} rotY={0} />

      {/* ── Info kiosk near player start ──────────────────────────────────── */}
      <InfoKiosk position={[5.5, 0, 5]} />

      {/* ── Rocks — landscape accents ─────────────────────────────────────── */}
      <Rock position={[-11, 0.1, -11]} rotY={0.4}  scale={1.2} />
      <Rock position={[ 12, 0.1, -10]} rotY={1.1}  scale={0.9} />
      <Rock position={[-19, 0.1,  18]} rotY={0.7}  scale={1.0} />
      <Rock position={[ 19, 0.1,  18]} rotY={2.1}  scale={1.1} />

      {/* ── Campus perimeter hedges — visual world boundary ───────────────── */}
      {/* North */}
      <mesh position={[0, 1.0, -35]}>
        <boxGeometry args={[68, 2.0, 2.4]} />
        <meshStandardMaterial color="#2e5828" roughness={1.0} metalness={0} />
      </mesh>
      {/* South */}
      <mesh position={[0, 1.0, 31]}>
        <boxGeometry args={[68, 2.0, 2.4]} />
        <meshStandardMaterial color="#2e5828" roughness={1.0} metalness={0} />
      </mesh>
      {/* West */}
      <mesh position={[-31, 1.0, -2]}>
        <boxGeometry args={[2.4, 2.0, 70]} />
        <meshStandardMaterial color="#2e5828" roughness={1.0} metalness={0} />
      </mesh>
      {/* East */}
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
  const playerPos    = useRef(new Vector3(0, 0, 0));
  const playerRotY   = useRef(Math.PI);
  const isMovingRef  = useRef(false);
  const avatarGroup  = useRef<Group>(null);
  const currentNearId = useRef<string | null>(null);
  const camTarget    = useRef(new Vector3(0, 10, 14));

  // Sync panelOpen to a ref so useFrame can read it without stale closures
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

      // World-bounded next positions
      const nx = Math.max(WORLD_BOUNDS.minX, Math.min(WORLD_BOUNDS.maxX,
        playerPos.current.x + dx * SPEED * delta));
      const nz = Math.max(WORLD_BOUNDS.minZ, Math.min(WORLD_BOUNDS.maxZ,
        playerPos.current.z + dz * SPEED * delta));

      // AABB building collision — check X and Z separately for wall sliding
      if (!isColliding(nx, playerPos.current.z)) playerPos.current.x = nx;
      if (!isColliding(playerPos.current.x, nz)) playerPos.current.z = nz;

      playerRotY.current = Math.atan2(dx, dz);
    }

    // ── Avatar transform ──────────────────────────────────────────────────
    if (avatarGroup.current) {
      avatarGroup.current.position.copy(playerPos.current);
      avatarGroup.current.rotation.y = playerRotY.current;
    }

    // ── Camera follow (3rd-person, slightly above-and-behind) ─────────────
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
      {/* Sky + distance fog */}
      <color attach="background" args={['#b8d4ec']} />
      <fog attach="fog" args={['#c0d8f0', 55, 105]} />

      {/* Daylight lighting — hemisphere sky/ground + warm sun + cool fill */}
      <hemisphereLight args={['#87ceeb', '#8b9e6e', 0.8]} />
      <ambientLight intensity={0.3} color="#fff4e0" />
      <directionalLight position={[25, 35, 15]} intensity={1.5} color="#ffe8b0" castShadow />
      <directionalLight position={[-10, 15, -20]} intensity={0.35} color="#b0d0ff" />

      <CampusEnvironment />

      {/* Buildings */}
      {BUILDINGS.map((b) => (
        <group key={b.id} position={b.position}>
          <VoxelBuilding
            {...b}
            onBuildingClick={onBuildingClick ? () => onBuildingClick(b) : undefined}
            panelOpen={panelOpen}
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

// ─── Public export ─────────────────────────────────────────────────────────────

interface VoxelWorldProps {
  onNearBuilding?: (b: NearBuilding) => void;
  onBuildingClick?: (b: BuildingConfig) => void;
  /** When true, freezes movement and hides floating labels */
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

// Re-export BUILDINGS so VoxelHero can reference building metadata without
// importing the full Three.js module on the server.
export { BUILDINGS };
