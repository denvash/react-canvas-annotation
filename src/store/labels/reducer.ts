import { Action } from '../actions';
import { LabelsActionTypes, LabelsState } from './types';

const initialState: LabelsState = {
  activeLabelType: null,
  activeLabelId: null,
  highlightedLabelId: null,
  imageData: null,
};

export function labelsReducer(state = initialState, action: LabelsActionTypes): LabelsState {
  switch (action.type) {
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
    case Action.UPDATE_FILE_DATA: {
      return {
        ...state,
        imageData: {
          ...state.imageData,
          fileData: action.payload.imageData.fileData,
        },
      };
    }
    case Action.UPDATE_LABELS: {
      return {
        ...state,
        imageData: {
          ...state.imageData,
          ...action.payload.labels,
        },
      };
    }
    default:
      return state;
  }
}
