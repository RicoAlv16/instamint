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
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
