import { APIResponse } from "@models/APIResponse";
import { APIStation } from "@features/stations/types";

export const fetchStations = () => {
  return fetch(
    "https://s3-us-west-1.amazonaws.com/cdn-web.tunein.com/stations.json"
  ).then((res) => res.json() as Promise<APIResponse<APIStation[]>>);
};
