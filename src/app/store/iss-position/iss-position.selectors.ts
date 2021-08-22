import {createSelector} from "@ngrx/store";
import {IssPosition} from "./iss-position.model";
import {IssPositionState} from "./iss-position.state";

export const selectIssPosition = createSelector(
   IssPositionState,
  (state: IssPosition) => state
);

