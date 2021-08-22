import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssMapComponent } from './iss-map.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {BookmarksStateModel} from "../../store/bookmarks/bookmarks.state";
import {Bookmark} from "../../store/bookmarks/bookmark.model";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {selectBookmarkFocused, selectBookmarksList} from "../../store/bookmarks/bookmarks.selectors";
import {GoogleMapsService} from "../services/google-maps.service";

const bookmarks: Array<Bookmark> = [
  {id: 'b1',date: new Date(1629637854000), position: {longitude: '30', latitude: '127'}},
  {id: 'b2',date: new Date(1629637864000), position: {longitude: '40', latitude: '147'}},
  {id: 'b3',date: new Date(1629637874000), position: {longitude: '50', latitude: '157'}},
]
const initialState: BookmarksStateModel = { bookmarks: bookmarks, selectedBookmark: undefined, filterValue: '' };

describe('IssMapComponent', () => {
  let component: IssMapComponent;
  let fixture: ComponentFixture<IssMapComponent>;
  let store: MockStore<BookmarksStateModel>;
  let googleMapsService: GoogleMapsService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssMapComponent ],
      providers: [ provideMockStore({ initialState }), GoogleMapsService],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssMapComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    googleMapsService = TestBed.inject(GoogleMapsService)
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should stop auto iss position update if bookmark is in focus', () => {
    // spyOn<any>(component['googleMapsService'], 'registerGoogleMapsApi').and.returnValue(Promise.resolve()); //TODO mock response
    const stopPlaySpy = spyOn(component.stopPlay$, 'next');
    component["registerBookmarksFocus"]();
    selectBookmarkFocused.setResult( {id: 'b1',date: new Date(1629637854000), position: {longitude: '30', latitude: '127'}})
    store.refreshState();

    expect(stopPlaySpy).toHaveBeenCalled();
  })

    it('should resume auto iss position update if bookmark is in focus', () => {
      const resumePlaySpy = spyOn(component.resumePlay$, 'next');
      component["registerBookmarksFocus"]();
      selectBookmarkFocused.setResult( undefined)
      store.refreshState();

      expect(resumePlaySpy).toHaveBeenCalled();
    })

    it('add bookmark with unique name', () => {
      spyOn<any>(IssMapComponent, 'promptForBookmarkName').and.returnValue('aaa');
      const dispatchBookmarkSpy = spyOn<any>(component, 'dispatchBookmark');
      selectBookmarksList.setResult(bookmarks)
      store.refreshState();
      component["addBookmark"]();

      expect(dispatchBookmarkSpy).toHaveBeenCalled();
    })

  it('add bookmark but cancel the prompt', () => {
    spyOn<any>(IssMapComponent, 'promptForBookmarkName').and.returnValue(null);
    const dispatchBookmarkSpy = spyOn<any>(component, 'dispatchBookmark');
    selectBookmarksList.setResult(bookmarks)
    store.refreshState();
    component["addBookmark"]();
    expect(dispatchBookmarkSpy).not.toHaveBeenCalled();
  })
});
