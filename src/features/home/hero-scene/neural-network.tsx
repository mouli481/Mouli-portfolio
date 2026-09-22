"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { AdditiveBlending, CanvasTexture, type Group } from "three";
import { buildNetworkGeometry } from "@/features/home/hero-scene/network-geometry";

const EASING = 0.045;
const HORIZONTAL_OFFSET = 1.6;

function createGlowTexture(): CanvasTexture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (context) {
    const gradient = context.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.25, "rgba(255,255,255,0.8)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
  }
  return new CanvasTexture(canvas);
}

export function NeuralNetwork() {
  const groupRef = useRef<Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const network = useMemo(() => buildNetworkGeometry(), []);
  const glowTexture = useMemo(createGlowTexture, []);

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  useEffect(() => () => glowTexture.dispose(), [glowTexture]);

  useFrame((_state, delta) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }
    group.rotation.y += delta * 0.04 + (pointer.current.x * 0.35 - group.rotation.y) * EASING * 0.2;
    group.rotation.x += (pointer.current.y * 0.25 - group.rotation.x) * EASING;
    group.position.x += (HORIZONTAL_OFFSET + pointer.current.x * 0.35 - group.position.x) * EASING;
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[network.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[network.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          map={glowTexture}
          vertexColors
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
          sizeAttenuation
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[network.linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.16}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}
