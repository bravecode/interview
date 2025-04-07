import React from "react";
import { PlayerProgress } from "./PlayerProgress";
import { PlayerNavigation } from "./PlayerNavigation";
import { PlayerVolume } from "./PlayerVolume";
import { PlayerError } from "./PlayerError";
import { Spinner } from "@components/spinner";
import { APIStation } from "@features/stations/types";
import { usePlayer } from "./usePlayer";

type PlayerProps = {
  data: APIStation;
};

export const Player: React.FC<PlayerProps> = ({ data }) => {
  const { playerState, audio } = usePlayer({ data });

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
    <section
      className="h-auto w-80 rounded-xl bg-white/5 p-6"
      data-testid="player"
    >
      <div className="h-full aspect-square rounded-xl overflow-hidden flex items-center justify-center bg-white/5">
        <img
          src={data.imgUrl}
          alt={`${data.name} Thumbnail`}
          className="w-full"
          data-testid="player-thumbnail"
        />
      </div>

      <header className="mt-6 text-sm" data-testid="player-header">
        <h1 className="font-semibold text-white" data-testid="player-title">
          {data.name}
        </h1>
        <p
          className="font-normal text-neutral-400 mt-1"
          data-testid="player-description"
        >
          {data.description}
        </p>
      </header>

      <PlayerProgress
        audio={audio}
        currentTime={playerState.currentTime}
        duration={playerState.duration}
        disabled={!playerState.duration}
      />

      <PlayerNavigation
        audio={audio}
        stationID={data.id}
        status={playerState.status}
      />

      <PlayerVolume audio={audio} />
    </section>
  );
};
