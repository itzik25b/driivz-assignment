import {IssPosition} from "./iss-position.model";
import {createFeatureSelector} from "@ngrx/store";

export const issPositionFeatureKey = 'issPosition';

export const IssPositionState = createFeatureSelector<IssPosition>(issPositionFeatureKey);

export const issPositionInitialState: IssPosition = {
  iss_position: {
    longitude: "0",
    latitude: "0"
  },
  timestamp: 0
};
