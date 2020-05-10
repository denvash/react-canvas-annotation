import { LabelType } from '../../interfaces/enums/LabelType';
import { Action } from '../Actions';
import { AnnotationData, LabelsActionTypes } from './types';

export function updateActiveLabelNameId(activeLabelNameId: string): LabelsActionTypes {
  return {
    type: Action.UPDATE_ACTIVE_LABEL_NAME_ID,
    payload: {
      activeLabelNameId,
    },
  };
}

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

export function updateImageDataById(id: string, newImageData: AnnotationData): LabelsActionTypes {
  return {
    type: Action.UPDATE_IMAGE_DATA_BY_ID,
    payload: {
      id,
      newImageData,
    },
  };
}

export function addImageData(imageData: AnnotationData[]): LabelsActionTypes {
  return {
    type: Action.ADD_IMAGES_DATA,
    payload: {
      imageData,
    },
  };
}

export function updateImageData(imageData: AnnotationData[]): LabelsActionTypes {
  return {
    type: Action.UPDATE_IMAGES_DATA,
    payload: {
      imageData,
    },
  };
}
