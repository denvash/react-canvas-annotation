import { ISize } from 'interfaces';
import CANVAS from './canvas';

type IRenderEngine = {
  readonly lineThickness: number;
  readonly lineActiveColor: string;
  readonly lineInactiveColor: string;
  readonly anchorSize: ISize;
  readonly anchorHoverSize: ISize;
  readonly suggestedAnchorDetectionSize: ISize;
  readonly activeAnchorColor: string;
};

const renderEngine: IRenderEngine = {
  lineThickness: 2,
  lineActiveColor: CANVAS.PRIMARY_COLOR,
  lineInactiveColor: '#fff',
  anchorSize: {
    width: CANVAS.RESIZE_HANDLE_DIMENSION_PX,
    height: CANVAS.RESIZE_HANDLE_DIMENSION_PX,
  },
  anchorHoverSize: {
    width: CANVAS.RESIZE_HANDLE_HOVER_DIMENSION_PX,
    height: CANVAS.RESIZE_HANDLE_HOVER_DIMENSION_PX,
  },
  suggestedAnchorDetectionSize: {
    width: 100,
    height: 100,
  },
  activeAnchorColor: CANVAS.SECONDARY_COLOR,
};

export default renderEngine;
