import { EditorData } from 'interfaces/EditorData';
import { EventType } from 'interfaces/enums/EventType';
import { LabelType } from 'interfaces/enums/LabelType';
import { EditorActions } from 'logic/actions/EditorActions';
import { ViewPortActions } from 'logic/actions/ViewPortActions';
import { useEffect } from 'react';
import { EditorModel } from 'staticModels/EditorModel';
import { AnnotationData, LabelsData } from 'store/labels/types';
import { CanvasUtil } from 'utils/CanvasUtil';
import { FileUtil } from 'utils/FileUtil';

interface IProps {
  annotationType: LabelType;
  imageData: AnnotationData;
  imageDragMode: boolean;
  onLabelsDataChange?: (labelsData: LabelsData) => void;
}

const NOOP = () => {};

const useCanvasListeners = ({
  imageData,
  annotationType,
  imageDragMode,
  onLabelsDataChange = NOOP,
}: IProps) => {
  useEffect(() => {
    const update = (event: MouseEvent) => {
      const editorData: EditorData = EditorActions.getEditorData(event);
      EditorModel.mousePositionOnViewPortContent = CanvasUtil.getMousePositionOnCanvasFromEvent(
        event,
        EditorModel.canvas,
      );

      EditorModel.primaryRenderingEngine.update(editorData);

      if (imageDragMode) {
        EditorModel.viewPortHelper.update(editorData);
      } else {
        EditorModel?.supportRenderingEngine.update(editorData, onLabelsDataChange);
      }

      EditorActions.updateMousePositionIndicator(event);
      EditorActions.fullRender();
    };

    window.addEventListener(EventType.MOUSE_MOVE, update);
    window.addEventListener(EventType.MOUSE_UP, update);
    EditorModel.canvas.addEventListener(EventType.MOUSE_DOWN, update);

    return () => {
      window.removeEventListener(EventType.MOUSE_MOVE, update);
      window.removeEventListener(EventType.MOUSE_UP, update);
      EditorModel.canvas.removeEventListener(EventType.MOUSE_DOWN, update);
    };
  }, [imageDragMode, onLabelsDataChange]);

  useEffect(() => {
    const updateModelAndRender = () => {
      ViewPortActions.updateViewPortSize();
      ViewPortActions.updateDefaultViewPortImageRect();
      ViewPortActions.resizeViewPortContent();
      EditorActions.fullRender();
    };

    const saveLoadedImage = (image: HTMLImageElement, imageData: AnnotationData) => {
      imageData.loadStatus = true;

      EditorActions.setActiveImage(image);
      EditorActions.setLoadingStatus(false);
      updateModelAndRender();
    };

    // Load Image
    if (imageData.loadStatus) {
      updateModelAndRender();
    } else {
      if (!EditorModel.isLoading) {
        EditorActions.setLoadingStatus(true);
        const saveLoadedImagePartial = (image: HTMLImageElement) =>
          saveLoadedImage(image, imageData);
        FileUtil.loadImage(imageData.fileData, saveLoadedImagePartial, NOOP);
      }
    }
  }, [imageData]);

  useEffect(() => {
    EditorActions.mountRenderEnginesAndHelpers(annotationType);
  }, [annotationType]);
};

export default useCanvasListeners;
