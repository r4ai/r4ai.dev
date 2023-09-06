import type { Mesh } from "three";
import { Suspense, type FC, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as Drei from "@react-three/drei";

interface Props {}

const Cube: FC = () => {
  const meshRef = useRef<Mesh>(null!);

  useFrame((_, delta) => {
    meshRef.current.rotation.x += delta / 1.5;
    meshRef.current.rotation.y += delta / 1.5;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial wireframe color="gray" />
    </mesh>
  );
};

export const CubeCanvas: FC<Props> = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Canvas>
        <Drei.PerspectiveCamera makeDefault position={[0, 0, 3]} />
        <Drei.OrbitControls enablePan enableZoom enableRotate />
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 0]} />
        <Cube />
      </Canvas>
    </Suspense>
  );
};
