import { ThePeopleService } from './services/the-people.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StarWarsComponent } from './star-wars/star-wars.component';

import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import {MatGridListModule} from '@angular/material/grid-list';

import {DragDropModule} from '@angular/cdk/drag-drop'
import { FormsModule } from '@angular/forms';


@NgModule({
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    
  ],
  declarations: [
    AppComponent,
    StarWarsComponent,

  ],
  imports: [
    HttpClientModule,
    MatListModule,
    MatGridListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatRippleModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    DragDropModule,
    FormsModule
  ],
  providers: [ThePeopleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
