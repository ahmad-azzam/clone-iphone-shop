import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  View,
} from "@react-three/drei";
import clsx from "clsx";
import { StaticImageData } from "next/image";
import React from "react";
import * as THREE from "three";
import Light from "../light";
import Iphone from "../iphone";
import { extend } from "@react-three/fiber";

// extend({ OrbitControls, PerspectiveCamera, View });

type ModelViewProps = {
  index: number;
  groupRef: React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>;
  gsapType: string;
  controlRef: React.MutableRefObject<any>;
  setRotationState: React.Dispatch<React.SetStateAction<number>>;
  item: {
    title: string;
    color: string[];
    img: StaticImageData;
  };
  size: string;
};

const ModelView: React.FC<ModelViewProps> = ({
  controlRef,
  groupRef,
  gsapType,
  index,
  item,
  setRotationState,
  size,
}) => {
  const [ref, setRef] = React.useState<any>();

  React.useEffect(() => {
    if (controlRef) {
      setRef(controlRef);
    }
  }, [controlRef]);

  return (
    <View
      id={gsapType}
      index={index}
      className={clsx(
        "w-full h-full absolute",
        index === 2 ? "right-[-100%]" : ""
      )}
    >
      <ambientLight intensity={10} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Light />

      <OrbitControls
        makeDefault
        ref={ref}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => {
          setRotationState(ref.current.getAzimuthalAngle());
        }}
      />

      <group
        ref={groupRef}
        name={`${index === 1 ? "small" : "large"}`}
        position={[0, 0, 0]}
      >
        <React.Suspense
          fallback={
            <Html>
              <div>Loading...</div>
            </Html>
          }
        >
          <Iphone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </React.Suspense>
      </group>
    </View>
  );
};

export default ModelView;
