import {IssPosition} from "./iss-position.model";
import {Action, createReducer, on} from "@ngrx/store";
import {UpdateIssPosition} from "./iss-position.actions";
import {issPositionInitialState} from "./iss-position.state";

const reducer = createReducer(
  issPositionInitialState,
  on(UpdateIssPosition, (state, {...IssPosition}) => ({...state, ...IssPosition})),
);

export function issPositionReducer(state: IssPosition | undefined, action: Action): IssPosition {
  return reducer(state, action);
}
