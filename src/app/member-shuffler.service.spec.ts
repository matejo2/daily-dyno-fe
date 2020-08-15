import {TestBed} from '@angular/core/testing';

import {MemberShufflerService} from './member-shuffler.service';
import {Member, TalkState} from './Member';

describe('MemberShufflerService', () => {
  let service: MemberShufflerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberShufflerService);
  });

  it('should have members of a team', () => {
    const expectedMembers: Member[] =
      [
        {name: 'Jolanda', talkState: TalkState.Waiting, id: 1},
        {name: 'Noah', talkState: TalkState.Waiting, id: 2},
        {name: 'Sebastian', talkState: TalkState.Waiting, id: 3},
        {name: 'Oli', talkState: TalkState.Waiting, id: 4},
        {name: 'Markus', talkState: TalkState.Waiting, id: 5},
      ];
    const members = service.initializeMembers();
    expect(members.length).toBe(expectedMembers.length);
    expect(members).toEqual(expectedMembers);
  });

  it('should set next active member', () => {
    const startingMembers: Member[] =
      [
        {name: 'Jolanda', talkState: TalkState.Talking, id: 1},
        {name: 'Noah', talkState: TalkState.Waiting, id: 2},
        {name: 'Sebastian', talkState: TalkState.Waiting, id: 3},
        {name: 'Oli', talkState: TalkState.Waiting, id: 4},
        {name: 'Markus', talkState: TalkState.Waiting, id: 5},
      ];
    const nextMember = 1;

    const expectedMembers: Member[] =
      [
        {name: 'Jolanda', talkState: TalkState.HasTalked, id: 1},
        {name: 'Noah', talkState: TalkState.Talking, id: 2},
        {name: 'Sebastian', talkState: TalkState.Waiting, id: 3},
        {name: 'Oli', talkState: TalkState.Waiting, id: 4},
        {name: 'Markus', talkState: TalkState.Waiting, id: 5},
      ];

    const result = service.getNextRound(startingMembers, nextMember);
    expect(result).toEqual(expectedMembers);
  });

  it('should set next active member variation 1', () => {
    const startingMembers: Member[] =
      [
        {name: 'Jolanda', talkState: TalkState.Waiting, id: 1},
        {name: 'Noah', talkState: TalkState.Talking, id: 2},
        {name: 'Sebastian', talkState: TalkState.Waiting, id: 3}
      ];
    const nextMember = 2;

    const expectedMembers: Member[] =
      [
        {name: 'Jolanda', talkState: TalkState.Waiting, id: 1},
        {name: 'Noah', talkState: TalkState.HasTalked, id: 2},
        {name: 'Sebastian', talkState: TalkState.Talking, id: 3},
      ];

    const result = service.getNextRound(startingMembers, nextMember);
    expect(result).toEqual(expectedMembers);
  });

  it('should not set a HasTalked State to Talking, only Waiting State is allowed to Change to Talking', () => {
    const startingMembers: Member[] =
      [
        {name: 'Jolanda', talkState: TalkState.Talking, id: 0},
        {name: 'Noah', talkState: TalkState.HasTalked, id: 1},
        {name: 'Sebastian', talkState: TalkState.Waiting, id: 2}
      ];
    const nextMember = 1;

    const expectedMembers: Member[] =
      [
        {name: 'Jolanda', talkState: TalkState.HasTalked, id: 0},
        {name: 'Noah', talkState: TalkState.HasTalked, id: 1},
        {name: 'Sebastian', talkState: TalkState.Talking, id: 2}
      ];

    const result = service.getNextRound(startingMembers, nextMember);
    console.log('TalkState TEST:' + result[2].talkState.toString());
    expect(result).toEqual(expectedMembers);
  });

  it('should not set a HasTalked State to Talking, and gets the first that is waiting', () => {
    const startingMembers: Member[] =
      [
        {name: 'Jolanda', talkState: TalkState.Talking, id: 0},
        {name: 'Noah', talkState: TalkState.HasTalked, id: 1},
        {name: 'Sebastian', talkState: TalkState.Waiting, id: 2},
        {name: 'Maxo', talkState: TalkState.Waiting, id: 3}
      ];
    const nextMember = 1;

    const expectedMembers: Member[] =
      [
        {name: 'Jolanda', talkState: TalkState.HasTalked, id: 0},
        {name: 'Noah', talkState: TalkState.HasTalked, id: 1},
        {name: 'Sebastian', talkState: TalkState.Talking, id: 2},
        {name: 'Maxo', talkState: TalkState.Waiting, id: 3}
      ];

    const result = service.getNextRound(startingMembers, nextMember);
    console.log('TalkState TEST:' + result[2].talkState.toString());
    expect(result).toEqual(expectedMembers);
  });
});
