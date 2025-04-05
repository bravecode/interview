import React from "react";
import { PlayerStatus } from "./types";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaVolumeXmark,
  FaRegHeart,
  FaVolumeLow,
} from "react-icons/fa6";
import { useAtom } from "jotai";
import { isMutedAtom } from "./atoms";

type PlayerNavigationProps = {
  status: PlayerStatus;
  onSeekForward: () => void;
  onSeekBackward: () => void;
  onToggle: () => void;
};

export const PlayerNavigation: React.FC<PlayerNavigationProps> = ({
  status,
  onSeekForward,
  onSeekBackward,
  onToggle,
}) => {
  const [isMuted, setIsMuted] = useAtom(isMutedAtom);

  const handleMuteToggle = () => {
    setIsMuted((prev) => !prev);
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
        onClick={onSeekBackward}
        className="cursor-pointer text-white text-[24px] hover:text-white/80"
      >
        <FaBackward />
      </button>
      <button
        onClick={onToggle}
        className="cursor-pointer text-white text-[36px] hover:text-white/80"
      >
        {status === "playing" ? <FaPause /> : <FaPlay />}
      </button>
      <button
        onClick={onSeekForward}
        className="cursor-pointer text-white text-[24px] hover:text-white/80"
      >
        <FaForward />
      </button>
      <button
        onClick={() => {}}
        className="cursor-pointer text-white text-[16px] hover:text-white/80"
      >
        <FaRegHeart />
      </button>
    </nav>
  );
};
