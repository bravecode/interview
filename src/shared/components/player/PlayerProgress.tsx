import React from "react";
import * as Slider from "@radix-ui/react-slider";
import { formatPlayerTime } from "@utils/formatPlayerTime";
import { useSeek } from "./useSeek";

type PlayerProgressProps = {
  audio: HTMLAudioElement;
  currentTime: number;
  duration: number;
  disabled?: boolean;
};

export const PlayerProgress: React.FC<PlayerProgressProps> = ({
  audio,
  currentTime,
  duration,
  disabled,
}) => {
  const { canSeek, seekTo } = useSeek({ audio });

  const handleValueChange = (values: number[]) => {
    seekTo(values[0]);
  };

  return (
    <div
      className="mt-6 flex flex-col gap-2"
      data-testid="progress-control-container"
    >
      <Slider.Root
        value={[currentTime]}
        min={0}
        max={duration}
        onValueChange={handleValueChange}
        disabled={disabled || !canSeek}
        className="block h-1.5 w-full relative"
        data-testid="progress-control"
      >
        <Slider.Track
          className="inline-block h-1.5 w-full bg-neutral-400 rounded-full absolute overflow-hidden"
          data-testid="progress-control-track"
        >
          <Slider.Range
            className="inline-block h-1.5 bg-white rounded-l-full absolute"
            data-testid="progress-control-range"
          />
        </Slider.Track>
        <Slider.Thumb data-testid="progress-control-thumb" />
      </Slider.Root>

      <div
        className="text-neutral-400 flex items-center justify-between font-semibold text-xs"
        data-testid="progress-control-times"
      >
        <span data-testid="progress-control-current-time">
          {formatPlayerTime(currentTime)}
        </span>
        {canSeek ? (
          <span data-testid="progress-control-duration">
            {formatPlayerTime(duration)}
          </span>
        ) : null}
      </div>
    </div>
  );
};
