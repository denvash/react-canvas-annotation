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
interface UpdateImageData {
  type: typeof Action.UPDATE_IMAGES_DATA;
  payload: {
    imageData: AnnotationData;
  };
}

export type LabelsActionTypes =
  | UpdateActiveLabelNameId
  | UpdateActiveLabelType
  | UpdateImageData
  | UpdateActiveLabelId
  | UpdateHighlightedLabelId;