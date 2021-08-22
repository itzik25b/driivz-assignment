import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BookmarksListComponent} from "./bookmarks-list/bookmarks-list.component";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    BookmarksListComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    BookmarksListComponent
  ]
})
export class BookmarksModule { }
