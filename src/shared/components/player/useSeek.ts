// How many seconds should we seek on forward / backward
const SEEK_VALUE: number = 10;

type UseSeekProps = {
  audio: HTMLAudioElement;
};

type UseSeekResult = {
  canSeek: boolean;
  seekTo: (value: number) => void;
  seekBackward: () => void;
  seekForward: () => void;
};

export const useSeek = ({ audio }: UseSeekProps): UseSeekResult => {
  const seekTo = (time: number) => {
    const bufferedEnd =
      audio.buffered.length > 0
        ? audio.buffered.end(audio.buffered.length - 1)
        : 0;

    const newTime = Math.max(0, Math.min(time, bufferedEnd));
    audio.currentTime = newTime;
  };

  const seekBackward = () => {
    const newTime = Math.max(0, audio.currentTime - SEEK_VALUE);
    seekTo(newTime);
  };

  const seekForward = () => {
    const bufferedEnd =
      audio.buffered.length > 0
        ? audio.buffered.end(audio.buffered.length - 1)
        : 0;
    const newTime = Math.min(bufferedEnd, audio.currentTime + SEEK_VALUE);
    seekTo(newTime);
  };

  return {
    canSeek: !!audio.seekable.length,
    seekTo,
    seekBackward,
    seekForward,
  };
};
