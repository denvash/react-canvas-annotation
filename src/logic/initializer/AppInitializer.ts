import { EventType } from 'interfaces/enums/EventType';
import { store } from 'store';
import { updateWindowSize } from 'store/general/actionCreators';

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
