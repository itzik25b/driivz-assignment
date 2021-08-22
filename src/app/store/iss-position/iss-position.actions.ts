import {IssPosition} from "./iss-position.model";
import {createAction, props} from "@ngrx/store";

export const UpdateIssPosition = createAction(
  '[ISS POSITION] update position',
  props<IssPosition>()
);
