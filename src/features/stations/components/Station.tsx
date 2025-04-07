import React from "react";
import { APIStation } from "../types";
import { Link } from "@tanstack/react-router";

type StationProps = {
  data: APIStation;
};

export const Station: React.FC<StationProps> = ({ data }) => {
  return (
    <Link
      to="/stations/$stationID"
      params={{ stationID: data.id }}
      className="h-auto w-64 p-3 rounded-xl bg-white/5"
      data-testid="station"
    >
      <div className="w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center bg-white/5">
        <img
          src={data.imgUrl}
          alt={`${data.name} Thumbnail`}
          className="w-full"
          data-testid="station-thumbnail"
        />
      </div>

      <header className="mt-3 text-sm" data-testid="station-header">
        <h3 className="font-semibold text-white" data-testid="station-name">
          {data.name}
        </h3>
        <p
          className="font-normal text-neutral-400 mt-1"
          data-testid="station-description"
        >
          {data.description}
        </p>
      </header>
    </Link>
  );
};
