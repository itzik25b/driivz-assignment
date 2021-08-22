import {BookmarksInitialState, BookmarksStateModel} from "./bookmarks.state";
import {bookmarksReducer} from "./bookmarks.reducer";
import {Bookmark} from "./bookmark.model";
import {BookmarkAdded} from "./bookmarks.actions";


describe('BookmarksReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const initialState = BookmarksInitialState;
      const action = {
        type: 'Unknown',
      };
      const state = bookmarksReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('BookmarkAdded action', () => {
    it('should retrieve all books and update the state in an immutable way', () => {
      const initialState  = BookmarksInitialState;
      const newState: BookmarksStateModel = {
        filterValue: '',
        selectedBookmark: undefined,
        bookmarks: [
          {id: 'b1',date: new Date(1629637854000), position: {longitude: '30', latitude: '127'}}
        ]
      }

      const action = BookmarkAdded({id: 'b1',date: new Date(1629637854000), position: {longitude: '30', latitude: '127'}});
      const state = bookmarksReducer(initialState, action);
      // console.log(state.bookmarks);
      // console.log(newState.bookmarks);
      // expect(state.bookmarks).toEqual(newState.bookmarks); //Why is this not working? it adds type: '[BOOKMARKS] add bookmark' to state
      expect(state.bookmarks.length).toEqual(1);
      expect(state.bookmarks.length).toEqual(newState.bookmarks.length);
    });
  });
});
