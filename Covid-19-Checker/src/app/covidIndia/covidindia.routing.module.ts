import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { StateNormalComponent } from './normData/StateNormalData.component';
import { StateComponent } from './state/state.component';

const routes: Routes = [
  { path: "", component: StateNormalComponent },
  { path: "states", component: StateComponent },
  { path: "**", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class COVIDIndiaRoutingModule { }

export const RoutingComponents = [StateNormalComponent, StateComponent]