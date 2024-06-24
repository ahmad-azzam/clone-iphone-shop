"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";
import ModelView from "./view";
import { yellowImg } from "@/lib/assets/images";
import * as THREE from "three";
import { Canvas, extend } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { MODELS, SIZES } from "@/lib/constant";
import { animateWithGsapTimeline } from "@/lib/utils/animation";

extend({ View });

const Model: React.FC = () => {
  const [size, setSize] = React.useState("small");
  const [model, setModel] = React.useState({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8f8a81", "#ffe7B9", "#6f6c64"],
    img: yellowImg,
  });
  const [smallRotation, setSmallRotation] = React.useState(0);
  const [largeRotation, setLargeRotation] = React.useState(0);

  const cameraControlSmall = React.useRef();
  const cameraControlLarge = React.useRef();

  const small = React.useRef(new THREE.Group());
  const large = React.useRef(new THREE.Group());

  const tl = gsap.timeline();

  React.useEffect(() => {
    if (size === "large") {
      animateWithGsapTimeline({
        id1: "#view1",
        id2: "#view2",
        refGroup: small,
        rotation: smallRotation,
        tl,
        option: {
          duration: 2,
          transform: "translateX(-100%)",
        },
      });
    }
    if (size === "small") {
      animateWithGsapTimeline({
        id1: "#view2",
        id2: "#view1",
        refGroup: large,
        rotation: largeRotation,
        tl,
        option: {
          duration: 2,
          transform: "translateX(0)",
        },
      });
    }
  }, [size]);

  useGSAP(() => {
    gsap.to("#heading", {
      y: 0,
      opacity: 1,
    });
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look.
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />
            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />

            <Canvas
              className="w-full h-full"
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
              }}
              eventSource={document.getElementById("root")!}
            >
              <View.Port />
            </Canvas>
          </div>

          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>
            <div className="flex-center">
              <ul className="color-container">
                {MODELS.map((item, index) => (
                  <li
                    className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                    style={{ backgroundColor: item.color[0] }}
                    key={`${index}__color__model`}
                    onClick={() => setModel(item)}
                  />
                ))}
              </ul>

              <button className="size-btn-container">
                {SIZES.map((item, index) => (
                  <span
                    key={`${index}__button__size`}
                    onClick={() => setSize(item.value)}
                    className="size-btn"
                    style={{
                      backgroundColor:
                        size === item.value ? "white" : "transparent",
                      color: size === item.value ? "black" : "white",
                    }}
                  >
                    {item.label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
