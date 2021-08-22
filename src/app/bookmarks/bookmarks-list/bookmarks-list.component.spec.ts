import { ComponentFixture, TestBed } from '@angular/core/testing';
import {BookmarksListComponent} from "./bookmarks-list.component";
import {By} from "@angular/platform-browser";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {BookmarksStateModel} from "../../store/bookmarks/bookmarks.state";
import {Bookmark} from "../../store/bookmarks/bookmark.model";
import {selectBookmarkFocused, selectBookmarksList} from "../../store/bookmarks/bookmarks.selectors";
import {of} from "rxjs";

const bookmarks: Array<Bookmark> = [
  {id: 'b1',date: new Date(1629637854000), position: {longitude: '30', latitude: '127'}},
  {id: 'b2',date: new Date(1629637864000), position: {longitude: '40', latitude: '147'}},
  {id: 'b3',date: new Date(1629637874000), position: {longitude: '50', latitude: '157'}},
]
const initialState: BookmarksStateModel = { bookmarks: bookmarks, selectedBookmark: undefined, filterValue: '' };

describe('BookmarksListComponent', () => {
  let component: BookmarksListComponent;
  let fixture: ComponentFixture<BookmarksListComponent>;
  let store: MockStore<BookmarksStateModel>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarksListComponent ],
      providers: [provideMockStore({ initialState })]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarksListComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should verify store getting updates', () => {
    selectBookmarksList.setResult(bookmarks)
    store.refreshState();
    component.bookmarks$.subscribe(res => expect(res).toEqual(bookmarks));
  });

  // it('should verify bookmarks filtering is working', () => {
  //   selectBookmarksList.setResult(bookmarks)
  //   store.refreshState();
  //
  //   const input = fixture.debugElement.query(By.css('input'));
  //   input.nativeElement.value = 'b1';
  //   input.nativeElement.dispatchEvent(new Event('input'));
  //   TODO make the filter subscription work
  //   component.bookmarks$.subscribe(res => expect(res).toEqual(bookmarks[0]));
  //
  // });
});
