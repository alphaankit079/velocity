
import { Suspense, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  OrbitControls,
  Stage,
} from "@react-three/drei";

import CarModel from "./CarModel";

// Responsive Camera
function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    if (size.width < 640) {
      camera.position.set(5.2, 2.5, 6.5);
      camera.fov = 45;
    } else if (size.width < 1024) {
      camera.position.set(4.5, 2.2, 5.8);
      camera.fov = 42;
    } else {
      camera.position.set(4, 2, 5);
      camera.fov = 40;
    }

    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera, size.width]);

  return null;
}

function Showroom() {
  return (
    <>
      <Environment preset="city" />

      <ambientLight intensity={0.35} />

      <spotLight
        position={[5, 8, 5]}
        angle={0.5}
        penumbra={1}
        intensity={100}
        castShadow
      />

      <pointLight
        position={[-4, 2, -2]}
        color="#e51b23"
        intensity={35}
        distance={12}
      />

      <pointLight
        position={[3, 1, 5]}
        color="#ffffff"
        intensity={15}
        distance={10}
      />

      <ContactShadows
        position={[0, -0.8, 0]}
        opacity={0.65}
        scale={12}
        blur={2.5}
        far={4}
      />

      <Suspense fallback={null}>
        <Stage
          environment="city"
          intensity={0.6}
          adjustCamera={false}
        >
          <CarModel />
        </Stage>
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={9}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.7}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </>
  );
}

function CarScene() {
  return (
    <div className="h-90 w-full overflow-hidden bg-[#050505] sm:h-107.5 md:h-125 lg:h-137.5">
      <Canvas
        shadows
        camera={{ position: [4, 2, 5], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 8, 20]} />

        <ResponsiveCamera />
        <Showroom />
      </Canvas>
    </div>
  );
}

export default CarScene;
