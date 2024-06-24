import gsap from "gsap";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

type PropsTimeline = {
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

type Props = {
  target: string;
  scrollProps?: ScrollTrigger.Vars | undefined;
  animationProps?: gsap.TweenVars;
};

export const animateWithGsapTimeline = ({
  id1,
  id2,
  refGroup,
  rotation,
  tl,
  option,
}: PropsTimeline) => {
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

export const animateWithGsap = ({
  animationProps,
  scrollProps,
  target,
}: Props) => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: "restart reverse restart reverse",
      start: "top 85%",
      ...scrollProps,
    },
  });
};
