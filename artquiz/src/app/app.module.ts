import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { QuestionPageComponent } from './pages/question-page/question-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { DataService } from './core/services/data.service';
import { ScorePageComponent } from './pages/score-page/score-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    StartPageComponent,
    SettingsPageComponent,
    CategoriesPageComponent,
    QuestionPageComponent,
    ErrorPageComponent,
    ScorePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    DataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
