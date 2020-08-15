import {Injectable} from '@angular/core';
import {Member, TalkState} from './Member';

@Injectable({
  providedIn: 'root'
})
export class MemberShufflerService {

  constructor() {
  }

  initializeMembers(): Member[] {
    const members: Member[] =
      [
        {name: 'Jolanda', talkState: TalkState.Waiting, id: 1},
        {name: 'Noah', talkState: TalkState.Waiting, id: 2},
        {name: 'Sebastian', talkState: TalkState.Waiting, id: 3},
        {name: 'Oli', talkState: TalkState.Waiting, id: 4},
        {name: 'Markus', talkState: TalkState.Waiting, id: 5},
      ];
    return members;
  }

  getRandomNumber(x: number): number {
    // use this when first determine random next member
    // let random = members[Math.floor(Math.random() * members.length)];
    return Math.floor(Math.random() * x);
  }

  getNextRound(members: Member[], nextActiveMember: number): Member[] {
    // set previous talking to has talked
    const indexCurrentlySpeaking = members.findIndex(value => value.talkState === TalkState.Talking);
    members[indexCurrentlySpeaking].talkState = TalkState.HasTalked;

// just take the next member which state is Waiting
    const waiting: TalkState = TalkState.Waiting;
    if (members[nextActiveMember].talkState !== waiting) {

      const nextTalkingMember = members.find(value => value.talkState === TalkState.Waiting);

      const fubb: Member[] = members.map(value => {
        if (value === nextTalkingMember) {
          value.talkState = TalkState.Talking;
          return value;
        }
      });

      return members;
    }
// next member is waiting
    members[nextActiveMember].talkState = TalkState.Talking;
    return members;
  }
}
