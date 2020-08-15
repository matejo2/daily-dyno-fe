export interface Member {
  name: string;
  talkState: TalkState;
  id: number;
}

export enum TalkState {
  Waiting,
  Talking,
  HasTalked,
}
