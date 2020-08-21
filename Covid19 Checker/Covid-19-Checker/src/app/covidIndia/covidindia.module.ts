import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ChartsModule } from 'ng2-charts';


import { LoadDataServices } from "../services/loadData.service";
import { StateLoadEffect } from "../store/statedataload/stateload.effect";
import { Covid19ReducerFeatureKey } from "../store/statedataload/stateload.reducer";
import { COVIDIndiaRoutingModule, RoutingComponents } from "./covidindia.routing.module";
import { reducers } from "../store/index";
import { DashboardComponent } from './dashboard/dashboard.component';





@NgModule({
    declarations: [RoutingComponents, DashboardComponent],
    imports: [CommonModule, COVIDIndiaRoutingModule, ChartsModule, HttpClientModule, StoreModule.forFeature(Covid19ReducerFeatureKey, reducers.covid19State),
        EffectsModule.forFeature([StateLoadEffect])],
    providers: [LoadDataServices]
})
export class COVIDMODULE { }