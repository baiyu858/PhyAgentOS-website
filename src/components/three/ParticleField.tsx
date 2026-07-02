import { useRef, useMemo, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Seeded random for deterministic initialization
function seededRandom(seed: number) {
  return function () {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function Particles({ count = 200, mousePosition }: { count?: number; mousePosition: { x: number; y: number } }) {
  const mesh = useRef<THREE.Points>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    mouseX.current = mousePosition.x;
    mouseY.current = mousePosition.y;
  }, [mousePosition]);

  // Generate positions and velocities with seeded random
  const { positions, velocities } = useMemo(() => {
    const rand = seededRandom(42);
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rand() - 0.5) * 20;
      pos[i * 3 + 1] = (rand() - 0.5) * 20;
      pos[i * 3 + 2] = (rand() - 0.5) * 10;

      vel[i * 3] = (rand() - 0.5) * 0.002;
      vel[i * 3 + 1] = (rand() - 0.5) * 0.002;
      vel[i * 3 + 2] = (rand() - 0.5) * 0.001;
    }

    return { positions: pos, velocities: vel };
  }, [count]);

  const updateParticles = useCallback((state: { clock: { elapsedTime: number } }) => {
    if (!mesh.current) return;

    const posArray = mesh.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      posArray[idx] += velocities[idx];
      posArray[idx + 1] += velocities[idx + 1];
      posArray[idx + 2] += velocities[idx + 2];

      // Mouse interaction
      const dx = mouseX.current * 10 - posArray[idx];
      const dy = mouseY.current * 10 - posArray[idx + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 3) {
        posArray[idx] -= dx * 0.01;
        posArray[idx + 1] -= dy * 0.01;
      }

      // Boundary wrap
      if (posArray[idx] > 10) posArray[idx] = -10;
      if (posArray[idx] < -10) posArray[idx] = 10;
      if (posArray[idx + 1] > 10) posArray[idx + 1] = -10;
      if (posArray[idx + 1] < -10) posArray[idx + 1] = 10;
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
  }, [count, velocities]);

  useFrame(updateParticles);

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#5c7385"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ConnectionLines({ count = 50 }: { count?: number }) {
  const linesRef = useRef<THREE.LineSegments>(null);

  const positions = useMemo(() => {
    return new Float32Array(count * count * 6);
  }, [count]);

  useFrame(() => {
    if (!linesRef.current) return;
    linesRef.current.rotation.y += 0.001;
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#5c7385" transparent opacity={0.05} />
    </lineSegments>
  );
}

interface ParticleFieldProps {
  mousePosition: { x: number; y: number };
  className?: string;
}

export default function ParticleField({ mousePosition, className = '' }: ParticleFieldProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <Particles count={150} mousePosition={mousePosition} />
        <ConnectionLines count={50} />
      </Canvas>
    </div>
  );
}
