import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap , catchError } from 'rxjs/operators';

import { LoadDataServices } from "../../services/loadData.service";
import * as stateLoadActions from "./stateload.action";


@Injectable()
export class StateLoadEffect{

    stateLoadRequest$ = createEffect(() => this.action$.pipe(
        ofType(stateLoadActions.LoadRequest),
        switchMap(() => this.LoadService.StateDataLoad().pipe(
            map(data => stateLoadActions.LoadSuccess({ loadedData : data })),
            catchError(() => stateLoadActions.LoadFail)
        )
        )
    ))

    constructor(
        private action$ : Actions,
        private LoadService : LoadDataServices
    ){}


}