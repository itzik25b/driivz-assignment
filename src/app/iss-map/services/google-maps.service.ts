import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService{

  constructor(private httpClient: HttpClient) {
  }

  registerGoogleMapsApi() {
    return this.httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyBzowRISN2T-PxIH0TmJ2VXpuN8ex-O3w4', 'callback')
  }
}
