import React, { useEffect, useRef, useState } from "react";
import { PlayerProgress } from "./PlayerProgress";
import { PlayerState } from "./types";
import { PlayerNavigation } from "./PlayerNavigation";
import { PlayerVolume } from "./PlayerVolume";
import { useAtomValue } from "jotai";
import { isMutedAtom, volumeAtom } from "./atoms";
import { PlayerError } from "./PlayerError";
import { Spinner } from "@components/spinner";

type PlayerProps = {
  stationID: string;
  stationThumbnail: string;
  stationName: string;
  stationDescription: string;
  stationStreamURL: string;
};

export const Player: React.FC<PlayerProps> = ({
  stationID,
  stationThumbnail,
  stationName,
  stationDescription,
  stationStreamURL,
}) => {
  const volume = useAtomValue(volumeAtom);
  const isMuted = useAtomValue(isMutedAtom);
  const [playerState, setPlayerState] = useState<PlayerState>({
    status: "loading",
    duration: 0,
    currentTime: 0,
  });
  const audioRef = useRef<HTMLAudioElement>(new Audio());

  useEffect(() => {
    audioRef.current.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    audioRef.current.volume = Math.min(Math.max(volume / 100, 0), 1);
  }, [volume]);

  useEffect(() => {
    audioRef.current.src = stationStreamURL;
    audioRef.current.crossOrigin = "anonymous";

    const handlePlay = (): void => {
      setPlayerState((prev) => ({
        ...prev,
        status: "playing",
        error: null,
      }));
    };

    const handlePause = (): void => {
      setPlayerState((prev) => ({
        ...prev,
        status: "paused",
        error: null,
      }));
    };

    const handleError = (e: Event): void => {
      const audioElement = e.target as HTMLAudioElement;

      setPlayerState((prev) => ({
        ...prev,
        status: "error",
        error: audioElement.error?.message || "Unknown error",
      }));
    };

    const handleTimeUpdate = (): void => {
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

    const handleLoadingStart = (): void => {
      setPlayerState((prev) => ({
        ...prev,
        status: "loading",
      }));
    };

    const handleLoadingEnd = (): void => {
      const audio = audioRef.current;

      setPlayerState((prev) => ({
        ...prev,
        status: "paused",
        seekable: !!audio.seekable.length,
      }));
    };

    const audio = audioRef.current;

    audio.addEventListener("playing", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadstart", handleLoadingStart);
    audio.addEventListener("canplay", handleLoadingEnd);

    return () => {
      audio.pause();

      audio.removeEventListener("playing", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadstart", handleLoadingStart);
      audio.removeEventListener("canplay", handleLoadingEnd);

      audio.src = "";
      audio.removeAttribute("src");
    };
  }, [stationStreamURL]);

  const handleToggle = (): void => {
    if (playerState.status === "error") {
      return;
    }

    if (playerState.status === "playing") {
      audioRef.current.pause();

      setPlayerState((prev) => {
        return {
          ...prev,
          status: "paused",
        };
      });

      return;
    }

    audioRef.current.play();

    setPlayerState((prev) => {
      return {
        ...prev,
        status: "playing",
      };
    });
  };

  const seekTo = (time: number): void => {
    const audio = audioRef.current;
    const bufferedEnd =
      audio.buffered.length > 0
        ? audio.buffered.end(audio.buffered.length - 1)
        : 0;

    const newTime = Math.max(0, Math.min(time, bufferedEnd));

    audio.currentTime = newTime;
    setPlayerState((prev) => ({
      ...prev,
      currentTime: newTime,
    }));
  };

  const handleSeekBackward = (): void => {
    const newTime = Math.max(0, audioRef.current.currentTime - 10);
    seekTo(newTime);
  };

  const handleSeekForward = (): void => {
    const audio = audioRef.current;
    const bufferedEnd =
      audio.buffered.length > 0
        ? audio.buffered.end(audio.buffered.length - 1)
        : 0;
    const newTime = Math.min(bufferedEnd, audio.currentTime + 10);
    seekTo(newTime);
  };

  if (playerState.status === "loading") {
    return (
      <section className="h-80 w-80 rounded-xl bg-white/5 p-6 flex items-center justify-center">
        <Spinner />
      </section>
    );
  }

  if (playerState.status === "error" && !!playerState.error) {
    return <PlayerError message={playerState.error} />;
  }

  return (
    <section className="h-auto w-80 rounded-xl bg-white/5 p-6">
      <div className="h-full aspect-square rounded-xl overflow-hidden flex items-center justify-center bg-white/5">
        <img
          src={stationThumbnail}
          alt={`${stationName} Thumbnail Image`}
          className="w-full"
        />
      </div>

      <header className="mt-6 text-sm">
        <h1 className="font-semibold text-white">{stationName}</h1>
        <p className="font-normal text-neutral-400 mt-1">
          {stationDescription}
        </p>
      </header>

      <PlayerProgress
        currentTime={playerState.currentTime}
        duration={playerState.duration}
        onSeek={seekTo}
        seekable={playerState.seekable}
        disabled={!playerState.duration}
      />

      <PlayerNavigation
        stationID={stationID}
        status={playerState.status}
        onSeekBackward={handleSeekBackward}
        onSeekForward={handleSeekForward}
        onToggle={handleToggle}
      />

      <PlayerVolume />
    </section>
  );
};
