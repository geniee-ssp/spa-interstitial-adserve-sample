import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './article/article.component';
import { AboutComponent } from './about/about.component';
import { ContentComponent } from './content/content.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'article', component: ArticleComponent },
  { path: 'article/page=1', component: ArticleComponent },
  { path: 'article/page=2', component: ArticleComponent },
  { path: 'article/page=3', component: ArticleComponent },
  { path: 'about', component: AboutComponent },
  { path: 'content', component: ContentComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
