import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Action, createReducer, on } from "@ngrx/store";


import * as loadActions from "./stateload.action";

export const Covid19ReducerFeatureKey = "covid19India";

//ENTITY

export interface covid19StateDataState extends EntityState<any> {
    isLoaded: boolean | null,
    hasError: boolean | null
}
//ADAPTER FOR ENTITY
export const adapter: EntityAdapter<any> = createEntityAdapter<any>();
//INITIAL STATE
export const InitialState = adapter.getInitialState({
    isLoaded: null,
    hasError: null
});

//REDUCERS
export const loadReducer = createReducer(
    InitialState,
    on(loadActions.LoadRequest,
        (state, action) => {
            return {
                ...state,
                isLoaded: false,
                hasError: false
            }
        }
    ),
    on(loadActions.LoadSuccess,
        (state, action) => {
            return adapter.addMany(action.loadedData, { ...state, isLoaded: true })
        }
    ),
    on(loadActions.LoadFail,
        (state, action) => {
            return {
                ...state,
                isLoaded: true,
                hasError: true
            }
        }
    )
)

export function Statereducer(state: covid19StateDataState | undefined, action: Action) {
    return loadReducer(state, action);
}



export const {
    selectAll
} = adapter.getSelectors();