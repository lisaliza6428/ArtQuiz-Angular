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
import { QuestionService } from './core/services/question.service';
import { ModalActionsService } from './core/services/modal-actions.service';
import { ScorePageComponent } from './pages/score-page/score-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from './core/shared/ng-material.module';
import { FormsModule } from '@angular/forms';
import { PictureStyleDirective } from './core/directives/picture-style.directive';
import { SortPipe } from './core/pipes/sort.pipe';
import { SearchPipe } from './core/pipes/search.pipe';
import { CategoryStyleDirective } from './core/directives/category-style.directive';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CategoryCardComponent } from './core/components/category-card/category-card.component';
import { SharedModule } from './core/shared/shared.module';

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
    PictureStyleDirective,
    SortPipe,
    SearchPipe,
    CategoryStyleDirective,
    CategoryCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    DataService,
    QuestionService,
    ModalActionsService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
