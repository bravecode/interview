import { useEffect, useRef, useState } from "react";
import { PlayerState } from "./types";
import { APIStation } from "@features/stations/types";

type UsePlayerProps = {
  data: APIStation;
};

type UsePlayerResult = {
  playerState: PlayerState;
  audio: HTMLAudioElement;
};

export const usePlayer = ({ data }: UsePlayerProps): UsePlayerResult => {
  const audioRef = useRef<HTMLAudioElement>(new Audio());

  const [playerState, setPlayerState] = useState<PlayerState>({
    status: "loading",
    duration: 0,
    currentTime: 0,
  });

  useEffect(() => {
    audioRef.current.src = data.streamUrl;
    audioRef.current.crossOrigin = "anonymous";
  }, [data.streamUrl]);

  useEffect(() => {
    const audio = audioRef.current;

    audio.addEventListener("playing", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadstart", onLoadingStart);
    audio.addEventListener("canplay", onLoadingEnd);

    return () => {
      audio.pause();

      audio.removeEventListener("playing", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadstart", onLoadingStart);
      audio.removeEventListener("canplay", onLoadingEnd);

      audio.src = "";
      audio.removeAttribute("src");
    };
  }, []);

  // External Handlers
  // Internal Handlers
  const onPlay = () => {
    setPlayerState((prev) => ({
      ...prev,
      status: "playing",
      error: null,
    }));
  };

  const onPause = () => {
    setPlayerState((prev) => ({
      ...prev,
      status: "paused",
      error: null,
    }));
  };

  const onError = (e: Event): void => {
    const audioElement = e.target as HTMLAudioElement;

    setPlayerState((prev) => ({
      ...prev,
      status: "error",
      error: audioElement.error?.message || "Unknown error",
    }));
  };

  const onTimeUpdate = (): void => {
    const audio = audioRef.current;

    const buffered =
      audio.buffered.length > 0
        ? audio.buffered.end(audio.buffered.length - 1)
        : 0;

    setPlayerState((prev) => ({
      ...prev,
      currentTime: audio.currentTime,
      duration: buffered,
    }));
  };

  const onLoadingStart = (): void => {
    setPlayerState((prev) => ({
      ...prev,
      status: "loading",
    }));
  };

  const onLoadingEnd = (): void => {
    const audio = audioRef.current;

    setPlayerState((prev) => ({
      ...prev,
      status: "paused",
      seekable: !!audio.seekable.length,
    }));
  };

  return {
    playerState,
    audio: audioRef.current,
  };
};
