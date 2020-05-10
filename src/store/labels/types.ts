import { LabelType } from 'interfaces/enums';
import { IPoint } from 'interfaces/IPoint';
import { IRect } from 'interfaces/IRect';
import { Action } from 'store/Actions';

export type LabelRect = {
  id: string;
  rect: IRect;
};

export type LabelPolygon = {
  id: string;
  vertices: IPoint[];
};

export type LabelName = {
  name: string;
  id: string;
};

export type AnnotationData = {
  fileData: File;
  loadStatus: boolean;
  labelRects: LabelRect[];
  labelPolygons: LabelPolygon[];
};

export type LabelsData = {
  labelRects: LabelRect[];
  labelPolygons: LabelPolygon[];
};

export type LabelsState = {
  activeLabelNameId: string;
  activeLabelType: LabelType;
  activeLabelId: string;
  highlightedLabelId: string;
  imagesData: AnnotationData[];
  firstLabelCreatedFlag: boolean;
  labels: LabelName[];
};

interface UpdateActiveLabelNameId {
  type: typeof Action.UPDATE_ACTIVE_LABEL_NAME_ID;
  payload: {
    activeLabelNameId: string;
  };
}

interface UpdateActiveLabelId {
  type: typeof Action.UPDATE_ACTIVE_LABEL_ID;
  payload: {
    activeLabelId: string;
  };
}

interface UpdateHighlightedLabelId {
  type: typeof Action.UPDATE_HIGHLIGHTED_LABEL_ID;
  payload: {
    highlightedLabelId: string;
  };
}

interface UpdateActiveLabelType {
  type: typeof Action.UPDATE_ACTIVE_LABEL_TYPE;
  payload: {
    activeLabelType: LabelType;
  };
}

interface UpdateImageDataById {
  type: typeof Action.UPDATE_IMAGE_DATA_BY_ID;
  payload: {
    id: string;
    newImageData: AnnotationData;
  };
}

interface AddImageData {
  type: typeof Action.ADD_IMAGES_DATA;
  payload: {
    imageData: AnnotationData[];
  };
}

interface UpdateImageData {
  type: typeof Action.UPDATE_IMAGES_DATA;
  payload: {
    imageData: AnnotationData[];
  };
}

interface UpdateLabelNames {
  type: typeof Action.UPDATE_LABEL_NAMES;
  payload: {
    labels: LabelName[];
  };
}

export type LabelsActionTypes =
  | UpdateActiveLabelNameId
  | UpdateActiveLabelType
  | UpdateImageDataById
  | AddImageData
  | UpdateImageData
  | UpdateLabelNames
  | UpdateActiveLabelId
  | UpdateHighlightedLabelId;
