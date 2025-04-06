import React from "react";
import { MdOutlineErrorOutline } from "react-icons/md";

type PlayerErrorProps = {
  message: string;
};

export const PlayerError: React.FC<PlayerErrorProps> = ({ message }) => {
  return (
    <div className="h-auto w-80 rounded-xl bg-white/5 p-6 text-white flex flex-col gap-3 items-center">
      <MdOutlineErrorOutline className="text-[48px]" />
      <span className="text-sm">{message}</span>
    </div>
  );
};
