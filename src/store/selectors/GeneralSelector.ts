import { CursorType } from 'interfaces/enums';
import { store } from 'store';

export class GeneralSelector {
  public static getPreventCustomCursorStatus(): boolean {
    return store.getState().general.preventCustomCursor;
  }

  public static getImageDragModeStatus(): boolean {
    return store.getState().general.imageDragMode;
  }

  public static getCustomCursorStyle(): CursorType {
    return store.getState().general.customCursorStyle;
  }

  public static getZoom(): number {
    return store.getState().general.zoom;
  }
}
