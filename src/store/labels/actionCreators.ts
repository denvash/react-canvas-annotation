import { LabelType } from '../../interfaces/enums/LabelType';
import { Action } from '../actions';
import { AnnotationData, LabelsActionTypes, LabelsData } from './types';

export function updateActiveLabelId(activeLabelId: string): LabelsActionTypes {
  return {
    type: Action.UPDATE_ACTIVE_LABEL_ID,
    payload: {
      activeLabelId,
    },
  };
}

export function updateHighlightedLabelId(highlightedLabelId: string): LabelsActionTypes {
  return {
    type: Action.UPDATE_HIGHLIGHTED_LABEL_ID,
    payload: {
      highlightedLabelId,
    },
  };
}

export function updateActiveLabelType(activeLabelType: LabelType): LabelsActionTypes {
  return {
    type: Action.UPDATE_ACTIVE_LABEL_TYPE,
    payload: {
      activeLabelType,
    },
  };
}

export function updateImageData(imageData: AnnotationData): LabelsActionTypes {
  return {
    type: Action.UPDATE_FILE_DATA,
    payload: {
      imageData,
    },
  };
}

export function updateLabels(labels: LabelsData): LabelsActionTypes {
  return {
    type: Action.UPDATE_LABELS,
    payload: {
      labels,
    },
  };
}
