import { VIEW_POINT } from 'config';
import { Direction } from 'interfaces/enums/Direction';
import { IPoint } from 'interfaces/IPoint';
import { IRect } from 'interfaces/IRect';
import { ISize } from 'interfaces/ISize';
import { EditorModel } from 'model/EditorModel';
import { store } from 'store';
import { updateZoom } from 'store/general/actionCreators';
import { GeneralSelector } from 'store/selectors/GeneralSelector';
import { DirectionUtil } from 'utils/DirectionUtil';
import { ImageUtil } from 'utils/ImageUtil';
import { NumberUtil } from 'utils/NumberUtil';
import { PointUtil } from 'utils/PointUtil';
import { RectUtil } from 'utils/RectUtil';
import { SizeUtil } from 'utils/SizeUtil';
import { EditorActions } from './EditorActions';

export class ViewPortActions {
  public static updateViewPortSize() {
    if (!!EditorModel.editor) {
      EditorModel.viewPortSize = {
        width: EditorModel.editor.offsetWidth,
        height: EditorModel.editor.offsetHeight,
      };
    }
  }

  public static updateDefaultViewPortImageRect() {
    if (!!EditorModel.viewPortSize && !!EditorModel.image) {
      const minMargin: IPoint = {
        x: VIEW_POINT.CANVAS_MIN_MARGIN_PX,
        y: VIEW_POINT.CANVAS_MIN_MARGIN_PX,
      };
      const realImageRect: IRect = { x: 0, y: 0, ...ImageUtil.getSize(EditorModel.image) };
      const viewPortWithMarginRect: IRect = { x: 0, y: 0, ...EditorModel.viewPortSize };
      const viewPortWithoutMarginRect: IRect = RectUtil.expand(
        viewPortWithMarginRect,
        PointUtil.multiply(minMargin, -1),
      );
      EditorModel.defaultRenderImageRect = RectUtil.fitInsideRectWithRatio(
        viewPortWithoutMarginRect,
        RectUtil.getRatio(realImageRect),
      );
    }
  }

  public static calculateViewPortContentSize(): ISize {
    if (!!EditorModel.viewPortSize && !!EditorModel.image) {
      const defaultViewPortImageRect: IRect = EditorModel.defaultRenderImageRect;
      const scaledImageSize: ISize = SizeUtil.scale(
        EditorModel.defaultRenderImageRect,
        GeneralSelector.getZoom(),
      );
      return {
        width: scaledImageSize.width + 2 * defaultViewPortImageRect.x,
        height: scaledImageSize.height + 2 * defaultViewPortImageRect.y,
      };
    } else {
      return null;
    }
  }

  public static calculateViewPortContentImageRect(): IRect {
    if (!!EditorModel.viewPortSize && !!EditorModel.image) {
      const defaultViewPortImageRect: IRect = EditorModel.defaultRenderImageRect;
      const viewPortContentSize: ISize = ViewPortActions.calculateViewPortContentSize();
      return {
        ...defaultViewPortImageRect,
        width: viewPortContentSize.width - 2 * defaultViewPortImageRect.x,
        height: viewPortContentSize.height - 2 * defaultViewPortImageRect.y,
      };
    } else {
      return null;
    }
  }

  public static resizeCanvas(newCanvasSize: ISize) {
    if (!!newCanvasSize && !!EditorModel.canvas) {
      EditorModel.canvas.width = newCanvasSize.width;
      EditorModel.canvas.height = newCanvasSize.height;
    }
  }

  public static resizeViewPortContent() {
    const viewPortContentSize = ViewPortActions.calculateViewPortContentSize();
    viewPortContentSize && ViewPortActions.resizeCanvas(viewPortContentSize);
  }

  public static calculateAbsoluteScrollPosition(relativePosition: IPoint): IPoint {
    const viewPortContentSize = ViewPortActions.calculateViewPortContentSize();
    const viewPortSize = EditorModel.viewPortSize;
    return {
      x: relativePosition.x * (viewPortContentSize.width - viewPortSize.width),
      y: relativePosition.y * (viewPortContentSize.height - viewPortSize.height),
    };
  }

  public static getRelativeScrollPosition(): IPoint {
    if (!!EditorModel.viewPortScrollbars) {
      const values = EditorModel.viewPortScrollbars.getValues();
      return {
        x: values.left,
        y: values.top,
      };
    } else {
      return null;
    }
  }

  public static getAbsoluteScrollPosition(): IPoint {
    if (!!EditorModel.viewPortScrollbars) {
      const values = EditorModel.viewPortScrollbars.getValues();
      return {
        x: values.scrollLeft,
        y: values.scrollTop,
      };
    } else {
      return null;
    }
  }

  public static setScrollPosition(position: IPoint) {
    EditorModel.viewPortScrollbars.scrollLeft(position.x);
    EditorModel.viewPortScrollbars.scrollTop(position.y);
  }

  public static translateViewPortPosition(direction: Direction) {
    if (EditorModel.viewPortActionsDisabled) return;

    const directionVector: IPoint = DirectionUtil.convertDirectionToVector(direction);
    const translationVector: IPoint = PointUtil.multiply(
      directionVector,
      VIEW_POINT.TRANSLATION_STEP_PX,
    );
    const currentScrollPosition = ViewPortActions.getAbsoluteScrollPosition();
    const nextScrollPosition = PointUtil.add(currentScrollPosition, translationVector);
    ViewPortActions.setScrollPosition(nextScrollPosition);
    EditorActions.fullRender();
  }

  public static setZoom(value: number) {
    const currentZoom: number = GeneralSelector.getZoom();
    const isNewValueValid: boolean = NumberUtil.isValueInRange(
      value,
      VIEW_POINT.MIN_ZOOM,
      VIEW_POINT.MAX_ZOOM,
    );

    if (isNewValueValid && value !== currentZoom) {
      store.dispatch(updateZoom(value));
    }
  }
}
