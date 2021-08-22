import { Component, OnInit } from '@angular/core';
import {selectBookmarksList} from "../../store/bookmarks/bookmarks.selectors";
import {Store} from "@ngrx/store";
import {Bookmark} from "../../store/bookmarks/bookmark.model";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  bookmarks$ = this.bookmarksStore.select(selectBookmarksList);

  constructor(private bookmarksStore: Store<Bookmark>) { }

  ngOnInit(): void {
    this.bookmarks$ = this.bookmarksStore.select(selectBookmarksList);
  }

}
