import React, { useEffect } from "react";
import { PlayerStatus } from "./types";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaVolumeXmark,
  FaVolumeLow,
} from "react-icons/fa6";
import { useAtom } from "jotai";
import { isMutedAtom } from "./atoms";
import { StationFavorite } from "@features/stations/components/StationFavorite";
import { useSeek } from "./useSeek";

type PlayerNavigationProps = {
  audio: HTMLAudioElement;
  stationID: string;
  status: PlayerStatus;
};

export const PlayerNavigation: React.FC<PlayerNavigationProps> = ({
  audio,
  stationID,
  status,
}) => {
  const [isMuted, setIsMuted] = useAtom(isMutedAtom);

  const handleMuteToggle = () => {
    setIsMuted((prev) => !prev);
  };

  useEffect(() => {
    audio.muted = isMuted;
  }, [isMuted, audio]);

  const { canSeek, seekBackward, seekForward } = useSeek({ audio });

  const handleToggle = () => {
    if (status === "error" || status === "loading") {
      return;
    }

    if (status === "playing") {
      audio.pause();

      return;
    }

    audio.play();
  };

  return (
    <nav className="w-full flex items-center justify-center gap-6 py-6 my-6 border-t border-b border-solid border-white/5">
      <button
        onClick={handleMuteToggle}
        className="cursor-pointer text-white text-[16px] hover:text-white/80"
      >
        {isMuted ? <FaVolumeXmark /> : <FaVolumeLow />}
      </button>
      <button
        onClick={seekBackward}
        className="cursor-pointer text-white text-[24px] hover:text-white/80 disabled:text-neutral-600"
        disabled={!canSeek}
      >
        <FaBackward />
      </button>
      <button
        onClick={handleToggle}
        className="cursor-pointer text-white text-[36px] hover:text-white/80 disabled:text-neutral-600"
        disabled={status === "loading" || status === "error"}
      >
        {status === "playing" ? <FaPause /> : <FaPlay />}
      </button>
      <button
        onClick={seekForward}
        className="cursor-pointer text-white text-[24px] hover:text-white/80 disabled:text-neutral-600"
        disabled={!canSeek}
      >
        <FaForward />
      </button>
      <StationFavorite stationID={stationID} />
    </nav>
  );
};
