import { CursorType } from 'interfaces/enums/CursorType';
import { ViewPointSettings } from 'settings/ViewPointSettings';
import { Action } from 'store/actions';
import { GeneralActionTypes, GeneralState } from './types';

const initialState: GeneralState = {
  windowSize: null,
  customCursorStyle: CursorType.DEFAULT,
  preventCustomCursor: false,
  imageDragMode: false,
  zoom: ViewPointSettings.MIN_ZOOM,
};

export function generalReducer(state = initialState, action: GeneralActionTypes): GeneralState {
  switch (action.type) {
    case Action.UPDATE_WINDOW_SIZE: {
      return {
        ...state,
        windowSize: action.payload.windowSize,
      };
    }
    case Action.UPDATE_CUSTOM_CURSOR_STYLE: {
      return {
        ...state,
        customCursorStyle: action.payload.customCursorStyle,
      };
    }
    case Action.UPDATE_PREVENT_CUSTOM_CURSOR_STATUS: {
      return {
        ...state,
        preventCustomCursor: action.payload.preventCustomCursor,
      };
    }
    case Action.UPDATE_IMAGE_DRAG_MODE_STATUS: {
      return {
        ...state,
        imageDragMode: action.payload.imageDragMode,
      };
    }
    case Action.UPDATE_ZOOM: {
      return {
        ...state,
        zoom: action.payload.zoom,
      };
    }
    default:
      return state;
  }
}
