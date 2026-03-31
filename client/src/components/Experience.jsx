import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, ContactShadows, Environment } from "@react-three/drei";

// 1. The Morphing Blob Component
function MorphingBlob({ status }) {
  const mesh = useRef();
  
  // Colors for different AI states
  const colors = {
    idle: "#1a1a2e",
    thinking: "#00f2ff",
    talking: "#7000ff"
  };

  useFrame((state) => {
    const scrollY = window.scrollY;
  // This makes the blob drift up or down as the user scrolls the page
  mesh.current.position.y = -scrollY * 0.002;
  // This makes it spin faster as you scroll
  mesh.current.rotation.z = scrollY * 0.001;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={mesh} scale={1.8}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={colors[status] || colors.idle}
          speed={status === "thinking" ? 5 : 1.5}
          distort={status === "thinking" ? 0.6 : 0.4}
          radius={1}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

// 2. The Main Experience Component
export default function Experience({ status }) {
  return (
    <>
      {/* NOISE OVERLAY - The "Loris" Secret */}
      <div className="fixed inset-0 pointer-events-none z-[-5] opacity-[0.05] contrast-150 brightness-150 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* 3D CANVAS */}
      <div className="fixed inset-0 -z-10 w-full h-full bg-[#020205]">
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#7000ff" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#00f2ff" />
          
          <Suspense fallback={null}>
            <MorphingBlob status={status} />
            <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4} />
            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>

      {/* VIGNETTE EFFECT */}
      <div className="fixed inset-0 pointer-events-none z-[-5] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
    </>
  );
}