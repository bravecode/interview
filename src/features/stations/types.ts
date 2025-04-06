// Note: As for this task I will use directly APIStation type but it might be a good idea to separate API Type & UI Types by creating
// an abstraction layer and mappers. It introduces complexity in the application but ensures we as a FE Team have full control.
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
