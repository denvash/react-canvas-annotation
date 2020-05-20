import { IconPaths } from 'components/Icons';
import Icon from 'components/Icons/Icon';
import { useCanvasListeners, useCanvasZoom } from 'hooks';
import { ICanvasAnnotation } from 'interfaces';
import { CursorType } from 'interfaces/enums';
import isEqual from 'lodash.isequal';
import { EditorModel } from 'model';
import React, { useEffect, useMemo } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store';
import { updateImageDragModeStatus } from 'store/general/actionCreators';
import {
  updateActiveLabelId,
  updateActiveLabelType,
  updateImageData,
  updateLabels,
} from 'store/labels/actionCreators';
import { AnnotationData } from 'store/labels/types';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';
import tw from 'twin.macro';

const selector = (state: AppState) => ({
  customCursorStyle: state.general.customCursorStyle,
  imageDragMode: state.general.imageDragMode,
});

const onContextMenu = (event: React.MouseEvent<HTMLCanvasElement>) => event.preventDefault();

const NOOP = () => {};

const CanvasAnnotation: React.FC<ICanvasAnnotation> = ({
  annotationType,
  className,
  imageFile,
  labels,
  onChange = NOOP,
  zoom = 1,
  isImageDrag = false,
}) => {
  const imageData: AnnotationData = useMemo(
    () => ({
      fileData: imageFile,
      loadStatus: false,
      ...labels,
    }),
    [imageFile, labels],
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateImageData(imageData));
  }, [dispatch, imageData]);

  useEffect(() => {
    dispatch(updateLabels(labels));
  }, [dispatch, labels]);

  useEffect(() => {
    dispatch(updateImageDragModeStatus(isImageDrag));
  }, [dispatch, isImageDrag]);

  useEffect(() => {
    dispatch(updateActiveLabelType(annotationType));
    dispatch(updateActiveLabelId(null));
  }, [dispatch, annotationType]);

  useCanvasZoom(zoom);

  const { customCursorStyle } = useSelector(selector, isEqual);

  useCanvasListeners({
    imageData,
    annotationType,
    imageDragMode: isImageDrag,
    onLabelsDataChange: onChange,
  });

  return (
    imageData && (
      <Editor className={className} ref={ref => (EditorModel.editor = ref)} draggable={false}>
        <Scrollbars
          ref={ref => (EditorModel.viewPortScrollbars = ref)}
          renderTrackHorizontal={props => <NoCursorTrack {...props} />}
          renderTrackVertical={props => <NoCursorTrack {...props} />}
          draggable={false}>
          <Canvas
            ref={ref => (EditorModel.canvas = ref)}
            draggable={false}
            onContextMenu={onContextMenu}
          />
        </Scrollbars>
        <MouseIndicator ref={ref => (EditorModel.mousePositionIndicator = ref)} draggable={false} />
        <Cursor
          isGrabbing={customCursorStyle === CursorType.GRABBING}
          isTransform={customCursorStyle !== CursorType.DEFAULT}
          ref={ref => (EditorModel.cursor = ref)}
          draggable={false}>
          <Icon d={IconPaths[customCursorStyle]} />
        </Cursor>
      </Editor>
    )
  );
};

const Editor = styled.div`
  ${tw`w-full h-full relative`}
`;

const Canvas = styled.canvas`
  ${tw`absolute cursor-none`}
`;

const MouseIndicator = styled.div`
  ${tw`select-none pointer-events-none`}
  ${tw`absolute text-white opacity-75 p-1`}
  ${tw`bg-gray-700 z-50`}
`;

interface ICursor {
  readonly isTransform: boolean;
  readonly isGrabbing: boolean;
}

const Cursor = styled.div<ICursor>`
  ${tw`absolute w-2 h-2 text-white fill-current`}
  ${tw`pointer-events-none z-40`}
  ${tw`border-white bg-white rounded-full`}
  ${tw`transition-transform ease-in-out duration-200`}
  ${ifProp(`isTransform`, tw`border bg-transparent transform scale-350`)}
  ${ifProp(`isGrabbing`, tw`scale-250`)}
`;

const NoCursorTrack = styled.div`
  ${tw`pointer-events-none cursor-none`}
`;

export const className = Editor;
export default CanvasAnnotation;
