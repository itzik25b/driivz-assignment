import {IssPosition} from "../iss-position/iss-position.model";

export interface Bookmark {
  id: string;
  position: IssPosition["iss_position"];
  date: Date;
}
