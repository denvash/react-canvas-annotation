import { CursorType } from 'interfaces/enums/CursorType';
import { ISize } from 'interfaces/ISize';
import { Action } from 'store/actions';

export type GeneralState = {
  windowSize: ISize;
  customCursorStyle: CursorType;
  preventCustomCursor: boolean;
  imageDragMode: boolean;
  zoom: number;
};

interface UpdateWindowSize {
  type: typeof Action.UPDATE_WINDOW_SIZE;
  payload: {
    windowSize: ISize;
  };
}

interface UpdateCustomCursorStyle {
  type: typeof Action.UPDATE_CUSTOM_CURSOR_STYLE;
  payload: {
    customCursorStyle: CursorType;
  };
}

interface UpdatePreventCustomCursorStatus {
  type: typeof Action.UPDATE_PREVENT_CUSTOM_CURSOR_STATUS;
  payload: {
    preventCustomCursor: boolean;
  };
}

interface UpdateImageDragModeStatus {
  type: typeof Action.UPDATE_IMAGE_DRAG_MODE_STATUS;
  payload: {
    imageDragMode: boolean;
  };
}

interface UpdateZoom {
  type: typeof Action.UPDATE_ZOOM;
  payload: {
    zoom: number;
  };
}

export type GeneralActionTypes =
  | UpdateWindowSize
  | UpdateCustomCursorStyle
  | UpdatePreventCustomCursorStatus
  | UpdateImageDragModeStatus
  | UpdateZoom;
