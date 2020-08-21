import { createAction, props } from "@ngrx/store";

//ACTION TO LOAD STATE+DISTRICT DATA. I USED ngrx BECAUSE THIS DATA WILL REQUIRE IN MULTIPLE COMPONENT

export const LoadRequest = createAction(
    '[State Load Request Effect] Load Request',
);

export const LoadSuccess = createAction(
    '[State Load Success Effect] Load Success',
    props<{ loadedData: any[] }>()
);

export const LoadFail = createAction(
    '[State Load Fail Effect] Load Failed',
);

