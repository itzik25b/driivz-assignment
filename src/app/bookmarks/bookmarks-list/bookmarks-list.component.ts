import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {fromEvent} from "rxjs";
import {Bookmark} from "../../store/bookmarks/bookmark.model";
import {Store} from "@ngrx/store";
import {selectBookmarksList} from "../../store/bookmarks/bookmarks.selectors";
import {BookmarkFocused, BookmarkRemoved} from "../../store/bookmarks/bookmarks.actions";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";

@Component({
  selector: 'app-bookmarks-list',
  templateUrl: './bookmarks-list.component.html',
  styleUrls: ['./bookmarks-list.component.scss']
})
export class BookmarksListComponent implements OnInit {
  bookmarks$ = this.bookmarksStore.select(selectBookmarksList);
  selectedBookmarkId: string | null = null;
  @ViewChild('searchInput', {static: true}) searchInput!: ElementRef;

  constructor(private bookmarksStore: Store<Bookmark>) {
  }

  ngOnInit(): void {
    this.registerFilterChanges();
  }

  private registerFilterChanges() {
    fromEvent(this.searchInput.nativeElement, 'input').pipe(
      map((event: any) => event.target.value),
      debounceTime(300),
      distinctUntilChanged(),
      //for bonus part to cancel a call if a new on is triggered i'd use the switchMap operator in here
    ).subscribe((value: string) => this.bookmarks$ = this.bookmarksStore.select(selectBookmarksList).pipe(
      map(bookmarks => bookmarks.filter((item: Bookmark) => item.id.indexOf(value) > -1))
    ));
  }

  toggleSelectedItem(item: Bookmark) {
    if (this.selectedBookmarkId && item.id === this.selectedBookmarkId) {
      this.selectedBookmarkId = null;
      this.bookmarksStore.dispatch(BookmarkFocused({id: null}));
    } else {
      this.selectedBookmarkId = item.id;
      this.bookmarksStore.dispatch(BookmarkFocused({id: item.id}));
    }
  }

  removeItem(bookmark: Bookmark) {
    this.bookmarksStore.dispatch(BookmarkRemoved({id: bookmark.id}))
  }
}
