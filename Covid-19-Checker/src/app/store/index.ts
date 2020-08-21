import { covid19StateDataState, Statereducer } from "./statedataload/stateload.reducer";

//APP STATE 
export interface AppState {
    covid19State: covid19StateDataState
}
//APP REDUCERS
export const reducers = {
    covid19State: Statereducer
}
