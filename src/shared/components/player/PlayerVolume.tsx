import React from "react";
import * as Slider from "@radix-ui/react-slider";
import { FaVolumeLow } from "react-icons/fa6";
import { useAtom } from "jotai";
import { volumeAtom } from "./atoms";

export const PlayerVolume: React.FC = () => {
  const [volume, setVolume] = useAtom(volumeAtom);

  const handleVolumeChange = (values: number[]) => {
    setVolume(values[0]);
  };

  return (
    <div className="flex gap-2 items-center">
      <Slider.Root
        min={1}
        max={100}
        onValueChange={handleVolumeChange}
        className="h-6 w-full relative flex-1 flex items-center"
        value={[volume]}
      >
        <Slider.Track className="inline-block h-1.5 w-full bg-neutral-400 rounded-full absolute overflow-hidden">
          <Slider.Range className="inline-block h-1.5 bg-white rounded-l-full absolute" />
        </Slider.Track>
        <Slider.Thumb className="h-6 w-6 bg-white rounded-full flex items-center justify-center text-[10px]">
          <FaVolumeLow />
        </Slider.Thumb>
      </Slider.Root>
    </div>
  );
};
