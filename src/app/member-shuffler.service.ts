import {Injectable} from '@angular/core';
import {Member, TalkState} from './Member';

@Injectable({
  providedIn: 'root'
})
export class MemberShufflerService {

  constructor() {
  }

  initializeMembers(): Member[] {
    return [
      {name: 'Jo', talkState: TalkState.Waiting, id: 1},
      {name: 'No', talkState: TalkState.Waiting, id: 2},
      {name: 'Se', talkState: TalkState.Waiting, id: 3},
      {name: 'Ol', talkState: TalkState.Waiting, id: 4},
      {name: 'Ma', talkState: TalkState.Waiting, id: 5},
    ];
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

    // see if everyone has already talked
    if (members.every(value => value.talkState === TalkState.HasTalked)) {
      //  reset ever member to waiting
      members.map(value => value.talkState = TalkState.Waiting);
    }

// just take the next member which state is Waiting
    if (members[nextActiveMember].talkState !== TalkState.Waiting) {
      const nextTalkingMember = members.find(value => value.talkState === TalkState.Waiting);
      members.map(value => {
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
