import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostFeedComponent } from './features/post-feed/post-feed.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchComponent } from './features/search/search.component';
import { SocialFeaturesComponent } from './features/social-features/social-features.component';
import { authGuard } from './shared/services/auth.guard';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'public/home',
        pathMatch: 'full',
    },
    {
        path: 'public/home',
        component: HomePageComponent,
    },
    {
        path: 'account/search',
        component: SearchComponent,
        canActivate: [authGuard]
    },
    {
        path: 'account/social-features/:username',
        component: SocialFeaturesComponent,
        canActivate: [authGuard]
    },
    {
        path: 'not-found-page',
        component: NotFoundPageComponent,
    },
    {
        path: '**',
        redirectTo: 'not-found-page',
        pathMatch: 'full'
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
