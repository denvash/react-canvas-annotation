import { Action } from '../Actions';
import { LabelsActionTypes, LabelsState } from './types';

const initialState: LabelsState = {
  activeLabelNameId: null,
  activeLabelType: null,
  activeLabelId: null,
  highlightedLabelId: null,
  imageData: null,
};

export function labelsReducer(state = initialState, action: LabelsActionTypes): LabelsState {
  switch (action.type) {
    case Action.UPDATE_ACTIVE_LABEL_NAME_ID: {
      return {
        ...state,
        activeLabelNameId: action.payload.activeLabelNameId,
      };
    }
    case Action.UPDATE_ACTIVE_LABEL_ID: {
      return {
        ...state,
        activeLabelId: action.payload.activeLabelId,
      };
    }
    case Action.UPDATE_HIGHLIGHTED_LABEL_ID: {
      return {
        ...state,
        highlightedLabelId: action.payload.highlightedLabelId,
      };
    }
    case Action.UPDATE_ACTIVE_LABEL_TYPE: {
      return {
        ...state,
        activeLabelType: action.payload.activeLabelType,
      };
    }
    case Action.UPDATE_IMAGES_DATA: {
      return {
        ...state,
        imageData: action.payload.imageData,
      };
    }
    default:
      return state;
  }
}
