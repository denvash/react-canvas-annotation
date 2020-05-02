import { LabelType } from 'interfaces/enums/LabelType';
import filter from 'lodash.filter';
import { store } from 'store';
import { updateImageData, updateImageDataById } from 'store/labels/actionCreators';
import { AnnotationData, LabelName, LabelPolygon, LabelRect } from 'store/labels/types';
import { LabelsSelector } from 'store/selectors/LabelsSelector';

export class LabelActions {
  public static deleteActiveLabel() {
    const activeLabelId: string = LabelsSelector.getActiveLabelId();
    LabelActions.deleteImageLabelById(`0`, activeLabelId);
  }

  public static deleteImageLabelById(imageId: string, labelId: string) {
    switch (LabelsSelector.getActiveLabelType()) {
      case LabelType.RECTANGLE:
        LabelActions.deleteRectLabelById(imageId, labelId);
        break;
      case LabelType.POLYGON:
        LabelActions.deletePolygonLabelById(imageId, labelId);
        break;
    }
  }

  public static deleteRectLabelById(imageId: string, labelRectId: string) {
    const imageData: AnnotationData = LabelsSelector.getImageDataById();
    const newImageData = {
      ...imageData,
      labelRects: filter(imageData.labelRects, (currentLabel: LabelRect) => {
        return currentLabel.id !== labelRectId;
      }),
    };
    store.dispatch(updateImageDataById(`0`, newImageData));
  }

  public static deletePolygonLabelById(imageId: string, labelPolygonId: string) {
    const imageData: AnnotationData = LabelsSelector.getImageDataById();
    const newImageData = {
      ...imageData,
      labelPolygons: filter(imageData.labelPolygons, (currentLabel: LabelPolygon) => {
        return currentLabel.id !== labelPolygonId;
      }),
    };
    store.dispatch(updateImageDataById(`0`, newImageData));
  }

  public static removeLabelNames(labelNamesIds: string[]) {
    const imagesData: AnnotationData[] = LabelsSelector.getImagesData();
    const newImagesData: AnnotationData[] = imagesData.map((imageData: AnnotationData) => {
      return LabelActions.removeLabelNamesFromImageData(imageData, labelNamesIds);
    });
    store.dispatch(updateImageData(newImagesData));
  }

  private static removeLabelNamesFromImageData(
    imageData: AnnotationData,
    labelNamesIds: string[],
  ): AnnotationData {
    return {
      ...imageData,
      labelRects: imageData.labelRects.map((labelRect: LabelRect) => {
        if (labelNamesIds.includes(labelRect.id)) {
          return {
            ...labelRect,
            id: null,
          };
        } else {
          return labelRect;
        }
      }),
      labelPolygons: imageData.labelPolygons.map((labelPolygon: LabelPolygon) => {
        if (labelNamesIds.includes(labelPolygon.id)) {
          return {
            ...labelPolygon,
            id: null,
          };
        } else {
          return labelPolygon;
        }
      }),
    };
  }

  public static labelExistsInLabelNames(label: string): boolean {
    const labelNames: LabelName[] = LabelsSelector.getLabelNames();
    return labelNames.map((label: LabelName) => label.name).includes(label);
  }
}
