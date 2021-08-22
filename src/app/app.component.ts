import { Component } from '@angular/core';
import {IssPosition} from "./store/iss-position/iss-position.model";
import {Store} from "@ngrx/store";
import {selectIssPosition} from "./store/iss-position/iss-position.selectors";
import {Bookmark} from "./store/bookmarks/bookmark.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  longitude: string = '';
  latitude: string = '';
  lastUpdate: Date = new Date();

  constructor(private issPositionStore: Store<IssPosition>) {
    issPositionStore.select(selectIssPosition).subscribe((state) => {
       this.latitude = state.iss_position.latitude;
       this.longitude = state.iss_position.longitude;
      this.lastUpdate = new Date(state.timestamp * 1000);
    })
  }
}
