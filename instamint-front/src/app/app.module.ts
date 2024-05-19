import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchComponent } from './features/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SearchNftComponent } from './features/search/search-nft/search-nft.component';
import { SearchMinterAndTeaBagComponent } from './features/search/search-minter-and-tea-bag/search-minter-and-tea-bag.component';
import { NotificationsComponent } from './features/notifications/notifications.component';
import { SocialFeaturesComponent } from './features/social-features/social-features.component';
import { UsersProfileComponent } from './features/social-features/users-profile/users-profile.component';
import { MintersProfileWithNftsListComponent } from './features/social-features/minters-profile-with-nfts-list/minters-profile-with-nfts-list.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { PostFeedComponent } from './features/post-feed/post-feed.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomePageComponent,
        SearchComponent,
        SearchNftComponent,
        SearchMinterAndTeaBagComponent,
        NotificationsComponent,
        SocialFeaturesComponent,
        UsersProfileComponent,
        MintersProfileWithNftsListComponent,
        NotFoundPageComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatDialogModule,
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
