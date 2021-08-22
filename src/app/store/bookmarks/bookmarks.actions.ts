import {createAction, props} from "@ngrx/store";
import {Bookmark} from "./bookmark.model";

export const BookmarkAdded = createAction(
  '[BOOKMARKS] add bookmark',
  props<Bookmark>()
);

export const BookmarkRemoved = createAction(
  '[BOOKMARKS] remove bookmark',
  props<{ id: string }>()
);

export const BookmarkFocused = createAction(
  '[BOOKMARKS] focus on bookmark',
  props<{ id: string | null }>()
);

export const BookmarksFilterValueChanged = createAction(
  '[BOOKMARKS] filter value changed',
  props<{ value: string }>()
);

