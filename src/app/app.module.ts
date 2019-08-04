import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';

import {ReposContainerComponent} from './repos-container/repos-container.component';
import {GitService} from "./services/git.service";
import {GithubService} from "./services/github.service";

@NgModule({
  declarations: [
    AppComponent,
    ReposContainerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {provide: GitService, useClass: GithubService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

