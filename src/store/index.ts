import { EventType } from 'interfaces/enums/EventType';
import { combineReducers, createStore } from 'redux';
import { updateWindowSize } from './general/actionCreators';
import { generalReducer } from './general/reducer';
import { labelsReducer } from './labels/reducer';

const rootReducer = combineReducers({
  general: generalReducer,
  labels: labelsReducer,
});

function configureStore() {
  return createStore(
    rootReducer,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
}

export const store = configureStore();

export class AppInitializer {
  public static init(): void {
    AppInitializer.handleResize();
    window.addEventListener(EventType.RESIZE, AppInitializer.handleResize);
  }

  private static handleResize = () => {
    store.dispatch(
      updateWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      }),
    );
  };
}

export type AppState = ReturnType<typeof rootReducer>;
