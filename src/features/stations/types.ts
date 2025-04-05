export type APIStation = {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  streamUrl: string;
  reliability: number;
  popularity?: number;
  tags: string[];
};
