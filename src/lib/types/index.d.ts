declare type StateVideo = {
  isEnd: boolean;
  startPlay: boolean;
  id: number;
  isLast: boolean;
  isPlaying: boolean;
};

declare type ParamVideoAction =
  | "video-reset"
  | "video-end"
  | "video-last"
  | "play"
  | "pause";
