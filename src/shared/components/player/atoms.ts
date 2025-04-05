import { atomWithStorage } from "jotai/utils";

export const volumeAtom = atomWithStorage<number>("volume", 50);
export const isMutedAtom = atomWithStorage<boolean>("is_muted", false);
