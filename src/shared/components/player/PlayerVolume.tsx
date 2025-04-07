import React, { useEffect } from "react";
import * as Slider from "@radix-ui/react-slider";
import { FaVolumeLow } from "react-icons/fa6";
import { useAtom } from "jotai";
import { volumeAtom } from "./atoms";

type PlayerVolumeProps = {
  audio: HTMLAudioElement;
};

export const PlayerVolume: React.FC<PlayerVolumeProps> = ({ audio }) => {
  const [volume, setVolume] = useAtom(volumeAtom);

  const handleVolumeChange = (values: number[]) => {
    setVolume(values[0]);
  };

  useEffect(() => {
    audio.volume = Math.min(Math.max(volume / 100, 0), 1);
  }, [volume, audio]);

  return (
    <div
      className="flex gap-2 items-center"
      data-testid="volume-control-container"
    >
      <Slider.Root
        min={1}
        max={100}
        onValueChange={handleVolumeChange}
        className="h-6 w-full relative flex-1 flex items-center"
        value={[volume]}
        data-testid="volume-control"
      >
        <Slider.Track
          className="inline-block h-1.5 w-full bg-neutral-400 rounded-full absolute overflow-hidden"
          data-testid="volume-control-track"
        >
          <Slider.Range
            className="inline-block h-1.5 bg-white rounded-l-full absolute"
            data-testid="volume-control-range"
          />
        </Slider.Track>
        <Slider.Thumb
          className="h-6 w-6 bg-white rounded-full flex items-center justify-center text-[10px]"
          data-testid="volume-control-thumb"
        >
          <FaVolumeLow />
        </Slider.Thumb>
      </Slider.Root>
    </div>
  );
};
