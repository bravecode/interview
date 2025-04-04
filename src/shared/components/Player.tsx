import React, { useEffect, useRef, useState } from "react";

type PlayerProps = {
  stationThumbnail: string;
  stationName: string;
  stationStreamURL: string;
};

type PlayerState = {
  status: "playing" | "paused" | "error";
  error?: string | null;
};

export const Player: React.FC<PlayerProps> = ({
  stationName,
  stationStreamURL,
}) => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    status: "paused",
  });
  const audioRef = useRef<HTMLAudioElement>(new Audio());

  useEffect(() => {
    audioRef.current.src = stationStreamURL;
    audioRef.current.crossOrigin = "anonymous";

    const handlePlay = (): void => {
      setPlayerState({
        status: "playing",
        error: null,
      });
    };

    const handlePause = (): void => {
      setPlayerState({
        status: "paused",
        error: null,
      });
    };

    const handleError = (e: Event): void => {
      const audioElement = e.target as HTMLAudioElement;

      setPlayerState({
        status: "error",
        error: audioElement.error?.message || "Unknown error",
      });
    };

    const audioRefCopy = audioRef.current;

    audioRefCopy.addEventListener("playing", handlePlay);
    audioRefCopy.addEventListener("pause", handlePause);
    audioRefCopy.addEventListener("error", handleError);

    return () => {
      audioRefCopy.pause();
      audioRefCopy.removeEventListener("playing", handlePlay);
      audioRefCopy.removeEventListener("pause", handlePause);
      audioRefCopy.removeEventListener("error", handleError);
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

  return (
    <div>
      <div>
        {stationName} - {playerState.status}
      </div>
      <button onClick={handleToggle}>Toggle</button>
    </div>
  );
};
