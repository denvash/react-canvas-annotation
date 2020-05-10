import { LabelType } from 'interfaces/enums';
import find from 'lodash.find';
import { store } from 'store';
import { AnnotationData, LabelPolygon, LabelRect } from 'store/labels/types';

export class LabelsSelector {
  public static getActiveLabelType(): LabelType {
    return store.getState().labels.activeLabelType;
  }

  public static getImageData(): AnnotationData {
    return store.getState().labels.imageData;
  }

  public static getImageDataById(): AnnotationData {
    const imagesData: AnnotationData = LabelsSelector.getImageData();
    return imagesData[0];
  }

  public static getActiveLabelId(): string | null {
    return store.getState().labels.activeLabelId;
  }

  public static getHighlightedLabelId(): string | null {
    return store.getState().labels.highlightedLabelId;
  }

  public static getActiveRectLabel(): LabelRect | null {
    const activeLabelId: string | null = LabelsSelector.getActiveLabelId();

    if (activeLabelId === null) return null;

    return find(LabelsSelector.getImageData().labelRects, { id: activeLabelId });
  }

  public static getActivePolygonLabel(): LabelPolygon | null {
    const activeLabelId: string | null = LabelsSelector.getActiveLabelId();

    if (activeLabelId === null) return null;

    return find(LabelsSelector.getImageData().labelPolygons, { id: activeLabelId });
  }
}
