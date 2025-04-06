export type PlayerState = {
  status: PlayerStatus;
  error?: string | null;
  duration: number;
  currentTime: number;
  seekable?: boolean;
};

export type PlayerStatus = "loading" | "playing" | "paused" | "error";
