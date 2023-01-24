export type Essays = {
  id: string;
  type: "issue" | "argument";
  prompt: string;
  answer?: string;
  startTime?: number;
  submitTime?: number;
  instructions: string;
}[];

export type Active = {
  id: string;
  answer: string;
  startTime: number;
};

export type AppState = {
  select: string | null;
  active: Active | null;
  essays: Essays;
};
