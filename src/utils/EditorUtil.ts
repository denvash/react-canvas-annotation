import classNames from 'classnames';
import { CursorType } from '../interfaces/enums/CursorType';

export class EditorUtil {
  public static getIndicator = (cursorStyle: CursorType): string => {
    switch (cursorStyle) {
      case CursorType.ADD:
        return 'ico/plus.png';
      case CursorType.RESIZE:
        return 'ico/resize.png';
      case CursorType.CLOSE:
        return 'ico/close.png';
      case CursorType.MOVE:
        return 'ico/move.png';
      case CursorType.CANCEL:
        return 'ico/cancel.png';
      case CursorType.GRAB:
        return 'ico/hand-fill.png';
      case CursorType.GRABBING:
        return 'ico/hand-fill-grab.png';
      default:
        return null;
    }
  };

  public static getCursorStyle = (cursorStyle: CursorType) => {
    return classNames('Cursor', {
      move: cursorStyle === CursorType.MOVE,
      add: cursorStyle === CursorType.ADD,
      resize: cursorStyle === CursorType.RESIZE,
      close: cursorStyle === CursorType.CLOSE,
      cancel: cursorStyle === CursorType.CANCEL,
      grab: cursorStyle === CursorType.GRAB,
      grabbing: cursorStyle === CursorType.GRABBING,
    });
  };
}
