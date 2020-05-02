import configureStore from 'configureStore';
import { AppInitializer } from 'logic/initializer/AppInitializer';
import { combineReducers } from 'redux';
import { generalReducer } from './general/reducer';
import { labelsReducer } from './labels/reducer';

export const rootReducer = combineReducers({
  general: generalReducer,
  labels: labelsReducer,
});

export const store = configureStore();

AppInitializer.init();

export type AppState = ReturnType<typeof rootReducer>;
