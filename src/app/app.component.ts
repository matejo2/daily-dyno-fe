import { Component } from '@angular/core';
import {MemberShufflerService} from './member-shuffler.service';
import {Member} from './Member';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'daily-dyno-frontend';
  members: Member[];

  constructor(private memberShufflerService: MemberShufflerService) {
    this.members = memberShufflerService.initializeMembers();
  }


}
