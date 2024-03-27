import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchComponent } from './features/search/search.component';

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
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
