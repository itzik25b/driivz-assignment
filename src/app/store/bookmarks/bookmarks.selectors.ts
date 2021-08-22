import {createSelector} from "@ngrx/store";
import {BookmarksState, BookmarksStateModel} from "./bookmarks.state";


export const selectBookmarksList = createSelector(
  BookmarksState,
  (state:BookmarksStateModel) => state.bookmarks
);

export const selectBookmarkFocused = createSelector(
  BookmarksState,
  (state: BookmarksStateModel) => state.selectedBookmark
);

