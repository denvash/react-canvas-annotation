import { LabelsData } from 'store/labels/types';
import { LabelType } from './enums';

export interface ICanvasAnnotation {
  annotationType: LabelType;
  className?: string;
  imageFile: File;
  labels: LabelsData;
  onChange?: (labelsData: LabelsData) => void;
  zoom?: number;
  isImageDrag?: boolean;
  onHover?: (string) => void;
  onClick?: (labelsData: LabelsData) => void;
}
