import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { OpenPostComponent } from './tools/open-post/open-post.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './tools/settings/settings.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ProfileComponent,
    SettingsComponent,
    OpenPostComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
