import gsap from "gsap";
import * as THREE from "three";

type Props = {
  tl: gsap.core.Timeline;
  refGroup: React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>;
  rotation: number;
  id1: string;
  id2: string;
  option: {
    transform: string;
    duration: number;
  };
};

export const animateWithGsapTimeline = ({
  id1,
  id2,
  refGroup,
  rotation,
  tl,
  option,
}: Props) => {
  tl.to(refGroup.current.rotation, {
    y: rotation,
    duration: 1,
    ease: "power2.inOut",
  });

  tl.to(
    id1,
    {
      ...option,
      ease: "power2.inOut",
    },
    "<"
  );

  tl.to(
    id2,
    {
      ...option,
      ease: "power2.inOut",
    },
    "<"
  );
};
