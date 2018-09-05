import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatComponent } from './cat/cat.component';
import { DogComponent } from './dog/dog.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cat', component: CatComponent},
  {path: 'dog', component: DogComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
