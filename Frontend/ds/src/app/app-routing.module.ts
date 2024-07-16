import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BiensComponent } from './biens/biens.component';
import { DetailBienComponent } from './detail-bien/detail-bien.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { EditMaisonComponent } from './edit-maison/edit-maison.component';
import { EditTerrainComponent } from './edit-terrain/edit-terrain.component';
import { TeamComponent } from './team/team.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
                        {path:"", component:HomeComponent},
                        {path:"home", component:HomeComponent},
                        {path:"about", component:AboutComponent},
                        {path:"team", component:TeamComponent},
                        {path:"contact", component:ContactComponent},

                        //{path:"login", component:HomeComponent},
                        {path:"annonces", component:BiensComponent},
                        {path:"annonces/:id", component:DetailBienComponent},
                        {path:"edit-maison/:id", component:EditMaisonComponent},
                        {path:"edit-terrain/:id", component:EditTerrainComponent},
                        {path:"**", component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
