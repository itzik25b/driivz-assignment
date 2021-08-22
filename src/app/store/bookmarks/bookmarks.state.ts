import {Bookmark} from "./bookmark.model";
import {createFeatureSelector} from "@ngrx/store";

export const bookmarksFeatureKey = 'bookmarks';

export interface BookmarksStateModel {filterValue: string, selectedBookmark: Bookmark | undefined, bookmarks: Array<Bookmark>}

export const BookmarksState = createFeatureSelector<BookmarksStateModel>(bookmarksFeatureKey);

export const BookmarksInitialState: BookmarksStateModel = {filterValue: '', selectedBookmark: undefined, bookmarks: []};
