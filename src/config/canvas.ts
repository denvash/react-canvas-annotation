type IViewPoints = {
  readonly CANVAS_MIN_MARGIN_PX: number;
  readonly MAX_ZOOM: number;
  readonly MIN_ZOOM: number;
  readonly TRANSLATION_STEP_PX: number;
  readonly ZOOM_STEP: number;
  readonly RESIZE_HANDLE_DIMENSION_PX: number;
  readonly RESIZE_HANDLE_HOVER_DIMENSION_PX: number;
  readonly PRIMARY_COLOR: string;
  readonly SECONDARY_COLOR: string;
};

const canvas: IViewPoints = {
  CANVAS_MIN_MARGIN_PX: 20,
  MAX_ZOOM: 4,
  MIN_ZOOM: 1,
  TRANSLATION_STEP_PX: 20,
  ZOOM_STEP: 0.1,
  RESIZE_HANDLE_DIMENSION_PX: 8,
  RESIZE_HANDLE_HOVER_DIMENSION_PX: 16,
  PRIMARY_COLOR: '#F8C182',
  SECONDARY_COLOR: '#EC77FF',
};

export default canvas;
