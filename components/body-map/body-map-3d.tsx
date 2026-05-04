'use client';

import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import type { BodyRegion } from '@/lib/logic-engine';

const SKIN = '#E8DDCC';
const HOVER = '#F5DCC4';
const SELECTED = '#B86F35';
const ACCENT_DARK = '#8A5025';

interface PartProps {
  region: BodyRegion;
  selected: BodyRegion | undefined;
  onSelect: (r: BodyRegion) => void;
  position: [number, number, number];
  rotation?: [number, number, number];
  children: React.ReactNode;
}

function Part({ region, selected, onSelect, position, rotation, children }: PartProps) {
  const [hovered, setHovered] = useState(false);
  const isSelected = selected === region;
  const color = isSelected ? SELECTED : hovered ? HOVER : SKIN;

  return (
    <mesh
      position={position}
      rotation={rotation}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onSelect(region);
      }}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
    >
      {children}
      <meshStandardMaterial color={color} roughness={0.6} metalness={0.05} />
    </mesh>
  );
}

function Decorative({
  position,
  rotation,
  children,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  children: React.ReactNode;
}) {
  return (
    <mesh position={position} rotation={rotation}>
      {children}
      <meshStandardMaterial color={SKIN} roughness={0.6} metalness={0.05} />
    </mesh>
  );
}

