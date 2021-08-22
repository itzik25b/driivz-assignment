import {Injectable, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IssPosition} from "../../store/iss-position/iss-position.model";

@Injectable({
  providedIn: 'root'
})
export class IssService {

  constructor(private httpClient: HttpClient) {
  }

  public registerISSApi() {
    return this.httpClient.get<IssPosition>('http://api.open-notify.org/iss-now.json') //fetch api from config
  }
}
