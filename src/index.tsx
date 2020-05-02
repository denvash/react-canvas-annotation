import { ICanvasAnnotation } from 'interfaces';
import { LabelType } from 'interfaces/enums';
import React from 'react';
import { Provider } from 'react-redux';
import { AppInitializer, store } from 'store';
import CanvasAnnotation, { className } from './components/CanvasAnnotation';

AppInitializer.init();

const ReactCanvasAnnotation = (props: ICanvasAnnotation) => (
  <Provider store={store}>
    <CanvasAnnotation {...props} />
  </Provider>
);

const LABEL_TYPE: { [key in LabelType]: LabelType } = {
  [LabelType.POLYGON]: LabelType.POLYGON,
  [LabelType.RECTANGLE]: LabelType.RECTANGLE,
};

export { ReactCanvasAnnotation, LABEL_TYPE, className };