function Figure({
  selected,
  onSelect,
}: {
  selected: BodyRegion | undefined;
  onSelect: (r: BodyRegion) => void;
}) {
  const armRotZ = Math.PI / 12;
  const armX = 0.32;

  return (
    <group position={[0, -0.95, 0]}>
      {/* Head */}
      <Decorative position={[0, 1.95, 0]}>
        <sphereGeometry args={[0.16, 32, 32]} />
      </Decorative>
      {/* Neck */}
      <Decorative position={[0, 1.78, 0]}>
        <cylinderGeometry args={[0.05, 0.06, 0.08, 16]} />
      </Decorative>

      {/* Torso (clickable: shoulder-region as a default upper-body click) */}
      <Decorative position={[0, 1.45, 0]}>
        <capsuleGeometry args={[0.18, 0.4, 8, 16]} />
      </Decorative>

      {/* Lower back marker — slightly behind the torso */}
      <Part region="lower_back" selected={selected} onSelect={onSelect} position={[0, 1.28, -0.13]}>
        <sphereGeometry args={[0.075, 24, 24]} />
      </Part>

      {/* Pelvis */}
      <Decorative position={[0, 1.18, 0]}>
        <capsuleGeometry args={[0.16, 0.05, 8, 16]} />
      </Decorative>

      {/* === ARMS === */}
      {/* Left shoulder + upper arm (clickable: shoulder) */}
      <Part region="shoulder" selected={selected} onSelect={onSelect} position={[-armX, 1.66, 0]}>
        <sphereGeometry args={[0.085, 24, 24]} />
      </Part>
      <Part
        region="shoulder"
        selected={selected}
        onSelect={onSelect}
        position={[-armX - 0.04, 1.5, 0]}
        rotation={[0, 0, armRotZ]}
      >
        <capsuleGeometry args={[0.06, 0.22, 8, 16]} />
      </Part>
      {/* Left elbow */}
      <Part region="elbow" selected={selected} onSelect={onSelect} position={[-armX - 0.08, 1.27, 0]}>
        <sphereGeometry args={[0.065, 24, 24]} />
      </Part>
      {/* Left forearm + hand (clickable: wrist) */}
      <Part
        region="wrist"
        selected={selected}
        onSelect={onSelect}
        position={[-armX - 0.12, 1.07, 0]}
        rotation={[0, 0, armRotZ]}
      >
        <capsuleGeometry args={[0.055, 0.22, 8, 16]} />
      </Part>
      <Part region="wrist" selected={selected} onSelect={onSelect} position={[-armX - 0.16, 0.84, 0]}>
        <sphereGeometry args={[0.07, 24, 24]} />
      </Part>

      {/* Right shoulder + upper arm */}
      <Part region="shoulder" selected={selected} onSelect={onSelect} position={[armX, 1.66, 0]}>
        <sphereGeometry args={[0.085, 24, 24]} />
      </Part>
      <Part
        region="shoulder"
        selected={selected}
        onSelect={onSelect}
        position={[armX + 0.04, 1.5, 0]}
        rotation={[0, 0, -armRotZ]}
      >
        <capsuleGeometry args={[0.06, 0.22, 8, 16]} />
      </Part>
      <Part region="elbow" selected={selected} onSelect={onSelect} position={[armX + 0.08, 1.27, 0]}>
        <sphereGeometry args={[0.065, 24, 24]} />
      </Part>
      <Part
        region="wrist"
        selected={selected}
        onSelect={onSelect}
        position={[armX + 0.12, 1.07, 0]}
        rotation={[0, 0, -armRotZ]}
      >
        <capsuleGeometry args={[0.055, 0.22, 8, 16]} />
      </Part>
      <Part region="wrist" selected={selected} onSelect={onSelect} position={[armX + 0.16, 0.84, 0]}>
        <sphereGeometry args={[0.07, 24, 24]} />
      </Part>

      {/* === LEGS === */}
      {/* Left hip joint + thigh */}
      <Part region="hip" selected={selected} onSelect={onSelect} position={[-0.1, 1.13, 0]}>
        <sphereGeometry args={[0.08, 24, 24]} />
      </Part>
      <Part region="hip" selected={selected} onSelect={onSelect} position={[-0.1, 0.83, 0]}>
        <capsuleGeometry args={[0.08, 0.36, 8, 16]} />
      </Part>
      {/* Left knee */}
      <Part region="knee" selected={selected} onSelect={onSelect} position={[-0.1, 0.55, 0]}>
        <sphereGeometry args={[0.075, 24, 24]} />
      </Part>
      {/* Left shin (clickable: ankle for lower-leg) */}
      <Part region="ankle" selected={selected} onSelect={onSelect} position={[-0.1, 0.3, 0]}>
        <capsuleGeometry args={[0.065, 0.36, 8, 16]} />
      </Part>
      {/* Left ankle joint */}
      <Part region="ankle" selected={selected} onSelect={onSelect} position={[-0.1, 0.07, 0]}>
        <sphereGeometry args={[0.06, 24, 24]} />
      </Part>
      {/* Left foot */}
      <Part region="foot" selected={selected} onSelect={onSelect} position={[-0.1, 0.025, 0.06]}>
        <boxGeometry args={[0.12, 0.05, 0.22]} />
      </Part>

      {/* Right leg (mirror) */}
      <Part region="hip" selected={selected} onSelect={onSelect} position={[0.1, 1.13, 0]}>
        <sphereGeometry args={[0.08, 24, 24]} />
      </Part>
      <Part region="hip" selected={selected} onSelect={onSelect} position={[0.1, 0.83, 0]}>
        <capsuleGeometry args={[0.08, 0.36, 8, 16]} />
      </Part>
      <Part region="knee" selected={selected} onSelect={onSelect} position={[0.1, 0.55, 0]}>
        <sphereGeometry args={[0.075, 24, 24]} />
      </Part>
      <Part region="ankle" selected={selected} onSelect={onSelect} position={[0.1, 0.3, 0]}>
        <capsuleGeometry args={[0.065, 0.36, 8, 16]} />
      </Part>
      <Part region="ankle" selected={selected} onSelect={onSelect} position={[0.1, 0.07, 0]}>
        <sphereGeometry args={[0.06, 24, 24]} />
      </Part>
      <Part region="foot" selected={selected} onSelect={onSelect} position={[0.1, 0.025, 0.06]}>
        <boxGeometry args={[0.12, 0.05, 0.22]} />
      </Part>
    </group>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.96, 0]} receiveShadow>
      <circleGeometry args={[1.2, 64]} />
      <meshStandardMaterial color="#F2EDE4" roughness={1} />
    </mesh>
  );
}

export function BodyMap3D({
  selected,
  onSelect,
}: {
  selected: BodyRegion | undefined;
  onSelect: (region: BodyRegion) => void;
}) {
  return (
    <div className="bg-bg-secondary ring-subtle relative h-[560px] w-full overflow-hidden rounded-card">
      <Canvas
        camera={{ position: [0, 0.25, 4.2], fov: 32 }}
        shadows
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 4]} intensity={0.8} castShadow />
        <directionalLight position={[-3, 2, -4]} intensity={0.25} color={ACCENT_DARK} />
        <Suspense fallback={null}>
          <Figure selected={selected} onSelect={onSelect} />
          <Floor />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom
          minDistance={2.8}
          maxDistance={5.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={(Math.PI * 3) / 4}
          target={[0, 0.05, 0]}
        />
      </Canvas>
      <p className="text-fg-secondary pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-xs">
        Drag to rotate · scroll to zoom · click a body part
      </p>
    </div>
  );
}
