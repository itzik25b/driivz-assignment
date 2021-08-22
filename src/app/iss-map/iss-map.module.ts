import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {IssMapComponent} from "./iss-map/iss-map.component";
import {GoogleMapsModule} from "@angular/google-maps";
import {GoogleMapsService} from "./services/google-maps.service";
import {StoreModule} from "@ngrx/store";
import {issPositionFeatureKey} from "../store/iss-position/iss-position.state";
import {issPositionReducer} from "../store/iss-position/iss-position.reducer";


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientJsonpModule,
    GoogleMapsModule,
    StoreModule.forFeature(issPositionFeatureKey, issPositionReducer)
  ],
  providers: [
    GoogleMapsService
  ],
  declarations: [
    IssMapComponent
  ],
  exports: [
    IssMapComponent
  ]
})
export class IssMapModule { }
