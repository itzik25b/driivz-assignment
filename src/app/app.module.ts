import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {IssMapModule} from "./iss-map/iss-map.module";
import {StoreModule} from "@ngrx/store";
import {bookmarksFeatureKey} from "./store/bookmarks/bookmarks.state";
import {bookmarksReducer} from "./store/bookmarks/bookmarks.reducer";
import {BookmarksModule} from "./bookmarks/bookmarks.module";
import {routerReducer, StoreRouterConnectingModule} from "@ngrx/router-store";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BookmarksModule,
    IssMapModule,
    StoreModule.forRoot({router: routerReducer}),
    StoreModule.forFeature(bookmarksFeatureKey, bookmarksReducer),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
