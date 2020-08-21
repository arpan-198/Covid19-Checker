import { createFeatureSelector, createSelector } from '@ngrx/store';
import { covid19StateDataState, Covid19ReducerFeatureKey, selectAll, adapter } from "./stateload.reducer";

export const selectCovidState = createFeatureSelector<covid19StateDataState>(
    Covid19ReducerFeatureKey
);

//SELECT ALL DATA FROM APP STATE 
export const getStatewiseData = createSelector(
    selectCovidState,
    adapter.getSelectors().selectAll
);

