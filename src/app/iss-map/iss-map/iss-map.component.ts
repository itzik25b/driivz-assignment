import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, of, Subject, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {catchError, map, repeatWhen, take, takeUntil} from "rxjs/operators";
import {GoogleMapsService} from "../services/google-maps.service";
import {select, Store} from "@ngrx/store";
import {IssService} from "../services/iss.service";
import {UpdateIssPosition} from "../../store/iss-position/iss-position.actions";
import {IssPosition} from "../../store/iss-position/iss-position.model";
import {BookmarkAdded} from "../../store/bookmarks/bookmarks.actions";
import {Bookmark} from "../../store/bookmarks/bookmark.model";
import {selectBookmarkFocused, selectBookmarksList} from "../../store/bookmarks/bookmarks.selectors";

const DEFAULT_ZOOM_LEVEL = 4;

@Component({
  selector: 'app-iss-map',
  templateUrl: './iss-map.component.html',
  styleUrls: ['./iss-map.component.scss']
})
export class IssMapComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  apiLoaded: Observable<boolean> = of(false);
  center: any = {lat: 0, lng: 0};
  zoom: number = DEFAULT_ZOOM_LEVEL;
  stopPlay$: Subject<any> = new Subject();
  resumePlay$: Subject<any> = new Subject();

  constructor(private httpClient: HttpClient,
              private googleMapsService: GoogleMapsService,
              private issService: IssService,
              private issPositionStore: Store<IssPosition>,
              private bookmarksStore: Store<Bookmark>) {
  }

  ngOnInit(): void {
    this.apiLoaded = this.googleMapsService.registerGoogleMapsApi().pipe(
      map(() => {
        this.initIssPosition();
        this.registerBookmarksFocus();
        return true;
      }),
      catchError(() => of(false)),
    );
  }

  private static promptForBookmarkName(text: string) {
    let bookmarkId: string | null = '';
    while(bookmarkId === '') {
      bookmarkId = window.prompt(text)
    }
    return bookmarkId;
  }

  private dispatchBookmark(bookmarkId: string) {
    const bookmark: Bookmark = {
      id: bookmarkId,
      position: {
        longitude: this.center.lng.toString(),
        latitude: this.center.lat.toString()
      },
      date: new Date()
    }
    this.bookmarksStore.dispatch(BookmarkAdded(bookmark))
  }

  private initIssPosition() {
    this.subscription.add(
      interval(2000)
        .pipe(
          takeUntil(this.stopPlay$),
          repeatWhen(() => this.resumePlay$))
        .subscribe(() => {
          this.issService.registerISSApi().subscribe(res => {
              this.setIssPosition(res.iss_position)
              this.issPositionStore.dispatch(UpdateIssPosition(res))
            });
        }));
  }

  private registerBookmarksFocus() {
    this.bookmarksStore.select(selectBookmarkFocused).subscribe((selectedBookmark) => {
      if (!!selectedBookmark) {
        this.stopPlay$.next();
        this.setIssPosition(selectedBookmark.position)
        this.zoom = 10;
      } else {
        this.resumePlay$.next();
        this.zoom = DEFAULT_ZOOM_LEVEL;
      }
    })
  }

  private setIssPosition(position: IssPosition["iss_position"]) {
    this.center = {
      lat: parseFloat(position.latitude),
      lng: parseFloat(position.longitude)
    }
  }

  addBookmark() {
    this.bookmarksStore.pipe(
      select(selectBookmarksList),
      take(1))
      .subscribe(
        bookmarks => {
          let duplicateItem: Bookmark | undefined;
          let bookmarkId: string | null;
          do {
            bookmarkId = IssMapComponent.promptForBookmarkName('give a unique name for the bookmark');
            if (bookmarkId == null) return; //user clicked on cancel
            duplicateItem = bookmarks.find(bookmark => bookmark.id === bookmarkId)
          } while (duplicateItem);

          this.dispatchBookmark(bookmarkId);
        }
      )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); //check subscribers
  }
}
