import { CursorType } from '../../interfaces/enums/CursorType';
import { ISize } from '../../interfaces/ISize';
import { Action } from '../actions';
import { GeneralActionTypes } from './types';

export function updateWindowSize(windowSize: ISize): GeneralActionTypes {
  return {
    type: Action.UPDATE_WINDOW_SIZE,
    payload: {
      windowSize,
    },
  };
}

export function updateCustomCursorStyle(customCursorStyle: CursorType): GeneralActionTypes {
  return {
    type: Action.UPDATE_CUSTOM_CURSOR_STYLE,
    payload: {
      customCursorStyle,
    },
  };
}

export function updatePreventCustomCursorStatus(preventCustomCursor: boolean): GeneralActionTypes {
  return {
    type: Action.UPDATE_PREVENT_CUSTOM_CURSOR_STATUS,
    payload: {
      preventCustomCursor,
    },
  };
}

export function updateImageDragModeStatus(imageDragMode: boolean): GeneralActionTypes {
  return {
    type: Action.UPDATE_IMAGE_DRAG_MODE_STATUS,
    payload: {
      imageDragMode,
    },
  };
}

export function updateZoom(zoom: number): GeneralActionTypes {
  return {
    type: Action.UPDATE_ZOOM,
    payload: {
      zoom,
    },
  };
}
