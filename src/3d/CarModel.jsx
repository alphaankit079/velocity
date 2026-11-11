
import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";

function CarModel() {
  const { scene } = useGLTF("/models/supercar.glb");

  useEffect(() => {
    console.log("===== VELOCITY CAR MATERIALS =====");

    scene.traverse((child) => {
      if (child.isMesh) {
        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material];

        materials.forEach((material) => {
          console.log({
            mesh: child.name,
            material: material.name,
            type: material.type,
          });
        });
      }
    });
  }, [scene]);

  return (
    <primitive
      object={scene}
      scale={1}
      position={[0, -0.8, 0]}
    />
  );
}

useGLTF.preload("/models/supercar.glb");

export default CarModel;
