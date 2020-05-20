import CanvasAnnotation, { className } from 'components/CanvasAnnotation';
import { ICanvasAnnotation } from 'interfaces';
import { LabelType } from 'interfaces/enums';
import React from 'react';
import { Provider } from 'react-redux';
import { AppInitializer, store } from 'store';
import 'tailwindcss/dist/base.css';

AppInitializer.init();

const ReactCanvasAnnotation: React.FC<ICanvasAnnotation> = props => (
  <Provider store={store}>
    <CanvasAnnotation {...props} />
  </Provider>
);

const LABEL_TYPE: { [key in LabelType]: LabelType } = {
  POLYGON: LabelType.POLYGON,
  RECTANGLE: LabelType.RECTANGLE,
};

export { ReactCanvasAnnotation, LABEL_TYPE, className };
