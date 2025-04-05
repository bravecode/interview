import React from "react";
import * as Slider from "@radix-ui/react-slider";
import { formatPlayerTime } from "@utils/formatPlayerTime";

type PlayerProgressProps = {
  currentTime: number;
  duration: number;
  disabled?: boolean;
  onSeek: (value: number) => void;
};

export const PlayerProgress: React.FC<PlayerProgressProps> = ({
  currentTime,
  duration,
  disabled,
  onSeek,
}) => {
  const handleValueChange = (values: number[]) => {
    onSeek(values[0]);
  };

  return (
    <div className="mt-6 flex flex-col gap-2">
      <Slider.Root
        value={[currentTime]}
        min={0}
        max={duration}
        onValueChange={handleValueChange}
        disabled={disabled}
        className="block h-1.5 w-full relative"
      >
        <Slider.Track className="inline-block h-1.5 w-full bg-neutral-400 rounded-full absolute overflow-hidden">
          <Slider.Range className="inline-block h-1.5 bg-white rounded-l-full absolute" />
        </Slider.Track>
        <Slider.Thumb />
      </Slider.Root>

      <div className="text-neutral-400 flex items-center justify-between font-semibold text-xs">
        <span>{formatPlayerTime(currentTime)}</span>
        <span>{formatPlayerTime(duration)}</span>
      </div>
    </div>
  );
};
