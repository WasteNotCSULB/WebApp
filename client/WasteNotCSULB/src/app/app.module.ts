import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { NewsComponent } from './news/news.component';
import { ItemsComponent } from './items/items.component';
import { CategoriesComponent } from './categories/categories.component';
import { RestApiService } from './rest-api.service';
import { DataService } from './data.service';
import { MessageComponent } from './message/message.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { PostItemComponent } from './post-item/post-item.component';
import { CategoryComponent } from './category/category.component';
import { ItemComponent } from './item/item.component';
import { SummaryComponent } from './summary/summary.component';
import { AboutComponent } from './about/about.component';
import { SearchComponent } from './search/search.component';
import { EditItemComponent } from './edit-item/edit-item.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuizComponent,
    NewsComponent,
    ItemsComponent,
    CategoriesComponent,
    MessageComponent,
    RegistrationComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    RegistrationComponent,
    SettingsComponent,
    PostItemComponent,
    CategoryComponent,
    ItemComponent,
    SummaryComponent,
    AboutComponent,
    SearchComponent,
    EditItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [RestApiService, DataService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
