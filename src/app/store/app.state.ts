import {IssPosition} from "./iss-position/iss-position.model";
import {BookmarksStateModel} from "./bookmarks/bookmarks.state";

export interface AppState {
  IssPosition: IssPosition;
  Bookmarks: BookmarksStateModel;
}
