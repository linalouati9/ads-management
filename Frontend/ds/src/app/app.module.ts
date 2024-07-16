import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditBienComponent } from './edit-bien/edit-bien.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BiensComponent } from './biens/biens.component';
import { HttpClientModule } from '@angular/common/http';
import { BaseURL } from 'src/shared/baseUrl';
import { DetailBienComponent } from './detail-bien/detail-bien.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { EditMaisonComponent } from './edit-maison/edit-maison.component';
import { EditTerrainComponent } from './edit-terrain/edit-terrain.component';
import { TeamComponent } from './team/team.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ProcessHttpmsgService } from './services/process-httpmsg.service';

@NgModule({
  declarations: [
    AppComponent,
    EditBienComponent,
    BiensComponent,
    DetailBienComponent,
    NotFoundComponent,
    HomeComponent,
    EditMaisonComponent,
    EditTerrainComponent,
    TeamComponent,
    ContactComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide : 'BaseURL', useValue: BaseURL},
    ProcessHttpmsgService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
