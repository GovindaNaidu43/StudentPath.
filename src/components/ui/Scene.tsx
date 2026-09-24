"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";


function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;
    }
  });

  return (
    <meshStandardMaterial
      color="#2563eb"
      roughness={1}
      metalness={1}
    />
  );
}

export default function Scene() {
  return (
    <div className="absolute inset-0 z-0">

      <Canvas camera={{ position: [0, 0, 5] }}>

        {/* Lighting */}
        <ambientLight intensity={1.5} />

        <pointLight
          position={[5, 5, 5]}
          intensity={4}
          color="#a855f7"
        />

        {/* Stars */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        {/* Floating Orb */}
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />

        <Earth />

      </Canvas>

    </div>
  );
}