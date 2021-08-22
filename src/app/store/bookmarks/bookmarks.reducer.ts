import {Action, createReducer, on} from "@ngrx/store";
import {BookmarkRemoved, BookmarkAdded, BookmarkFocused, BookmarksFilterValueChanged} from "./bookmarks.actions";
import {AppState} from "../app.state";
import {Bookmark} from "./bookmark.model";
import {BookmarksInitialState, BookmarksStateModel} from "./bookmarks.state";

const reducer = createReducer(
  BookmarksInitialState,
  on(BookmarkAdded, (state: AppState["Bookmarks"], bookmark: Bookmark) => {
    if (state.bookmarks.map(item => item.id).indexOf(bookmark.id) > -1) return state;
    return {
      filterValue: state.filterValue,
      selectedBookmark: state.selectedBookmark,
      bookmarks: [...state.bookmarks, bookmark]
    };
  }),
  on(BookmarkRemoved, (state: AppState["Bookmarks"], {id}) => {
    return {
      filterValue: state.filterValue,
      selectedBookmark: state.selectedBookmark?.id === id ? undefined : state.selectedBookmark,
      bookmarks: state.bookmarks.filter(item => item.id !== id)
    }
  }),
  on(BookmarkFocused, (state: AppState["Bookmarks"], {id}) => {
    return {
      filterValue: state.filterValue,
      selectedBookmark: id ? state.bookmarks.find(item => item.id === id) : undefined,
      bookmarks: state.bookmarks
    }
  }),
  on(BookmarksFilterValueChanged, (state: AppState["Bookmarks"], {value}) => {
    return {
      filterValue: value,
      selectedBookmark: state.selectedBookmark,
      bookmarks: state.bookmarks
    }
  }),
);

export function bookmarksReducer(state: AppState["Bookmarks"], action: Action): BookmarksStateModel {
  return reducer(state, action);
}
