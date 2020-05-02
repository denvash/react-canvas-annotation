import { LabelType } from 'interfaces/enums/LabelType';
import React from 'react';
import { Provider } from 'react-redux';
import { AppInitializer, store } from 'store';
import { LabelsData } from 'store/labels/types';
import CanvasAnnotation from './components/CanvasAnnotation';

interface IProps {
  annotationType: LabelType;
  className?: string;
  imageFile: File;
  labelsData: LabelsData;
  onLabelsDataChange?: (labelsData: LabelsData) => void;
  zoom?: number;
  isImageDrag?: boolean;
}

AppInitializer.init();

const ReactCanvasAnnotation = (props: IProps) => (
  <Provider store={store}>
    <CanvasAnnotation {...props} />
  </Provider>
);

const LABEL_TYPE: { [key in LabelType]: LabelType } = {
  [LabelType.POLYGON]: LabelType.POLYGON,
  [LabelType.RECTANGLE]: LabelType.RECTANGLE,
};

export { LABEL_TYPE };
export const className: string = CanvasAnnotation.className;
export default ReactCanvasAnnotation;
