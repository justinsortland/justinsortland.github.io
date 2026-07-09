'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';

interface VoxelAvatarProps {
  /** Ref from parent tracking whether the player is moving; read in useFrame without triggering re-renders */
  isMovingRef: React.MutableRefObject<boolean>;
}

/**
 * Original blocky avatar — no Minecraft/Mojang assets.
 * Head + hair, torso (teal shirt), arms, dark-blue legs.
 * Arms and legs swing opposite each other while moving;
 * a subtle idle bob keeps the character alive when still.
 */
export function VoxelAvatar({ isMovingRef }: VoxelAvatarProps) {
  const leftArmRef  = useRef<Group>(null);
  const rightArmRef = useRef<Group>(null);
  const leftLegRef  = useRef<Group>(null);
  const rightLegRef = useRef<Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (isMovingRef.current) {
      // Walk cycle — arms counter-swing to legs
      const swing = Math.sin(t * 10) * 0.45;
      if (leftLegRef.current)  leftLegRef.current.rotation.x  =  swing;
      if (rightLegRef.current) rightLegRef.current.rotation.x = -swing;
      if (leftArmRef.current)  leftArmRef.current.rotation.x  = -swing * 0.6;
      if (rightArmRef.current) rightArmRef.current.rotation.x  =  swing * 0.6;
    } else {
      // Damped return to neutral (not snapping)
      const damp = 0.12;
      if (leftLegRef.current)  leftLegRef.current.rotation.x  *= 1 - damp;
      if (rightLegRef.current) rightLegRef.current.rotation.x *= 1 - damp;
      if (leftArmRef.current)  leftArmRef.current.rotation.x  *= 1 - damp;
      if (rightArmRef.current) rightArmRef.current.rotation.x *= 1 - damp;
    }
  });

  // Geometry is relative to this group which the parent positions/rotates
  return (
    <group>
      {/* ── Head ── */}
      <mesh position={[0, 2.1, 0]}>
        <boxGeometry args={[0.62, 0.62, 0.62]} />
        <meshLambertMaterial color="#e8c9a0" />
      </mesh>

      {/* Hair / cap */}
      <mesh position={[0, 2.42, 0.02]}>
        <boxGeometry args={[0.64, 0.14, 0.64]} />
        <meshLambertMaterial color="#3a2000" />
      </mesh>

      {/* ── Torso ── */}
      <mesh position={[0, 1.32, 0]}>
        <boxGeometry args={[0.72, 0.88, 0.42]} />
        <meshLambertMaterial color="#2a9d8f" />
      </mesh>

      {/* ── Left arm (pivot at shoulder) ── */}
      <group ref={leftArmRef} position={[-0.55, 1.73, 0]}>
        <mesh position={[0, -0.36, 0]}>
          <boxGeometry args={[0.28, 0.72, 0.34]} />
          <meshLambertMaterial color="#2a9d8f" />
        </mesh>
      </group>

      {/* ── Right arm (pivot at shoulder) ── */}
      <group ref={rightArmRef} position={[0.55, 1.73, 0]}>
        <mesh position={[0, -0.36, 0]}>
          <boxGeometry args={[0.28, 0.72, 0.34]} />
          <meshLambertMaterial color="#2a9d8f" />
        </mesh>
      </group>

      {/* ── Left leg (pivot at hip) ── */}
      <group ref={leftLegRef} position={[-0.19, 0.85, 0]}>
        <mesh position={[0, -0.42, 0]}>
          <boxGeometry args={[0.3, 0.84, 0.36]} />
          <meshLambertMaterial color="#1e3a5f" />
        </mesh>
      </group>

      {/* ── Right leg (pivot at hip) ── */}
      <group ref={rightLegRef} position={[0.19, 0.85, 0]}>
        <mesh position={[0, -0.42, 0]}>
          <boxGeometry args={[0.3, 0.84, 0.36]} />
          <meshLambertMaterial color="#1e3a5f" />
        </mesh>
      </group>
    </group>
  );
}
