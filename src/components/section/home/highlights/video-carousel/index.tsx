import { pauseImg, playImg, replayImg } from "@/lib/assets/images";
import { HIGHLIGHTS_SLIDE } from "@/lib/constant";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React from "react";
import { ScrollTrigger } from "gsap/all";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel: React.FC = () => {
  const videoRef = React.useRef<any[]>([]);
  const videoSpanRef = React.useRef<any[]>([]);
  const videoDivRef = React.useRef<any[]>([]);

  const [video, setVideo] = React.useState<StateVideo>({
    isEnd: false,
    startPlay: false,
    id: 0,
    isLast: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = React.useState<any[]>([]);

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * video.id}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((prev) => ({ ...prev, startPlay: true, isPlaying: true }));
      },
    });
  }, [video.id, video.isEnd]);

  React.useEffect(() => {
    if (loadedData.length > 3) {
      if (!video.isPlaying) {
        videoRef.current[video.id].pause();
      } else {
        video.startPlay && videoRef.current[video.id].play();
      }
    }
  }, [video.startPlay, video.id, video.isPlaying, loadedData]);

  React.useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[video.id]) {
      let anim = gsap.to(span[video.id], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);

          if (progress !== currentProgress) {
            currentProgress = progress;

            gsap.to(videoDivRef.current[video.id], {
              width:
                window.innerWidth < 760
                  ? "10vw"
                  : window.innerWidth < 1200
                  ? "10vw"
                  : "4vw",
            });

            gsap.to(span[video.id], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },
        onComplete: () => {
          if (video.isPlaying) {
            gsap.to(videoDivRef.current[video.id], {
              width: "12px",
            });

            gsap.to(span[video.id], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (video.id === 0) {
        anim.restart();
      }

      const animUpdate = () => {
        anim.progress(
          videoRef.current[video.id]?.currentTime! /
            HIGHLIGHTS_SLIDE[video.id].videoDuration
        );
      };

      if (video.isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [video.id, video.isPlaying, video.startPlay]);

  const handleLoadedMetadata = (index: number, event: any) =>
    setLoadedData((prev) => [...prev, event]);

  const handleProcess = (type: ParamVideoAction, index?: number) => {
    switch (type) {
      case "video-end":
        if (index)
          setVideo((prev) => ({ ...prev, isEnd: true, id: index + 1 }));
        break;

      case "video-last":
        setVideo((prev) => ({ ...prev, isLast: true }));
        break;

      case "video-reset":
        setVideo((prev) => ({ ...prev, isLast: false, id: 0 }));
        break;

      case "pause":
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;

      case "play":
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;

      default:
        return video;
    }
  };

  return (
    <>
      <div className="flex items-center">
        {HIGHLIGHTS_SLIDE.map((item, index) => (
          <div
            id="slider"
            className="sm:pr-20 pr-10"
            key={`${index}__video__highlight`}
          >
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  playsInline
                  preload="auto"
                  muted
                  // className={clsx("pointer-events-none", {
                  //   "translate-x-44": item.id === 2,
                  // })}
                  ref={(element) => {
                    videoRef.current[index] = element;
                  }}
                  onEnded={() => {
                    index !== 3
                      ? handleProcess("video-end", index)
                      : handleProcess("video-last");
                  }}
                  onPlay={() => {
                    setVideo((prev) => ({ ...prev, isPlaying: true }));
                  }}
                  onLoadedMetadataCapture={(event) => {
                    console.log({ event });
                    handleLoadedMetadata(index, event);
                  }}
                >
                  <source src={item.video} type="video/mp4" />
                </video>
              </div>

              <div className="absolute top-12  left-[5%] z-10">
                {item.textLists.map((text, index) => (
                  <p
                    className="md:text-2xl text-lg font-medium"
                    key={`${index}__text__video`}
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, index) => (
            <span
              key={`${index}__video__control`}
              ref={(element) => {
                videoDivRef.current[index] = element;
              }}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
            >
              <span
                ref={(element) => {
                  videoSpanRef.current[index] = element;
                }}
                className="absolute h-full w-full rounded-full"
              />
            </span>
          ))}
        </div>

        <button className="control-btn">
          <Image
            src={
              video.isLast ? replayImg : !video.isPlaying ? playImg : pauseImg
            }
            alt={video.isLast ? "replay" : !video.isPlaying ? "play" : "pause"}
            onClick={
              video.isLast
                ? () => handleProcess("video-reset")
                : !video.isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
