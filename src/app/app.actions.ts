import { createAction, props } from '@ngrx/store';

export const getUser = createAction('[Counter Component] GetUser', props<{user: any}>())
