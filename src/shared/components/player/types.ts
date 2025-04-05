export type PlayerState = {
  status: PlayerStatus;
  error?: string | null;
  duration: number;
  currentTime: number;
};

export type PlayerStatus = "playing" | "paused" | "error";
