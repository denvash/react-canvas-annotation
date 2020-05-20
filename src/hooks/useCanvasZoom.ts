import { IPoint } from 'interfaces/IPoint';
import { EditorActions } from 'logic/EditorActions';
import { ViewPortActions } from 'logic/ViewPortActions';
import { EditorModel } from 'model/EditorModel';
import { useEffect, useRef } from 'react';
import { GeneralSelector } from 'store/selectors/GeneralSelector';

const DEFAULT_SCROLL_POSITION = { x: 0.5, y: 0.5 };

const useCanvasZoom = (zoom: number) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      if (EditorModel.viewPortActionsDisabled) return;

      const currentZoom: number = GeneralSelector.getZoom();
      const currentRelativeScrollPosition: IPoint = ViewPortActions.getRelativeScrollPosition();
      const nextRelativeScrollPosition =
        currentZoom === 1 ? DEFAULT_SCROLL_POSITION : currentRelativeScrollPosition;
      ViewPortActions.setZoom(zoom);
      ViewPortActions.resizeViewPortContent();

      ViewPortActions.setScrollPosition(
        ViewPortActions.calculateAbsoluteScrollPosition(nextRelativeScrollPosition),
      );

      EditorActions.fullRender();
    } else {
      isMounted.current = true;
    }
  }, [zoom]);
};

export default useCanvasZoom;
