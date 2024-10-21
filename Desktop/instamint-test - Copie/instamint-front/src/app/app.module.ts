import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { PostFeedComponent } from './features/post-feed/post-feed.component';
import { CreatePostComponent } from './features/create-post/create-post.component';

@NgModule({
  declarations: [
    AppComponent,
    PostFeedComponent,
    CreatePostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
