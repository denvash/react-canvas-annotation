import find from 'lodash.find';
import { store } from 'store';
import { LabelType } from '../../interfaces/enums/LabelType';
import { AnnotationData, LabelName, LabelPolygon, LabelRect } from '../labels/types';

export class LabelsSelector {
  public static getLabelNames(): LabelName[] {
    return store.getState().labels.labels;
  }

  public static getActiveLabelNameId(): string {
    return store.getState().labels.activeLabelNameId;
  }

  public static getActiveLabelType(): LabelType {
    return store.getState().labels.activeLabelType;
  }

  public static getImagesData(): AnnotationData[] {
    return store.getState().labels.imagesData;
  }

  public static getActiveImageIndex(): number {
    return 0;
  }

  public static getActiveImageData(): AnnotationData | null {
    const activeImageIndex: number | null = LabelsSelector.getActiveImageIndex();

    if (activeImageIndex === null) return null;

    return LabelsSelector.getImageDataByIndex(activeImageIndex);
  }

  public static getImageDataByIndex(index: number): AnnotationData {
    const imagesData: AnnotationData[] = LabelsSelector.getImagesData();
    return imagesData[index];
  }

  public static getImageDataById(): AnnotationData {
    const imagesData: AnnotationData[] = LabelsSelector.getImagesData();
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

    return find(LabelsSelector.getActiveImageData().labelRects, { id: activeLabelId });
  }

  public static getActivePolygonLabel(): LabelPolygon | null {
    const activeLabelId: string | null = LabelsSelector.getActiveLabelId();

    if (activeLabelId === null) return null;

    return find(LabelsSelector.getActiveImageData().labelPolygons, { id: activeLabelId });
  }
}
