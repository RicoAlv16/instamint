import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostFeedComponent } from './features/post-feed/post-feed.component';

const routes: Routes = [
  { path: 'postfeed', component: PostFeedComponent },
  { path: '', redirectTo: '/postfeed', pathMatch: 'full' },
  { path: '**', redirectTo: '/postfeed' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
