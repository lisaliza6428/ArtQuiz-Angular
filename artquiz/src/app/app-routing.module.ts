import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { QuestionPageComponent } from './pages/question-page/question-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { StartPageComponent } from './pages/start-page/start-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full',
  },
  {
    path: 'start',
    pathMatch: 'full',
    component: StartPageComponent,
  },
  {
    path: 'categories',
    pathMatch: 'full',
    component: CategoriesPageComponent,
  },
  {
    path: 'question',
    pathMatch: 'full',
    component: QuestionPageComponent,
  },
  {
    path: 'settings',
    pathMatch: 'full',
    component: SettingsPageComponent,
  },
  {
    path: '**',
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
