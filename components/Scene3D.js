"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// Rotates its children toward the cursor position with damped lerp so the
// motion trails the mouse instead of snapping to it.
function ParallaxRig({ children }) {
  const group = useRef(null);

  useFrame((state) => {
    const node = group.current;
    if (!node) return;
    const { pointer } = state;
    node.rotation.y = THREE.MathUtils.lerp(node.rotation.y, pointer.x * 0.45, 0.05);
    node.rotation.x = THREE.MathUtils.lerp(node.rotation.x, -pointer.y * 0.25, 0.05);
  });

  return <group ref={group}>{children}</group>;
}

// The signature shape: a faceted crystal (asset / property token) wrapped in
// a slightly larger wireframe shell (blueprint / structure), echoing the
// angular building forms in the Darify mark.
function Crystal() {
  return (
    <Float speed={1.3} rotationIntensity={0.4} floatIntensity={1.1}>
      <group>
        <mesh>
          <icosahedronGeometry args={[1.3, 1]} />
          <MeshDistortMaterial
            color="#2e5eff"
            emissive="#213cc9"
            emissiveIntensity={0.4}
            roughness={0.12}
            metalness={0.55}
            flatShading
            distort={0.2}
            speed={1.1}
          />
        </mesh>
        <mesh scale={1.18}>
          <icosahedronGeometry args={[1.3, 1]} />
          <meshBasicMaterial color="#8b6fff" wireframe transparent opacity={0.18} />
        </mesh>
      </group>
    </Float>
  );
}

function OrbitNode({ radius, speed, size, color, offset = 0 }) {
  const ref = useRef(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    const node = ref.current;
    if (!node) return;
    node.position.set(Math.cos(t) * radius, Math.sin(t * 0.6) * 0.7, Math.sin(t) * radius);
    node.rotation.x = t;
    node.rotation.y = t * 0.7;
  });
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[size, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} roughness={0.3} />
    </mesh>
  );
}

function Scene({ reducedMotion }) {
  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight position={[4, 3, 4]} intensity={45} color="#8b6fff" />
      <pointLight position={[-4, -2, -3]} intensity={28} color="#2e5eff" />

      <ParallaxRig>
        <Crystal />
        {!reducedMotion && (
          <>
            <OrbitNode radius={2.6} speed={0.35} size={0.16} color="#8b6fff" offset={0} />
            <OrbitNode radius={2.1} speed={0.5} size={0.11} color="#f0a93e" offset={2} />
            <OrbitNode radius={3.1} speed={0.25} size={0.13} color="#7c93ff" offset={4} />
          </>
        )}
      </ParallaxRig>

      {!reducedMotion && (
        <Sparkles count={40} scale={6} size={1.4} speed={0.25} color="#7c93ff" opacity={0.5} />
      )}
    </>
  );
}

export default function Scene3D() {
  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6.5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <Scene reducedMotion={reducedMotion} />
        {!reducedMotion && (
          <EffectComposer>
            <Bloom intensity={0.55} luminanceThreshold={0.2} luminanceSmoothing={0.9} mipmapBlur />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  );
}
