import React, { useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector, Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import styled from 'styled-components';
import find from 'lodash.find';
import isEqual from 'lodash.isequal';
import Scrollbars from 'react-custom-scrollbars';
import { ifProp } from 'styled-tools';

var EventType;

(function (EventType) {
  EventType["RESIZE"] = "resize";
  EventType["MOUSE_UP"] = "mouseup";
  EventType["MOUSE_DOWN"] = "mousedown";
  EventType["MOUSE_MOVE"] = "mousemove";
  EventType["MOUSE_WHEEL"] = "wheel";
  EventType["KEY_DOWN"] = "keydown";
  EventType["KEY_PRESS"] = "keypress";
  EventType["KEY_UP"] = "keyup";
  EventType["FOCUS"] = "focus";
})(EventType || (EventType = {}));

var Action;

(function (Action) {
  Action["UPDATE_SUGGESTED_LABEL_LIST"] = "@@UPDATE_SUGGESTED_LABEL_LIST";
  Action["UPDATE_REJECTED_SUGGESTED_LABEL_LIST"] = "@@UPDATE_REJECTED_SUGGESTED_LABEL_LIST";
  Action["UPDATE_OBJECT_DETECTOR_STATUS"] = "@@UPDATE_OBJECT_DETECTOR_STATUS";
  Action["UPDATE_POSE_DETECTOR_STATUS"] = "@@UPDATE_POSE_DETECTOR_STATUS";
  Action["UPDATE_DISABLED_AI_FLAG"] = "@@UPDATE_DISABLED_AI_FLAG";
  Action["UPDATE_PROJECT_DATA"] = "@@UPDATE_PROJECT_DATA";
  Action["UPDATE_WINDOW_SIZE"] = "@@UPDATE_WINDOW_SIZE";
  Action["UPDATE_CUSTOM_CURSOR_STYLE"] = "@@UPDATE_CUSTOM_CURSOR_STYLE";
  Action["UPDATE_PREVENT_CUSTOM_CURSOR_STATUS"] = "@@UPDATE_PREVENT_CUSTOM_CURSOR_STATUS";
  Action["UPDATE_IMAGE_DRAG_MODE_STATUS"] = "@@UPDATE_IMAGE_DRAG_MODE_STATUS";
  Action["UPDATE_ZOOM"] = "@@UPDATE_ZOOM";
  Action["UPDATE_ACTIVE_IMAGE_INDEX"] = "@@UPDATE_ACTIVE_IMAGE_INDEX";
  Action["UPDATE_IMAGE_DATA_BY_ID"] = "@@UPDATE_IMAGE_DATA_BY_ID";
  Action["ADD_IMAGES_DATA"] = "@@ADD_IMAGES_DATA";
  Action["UPDATE_IMAGES_DATA"] = "@@UPDATE_IMAGES_DATA";
  Action["UPDATE_ACTIVE_LABEL_NAME_ID"] = "@@UPDATE_ACTIVE_LABEL_NAME_ID";
  Action["UPDATE_ACTIVE_LABEL_TYPE"] = "@@UPDATE_ACTIVE_LABEL_TYPE";
  Action["UPDATE_ACTIVE_LABEL_ID"] = "@@UPDATE_ACTIVE_LABEL_ID";
  Action["UPDATE_HIGHLIGHTED_LABEL_ID"] = "@@UPDATE_HIGHLIGHTED_LABEL_ID";
  Action["UPDATE_LABEL_NAMES"] = "@@UPDATE_LABEL_NAMES";
  Action["UPDATE_FIRST_LABEL_CREATED_FLAG"] = "@@UPDATE_FIRST_LABEL_CREATED_FLAG";
})(Action || (Action = {}));

function updateWindowSize(windowSize) {
  return {
    type: Action.UPDATE_WINDOW_SIZE,
    payload: {
      windowSize: windowSize
    }
  };
}
function updateCustomCursorStyle(customCursorStyle) {
  return {
    type: Action.UPDATE_CUSTOM_CURSOR_STYLE,
    payload: {
      customCursorStyle: customCursorStyle
    }
  };
}
function updateImageDragModeStatus(imageDragMode) {
  return {
    type: Action.UPDATE_IMAGE_DRAG_MODE_STATUS,
    payload: {
      imageDragMode: imageDragMode
    }
  };
}
function updateZoom(zoom) {
  return {
    type: Action.UPDATE_ZOOM,
    payload: {
      zoom: zoom
    }
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

var CursorType;

(function (CursorType) {
  CursorType["DEFAULT"] = "DEFAULT";
  CursorType["MOVE"] = "MOVE";
  CursorType["RESIZE"] = "RESIZE";
  CursorType["ADD"] = "ADD";
  CursorType["CANCEL"] = "CANCEL";
  CursorType["CLOSE"] = "CLOSE";
  CursorType["GRAB"] = "GRAB";
  CursorType["GRABBING"] = "GRABBING";
})(CursorType || (CursorType = {}));

var ViewPointSettings = function ViewPointSettings() {};
ViewPointSettings.CANVAS_MIN_MARGIN_PX = 20;
ViewPointSettings.MIN_ZOOM = 1;
ViewPointSettings.MAX_ZOOM = 4;
ViewPointSettings.ZOOM_STEP = 0.1;
ViewPointSettings.TRANSLATION_STEP_PX = 20;

var initialState = {
  windowSize: null,
  customCursorStyle: CursorType.DEFAULT,
  preventCustomCursor: false,
  imageDragMode: false,
  zoom: ViewPointSettings.MIN_ZOOM
};
function generalReducer(state, action) {
  if (state === void 0) {
    state = initialState;
  }

  switch (action.type) {
    case Action.UPDATE_WINDOW_SIZE:
      {
        return _extends(_extends({}, state), {}, {
          windowSize: action.payload.windowSize
        });
      }

    case Action.UPDATE_CUSTOM_CURSOR_STYLE:
      {
        return _extends(_extends({}, state), {}, {
          customCursorStyle: action.payload.customCursorStyle
        });
      }

    case Action.UPDATE_PREVENT_CUSTOM_CURSOR_STATUS:
      {
        return _extends(_extends({}, state), {}, {
          preventCustomCursor: action.payload.preventCustomCursor
        });
      }

    case Action.UPDATE_IMAGE_DRAG_MODE_STATUS:
      {
        return _extends(_extends({}, state), {}, {
          imageDragMode: action.payload.imageDragMode
        });
      }

    case Action.UPDATE_ZOOM:
      {
        return _extends(_extends({}, state), {}, {
          zoom: action.payload.zoom
        });
      }

    default:
      return state;
  }
}

var initialState$1 = {
  activeLabelNameId: null,
  activeLabelType: null,
  activeLabelId: null,
  highlightedLabelId: null,
  imagesData: [],
  firstLabelCreatedFlag: false,
  labels: []
};
function labelsReducer(state, action) {
  if (state === void 0) {
    state = initialState$1;
  }

  switch (action.type) {
    case Action.UPDATE_ACTIVE_LABEL_NAME_ID:
      {
        return _extends(_extends({}, state), {}, {
          activeLabelNameId: action.payload.activeLabelNameId
        });
      }

    case Action.UPDATE_ACTIVE_LABEL_ID:
      {
        return _extends(_extends({}, state), {}, {
          activeLabelId: action.payload.activeLabelId
        });
      }

    case Action.UPDATE_HIGHLIGHTED_LABEL_ID:
      {
        return _extends(_extends({}, state), {}, {
          highlightedLabelId: action.payload.highlightedLabelId
        });
      }

    case Action.UPDATE_ACTIVE_LABEL_TYPE:
      {
        return _extends(_extends({}, state), {}, {
          activeLabelType: action.payload.activeLabelType
        });
      }

    case Action.UPDATE_IMAGE_DATA_BY_ID:
      {
        return _extends(_extends({}, state), {}, {
          imagesData: state.imagesData.map(function (imageData) {
            return "0" === action.payload.id ? action.payload.newImageData : imageData;
          })
        });
      }

    case Action.ADD_IMAGES_DATA:
      {
        return _extends(_extends({}, state), {}, {
          imagesData: state.imagesData.concat(action.payload.imageData)
        });
      }

    case Action.UPDATE_IMAGES_DATA:
      {
        return _extends(_extends({}, state), {}, {
          imagesData: action.payload.imageData
        });
      }

    case Action.UPDATE_LABEL_NAMES:
      {
        return _extends(_extends({}, state), {}, {
          labels: action.payload.labels
        });
      }

    default:
      return state;
  }
}

var rootReducer = combineReducers({
  general: generalReducer,
  labels: labelsReducer
});

function configureStore() {
  return createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

var store = configureStore();
var AppInitializer = /*#__PURE__*/function () {
  function AppInitializer() {}

  AppInitializer.init = function init() {
    AppInitializer.handleResize();
    window.addEventListener(EventType.RESIZE, AppInitializer.handleResize);
  };

  return AppInitializer;
}();

AppInitializer.handleResize = function () {
  store.dispatch(updateWindowSize({
    width: window.innerWidth,
    height: window.innerHeight
  }));
};

var _IconPaths;
var move = "M10.9873 14.1734L11.047 20.4242L10.1004 19.4938C9.94253 19.3386 9.72945 19.2525 9.50806 19.2544C9.28667 19.2563 9.0751 19.346 8.9199 19.5039C8.7647 19.6618 8.67858 19.8749 8.68049 20.0963C8.68239 20.3177 8.77217 20.5292 8.93006 20.6844L11.3114 23.0252C11.3901 23.1007 11.4829 23.1601 11.5845 23.1999C11.7893 23.2825 12.0185 23.2805 12.2219 23.1944C12.3228 23.1528 12.4145 23.0919 12.4919 23.015L14.8326 20.6337C14.9878 20.4758 15.074 20.2627 15.0721 20.0413C15.0702 19.8199 14.9804 19.6083 14.8225 19.4531C14.6646 19.2979 14.4515 19.2118 14.2301 19.2137C14.0087 19.2156 13.7972 19.3054 13.642 19.4633L12.7115 20.4099L12.6637 14.159C12.6617 13.9367 12.5716 13.7243 12.4131 13.5684C12.2545 13.4126 12.0406 13.3261 11.8183 13.328C11.596 13.33 11.3835 13.4201 11.2277 13.5786C11.0719 13.7372 10.9854 13.9511 10.9873 14.1734V14.1734ZM3.18614 11.047L4.11657 10.1004C4.27177 9.94253 4.35789 9.72945 4.35599 9.50806C4.35408 9.28667 4.26431 9.07511 4.10642 8.91991C3.94852 8.76471 3.73544 8.67859 3.51405 8.68049C3.29266 8.6824 3.0811 8.77217 2.9259 8.93007L0.58518 11.3114C0.509651 11.3901 0.450284 11.4829 0.410438 11.5845C0.327862 11.7893 0.329834 12.0185 0.415923 12.2219C0.457511 12.3228 0.518465 12.4145 0.595337 12.4919L2.97669 14.8327C3.13458 14.9879 3.34766 15.074 3.56905 15.0721C3.79044 15.0702 4.00201 14.9804 4.1572 14.8225C4.3124 14.6646 4.39852 14.4515 4.39662 14.2301C4.39471 14.0087 4.30494 13.7972 4.14705 13.642L3.20046 12.7115L9.45135 12.6637C9.56155 12.6632 9.67056 12.6409 9.77209 12.598C9.87363 12.5552 9.96568 12.4927 10.0429 12.4141C10.1202 12.3355 10.1811 12.2424 10.2222 12.1401C10.2633 12.0379 10.2837 11.9285 10.2823 11.8183C10.2818 11.7081 10.2595 11.5991 10.2167 11.4975C10.1738 11.396 10.1113 11.304 10.0327 11.2267C9.95412 11.1495 9.86101 11.0885 9.75875 11.0474C9.6565 11.0064 9.54712 10.9859 9.43693 10.9873L3.18614 11.047ZM19.4531 8.78786C19.2979 8.94575 19.2118 9.15883 19.2137 9.38022C19.2156 9.60161 19.3054 9.81318 19.4633 9.96837L20.4099 10.8988L14.159 10.9467C13.9367 10.9486 13.7243 11.0387 13.5684 11.1973C13.4126 11.3558 13.3261 11.5698 13.328 11.7921C13.33 12.0144 13.4201 12.2268 13.5786 12.3826C13.7372 12.5385 13.9511 12.6249 14.1734 12.623L20.4242 12.5633L19.4938 13.5099C19.3386 13.6678 19.2524 13.8809 19.2544 14.1023C19.2563 14.3237 19.346 14.5352 19.5039 14.6904C19.6618 14.8456 19.8749 14.9318 20.0963 14.9299C20.3177 14.928 20.5292 14.8382 20.6844 14.6803L23.0252 12.2989C23.1007 12.2202 23.1601 12.1275 23.1999 12.0259C23.2825 11.821 23.2805 11.5918 23.1944 11.3884C23.1528 11.2876 23.0919 11.1958 23.015 11.1184L20.6337 8.7777C20.4758 8.6225 20.2627 8.53638 20.0413 8.53828C19.8199 8.54019 19.6083 8.62996 19.4531 8.78786ZM12.0259 0.410442C11.821 0.327866 11.5918 0.329839 11.3884 0.415928C11.2876 0.457516 11.1958 0.518469 11.1184 0.595342L8.7777 2.97669C8.6225 3.13458 8.53638 3.34766 8.53828 3.56905C8.54019 3.79044 8.62996 4.00201 8.78785 4.15721C8.94575 4.31241 9.15883 4.39853 9.38022 4.39662C9.60161 4.39472 9.81317 4.30494 9.96837 4.14705L10.8988 3.20046L10.9467 9.45135C10.9472 9.56155 10.9695 9.67056 11.0123 9.7721C11.0552 9.87363 11.1177 9.96568 11.1963 10.0429C11.2749 10.1202 11.368 10.1811 11.4702 10.2222C11.5725 10.2633 11.6819 10.2837 11.7921 10.2823C11.9023 10.2818 12.0113 10.2595 12.1128 10.2167C12.2143 10.1738 12.3064 10.1113 12.3836 10.0327C12.4609 9.95412 12.5218 9.86101 12.5629 9.75876C12.604 9.6565 12.6244 9.54712 12.623 9.43693L12.5633 3.18614L13.5099 4.11658C13.6678 4.27178 13.8809 4.3579 14.1023 4.35599C14.3237 4.35409 14.5352 4.26431 14.6904 4.10642C14.8456 3.94853 14.9318 3.73545 14.9299 3.51406C14.9279 3.29267 14.8382 3.0811 14.6803 2.9259L12.2989 0.585184C12.2202 0.509655 12.1274 0.450288 12.0259 0.410442V0.410442Z";
var cancel = "M13.41 12L17.71 7.71C17.8983 7.5217 18.0041 7.2663 18.0041 7C18.0041 6.7337 17.8983 6.47831 17.71 6.29C17.5217 6.1017 17.2663 5.99591 17 5.99591C16.7337 5.99591 16.4783 6.1017 16.29 6.29L12 10.59L7.71 6.29C7.5217 6.1017 7.2663 5.99591 7 5.99591C6.7337 5.99591 6.4783 6.1017 6.29 6.29C6.1017 6.47831 5.99591 6.7337 5.99591 7C5.99591 7.2663 6.1017 7.5217 6.29 7.71L10.59 12L6.29 16.29C6.19627 16.383 6.12188 16.4936 6.07111 16.6154C6.02034 16.7373 5.9942 16.868 5.9942 17C5.9942 17.132 6.02034 17.2627 6.07111 17.3846C6.12188 17.5064 6.19627 17.617 6.29 17.71C6.38296 17.8037 6.49356 17.8781 6.61542 17.9289C6.73728 17.9797 6.86799 18.0058 7 18.0058C7.13201 18.0058 7.26272 17.9797 7.38458 17.9289C7.50644 17.8781 7.61704 17.8037 7.71 17.71L12 13.41L16.29 17.71C16.383 17.8037 16.4936 17.8781 16.6154 17.9289C16.7373 17.9797 16.868 18.0058 17 18.0058C17.132 18.0058 17.2627 17.9797 17.3846 17.9289C17.5064 17.8781 17.617 17.8037 17.71 17.71C17.8037 17.617 17.8781 17.5064 17.9289 17.3846C17.9797 17.2627 18.0058 17.132 18.0058 17C18.0058 16.868 17.9797 16.7373 17.9289 16.6154C17.8781 16.4936 17.8037 16.383 17.71 16.29L13.41 12Z";
var crosshair = "M21 11H19.93C19.7068 9.23998 18.9049 7.60408 17.6504 6.34959C16.3959 5.0951 14.76 4.29319 13 4.07V3C13 2.73478 12.8946 2.48043 12.7071 2.29289C12.5196 2.10536 12.2652 2 12 2C11.7348 2 11.4804 2.10536 11.2929 2.29289C11.1054 2.48043 11 2.73478 11 3V4.07C9.23998 4.29319 7.60408 5.0951 6.34959 6.34959C5.0951 7.60408 4.29319 9.23998 4.07 11H3C2.73478 11 2.48043 11.1054 2.29289 11.2929C2.10536 11.4804 2 11.7348 2 12C2 12.2652 2.10536 12.5196 2.29289 12.7071C2.48043 12.8946 2.73478 13 3 13H4.07C4.29319 14.76 5.0951 16.3959 6.34959 17.6504C7.60408 18.9049 9.23998 19.7068 11 19.93V21C11 21.2652 11.1054 21.5196 11.2929 21.7071C11.4804 21.8946 11.7348 22 12 22C12.2652 22 12.5196 21.8946 12.7071 21.7071C12.8946 21.5196 13 21.2652 13 21V19.93C14.76 19.7068 16.3959 18.9049 17.6504 17.6504C18.9049 16.3959 19.7068 14.76 19.93 13H21C21.2652 13 21.5196 12.8946 21.7071 12.7071C21.8946 12.5196 22 12.2652 22 12C22 11.7348 21.8946 11.4804 21.7071 11.2929C21.5196 11.1054 21.2652 11 21 11ZM17 13H17.91C17.7016 14.2264 17.1171 15.3578 16.2374 16.2374C15.3578 17.1171 14.2264 17.7016 13 17.91V17C13 16.7348 12.8946 16.4804 12.7071 16.2929C12.5196 16.1054 12.2652 16 12 16C11.7348 16 11.4804 16.1054 11.2929 16.2929C11.1054 16.4804 11 16.7348 11 17V17.91C9.77356 17.7016 8.64222 17.1171 7.76256 16.2374C6.8829 15.3578 6.29842 14.2264 6.09 13H7C7.26522 13 7.51957 12.8946 7.70711 12.7071C7.89464 12.5196 8 12.2652 8 12C8 11.7348 7.89464 11.4804 7.70711 11.2929C7.51957 11.1054 7.26522 11 7 11H6.09C6.29842 9.77356 6.8829 8.64222 7.76256 7.76256C8.64222 6.8829 9.77356 6.29842 11 6.09V7C11 7.26522 11.1054 7.51957 11.2929 7.70711C11.4804 7.89464 11.7348 8 12 8C12.2652 8 12.5196 7.89464 12.7071 7.70711C12.8946 7.51957 13 7.26522 13 7V6.09C14.2264 6.29842 15.3578 6.8829 16.2374 7.76256C17.1171 8.64222 17.7016 9.77356 17.91 11H17C16.7348 11 16.4804 11.1054 16.2929 11.2929C16.1054 11.4804 16 11.7348 16 12C16 12.2652 16.1054 12.5196 16.2929 12.7071C16.4804 12.8946 16.7348 13 17 13ZM12 11C11.8022 11 11.6089 11.0586 11.4444 11.1685C11.28 11.2784 11.1518 11.4346 11.0761 11.6173C11.0004 11.8 10.9806 12.0011 11.0192 12.1951C11.0578 12.3891 11.153 12.5673 11.2929 12.7071C11.4327 12.847 11.6109 12.9422 11.8049 12.9808C11.9989 13.0194 12.2 12.9996 12.3827 12.9239C12.5654 12.8482 12.7216 12.72 12.8315 12.5556C12.9414 12.3911 13 12.1978 13 12C13 11.7348 12.8946 11.4804 12.7071 11.2929C12.5196 11.1054 12.2652 11 12 11Z";
var IconPaths = (_IconPaths = {}, _IconPaths[CursorType.MOVE] = move, _IconPaths[CursorType.CANCEL] = cancel, _IconPaths[CursorType.GRAB] = crosshair, _IconPaths[CursorType.GRABBING] = crosshair, _IconPaths);

function _templateObject() {
  var data = _taggedTemplateLiteralLoose([""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var SVG = styled.svg(_templateObject());

var Icon = function Icon(_ref) {
  var d = _ref.d,
      props = _objectWithoutPropertiesLoose(_ref, ["d"]);

  return React.createElement(SVG, Object.assign({
    viewBox: "0 0 24 24"
  }, props), React.createElement("path", {
    d: d
  }));
};

Icon.className = SVG;

var LabelType;

(function (LabelType) {
  LabelType["NAME"] = "NAME";
  LabelType["RECTANGLE"] = "RECTANGLE";
  LabelType["POLYGON"] = "POLYGON";
})(LabelType || (LabelType = {}));

var EditorModel = function EditorModel() {};
EditorModel.isLoading = false;
EditorModel.viewPortActionsDisabled = false;

var GeneralSelector = /*#__PURE__*/function () {
  function GeneralSelector() {}

  GeneralSelector.getPreventCustomCursorStatus = function getPreventCustomCursorStatus() {
    return store.getState().general.preventCustomCursor;
  };

  GeneralSelector.getImageDragModeStatus = function getImageDragModeStatus() {
    return store.getState().general.imageDragMode;
  };

  GeneralSelector.getCustomCursorStyle = function getCustomCursorStyle() {
    return store.getState().general.customCursorStyle;
  };

  GeneralSelector.getZoom = function getZoom() {
    return store.getState().general.zoom;
  };

  return GeneralSelector;
}();

var Direction;

(function (Direction) {
  Direction["TOP"] = "TOP";
  Direction["BOTTOM"] = "BOTTOM";
  Direction["LEFT"] = "LEFT";
  Direction["RIGHT"] = "RIGHT";
  Direction["TOP_RIGHT"] = "TOP_RIGHT";
  Direction["TOP_LEFT"] = "TOP_LEFT";
  Direction["BOTTOM_RIGHT"] = "BOTTOM_RIGHT";
  Direction["BOTTOM_LEFT"] = "BOTTOM_LEFT";
  Direction["CENTER"] = "CENTER";
})(Direction || (Direction = {}));

var DirectionUtil = /*#__PURE__*/function () {
  function DirectionUtil() {}

  DirectionUtil.convertDirectionToVector = function convertDirectionToVector(direction) {
    switch (direction) {
      case Direction.RIGHT:
        return {
          x: 1,
          y: 0
        };

      case Direction.LEFT:
        return {
          x: -1,
          y: 0
        };

      case Direction.TOP:
        return {
          x: 0,
          y: 1
        };

      case Direction.BOTTOM:
        return {
          x: 0,
          y: -1
        };

      case Direction.TOP_RIGHT:
        return {
          x: 1,
          y: 1
        };

      case Direction.TOP_LEFT:
        return {
          x: -1,
          y: 1
        };

      case Direction.BOTTOM_RIGHT:
        return {
          x: 1,
          y: -1
        };

      case Direction.BOTTOM_LEFT:
        return {
          x: -1,
          y: -1
        };

      case Direction.CENTER:
        return {
          x: 0,
          y: 0
        };

      default:
        return null;
    }
  };

  return DirectionUtil;
}();

var ImageUtil = /*#__PURE__*/function () {
  function ImageUtil() {}

  ImageUtil.getSize = function getSize(image) {
    if (!image) return null;
    return {
      width: image.width,
      height: image.height
    };
  };

  return ImageUtil;
}();

var NumberUtil = /*#__PURE__*/function () {
  function NumberUtil() {}

  NumberUtil.snapValueToRange = function snapValueToRange(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
  };

  NumberUtil.isValueInRange = function isValueInRange(value, min, max) {
    return value >= min && value <= max;
  };

  return NumberUtil;
}();

var PointUtil = /*#__PURE__*/function () {
  function PointUtil() {}

  PointUtil.equals = function equals(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
  };

  PointUtil.add = function add(p1, p2) {
    return {
      x: p1.x + p2.x,
      y: p1.y + p2.y
    };
  };

  PointUtil.subtract = function subtract(p1, p2) {
    return {
      x: p1.x - p2.x,
      y: p1.y - p2.y
    };
  };

  PointUtil.multiply = function multiply(p1, factor) {
    return {
      x: p1.x * factor,
      y: p1.y * factor
    };
  };

  PointUtil.getEuclidianDistance = function getEuclidianDistance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  };

  return PointUtil;
}();

var RectUtil = /*#__PURE__*/function () {
  function RectUtil() {}

  RectUtil.getRatio = function getRatio(rect) {
    if (!rect) return null;
    return rect.width / rect.height;
  };

  RectUtil.intersect = function intersect(r1, r2) {
    if (!r1 || !r2) return null;
    return !(r2.x > r1.x + r1.width || r2.x + r2.width < r1.x || r2.y > r1.y + r1.height || r2.y + r2.height < r1.y);
  };

  RectUtil.isPointInside = function isPointInside(rect, point) {
    if (!rect || !point) return null;
    return rect.x < point.x && rect.x + rect.width > point.x && rect.y < point.y && rect.y + rect.height > point.y;
  };

  RectUtil.getRectWithCenterAndSize = function getRectWithCenterAndSize(centerPoint, size) {
    return _extends({
      x: centerPoint.x - 0.5 * size.width,
      y: centerPoint.y - 0.5 * size.height
    }, size);
  };

  RectUtil.fitInsideRectWithRatio = function fitInsideRectWithRatio(containerRect, ratio) {
    var containerRectRatio = RectUtil.getRatio(containerRect);

    if (containerRectRatio < ratio) {
      var innerRectHeight = containerRect.width / ratio;
      return {
        x: containerRect.x,
        y: containerRect.y + (containerRect.height - innerRectHeight) / 2,
        width: containerRect.width,
        height: innerRectHeight
      };
    } else {
      var innerRectWidth = containerRect.height * ratio;
      return {
        x: containerRect.x + (containerRect.width - innerRectWidth) / 2,
        y: containerRect.y,
        width: innerRectWidth,
        height: containerRect.height
      };
    }
  };

  RectUtil.resizeRect = function resizeRect(inputRect, rectAnchor, delta) {
    var rect = _extends({}, inputRect);

    switch (rectAnchor) {
      case Direction.RIGHT:
        rect.width += delta.x;
        break;

      case Direction.BOTTOM_RIGHT:
        rect.width += delta.x;
        rect.height += delta.y;
        break;

      case Direction.BOTTOM:
        rect.height += delta.y;
        break;

      case Direction.TOP_RIGHT:
        rect.width += delta.x;
        rect.y += delta.y;
        rect.height -= delta.y;
        break;

      case Direction.TOP:
        rect.y += delta.y;
        rect.height -= delta.y;
        break;

      case Direction.TOP_LEFT:
        rect.x += delta.x;
        rect.width -= delta.x;
        rect.y += delta.y;
        rect.height -= delta.y;
        break;

      case Direction.LEFT:
        rect.x += delta.x;
        rect.width -= delta.x;
        break;

      case Direction.BOTTOM_LEFT:
        rect.x += delta.x;
        rect.width -= delta.x;
        rect.height += delta.y;
        break;
    }

    if (rect.width < 0) {
      rect.x = rect.x + rect.width;
      rect.width = -rect.width;
    }

    if (rect.height < 0) {
      rect.y = rect.y + rect.height;
      rect.height = -rect.height;
    }

    return rect;
  };

  RectUtil.translate = function translate(rect, delta) {
    return _extends(_extends({}, rect), {}, {
      x: rect.x + delta.x,
      y: rect.y + delta.y
    });
  };

  RectUtil.expand = function expand(rect, delta) {
    return {
      x: rect.x - delta.x,
      y: rect.y - delta.y,
      width: rect.width + 2 * delta.x,
      height: rect.height + 2 * delta.y
    };
  };

  RectUtil.scaleRect = function scaleRect(rect, scale) {
    return {
      x: rect.x * scale,
      y: rect.y * scale,
      width: rect.width * scale,
      height: rect.height * scale
    };
  };

  RectUtil.mapRectToAnchors = function mapRectToAnchors(rect) {
    return [{
      type: Direction.TOP_LEFT,
      position: {
        x: rect.x,
        y: rect.y
      }
    }, {
      type: Direction.TOP,
      position: {
        x: rect.x + 0.5 * rect.width,
        y: rect.y
      }
    }, {
      type: Direction.TOP_RIGHT,
      position: {
        x: rect.x + rect.width,
        y: rect.y
      }
    }, {
      type: Direction.LEFT,
      position: {
        x: rect.x,
        y: rect.y + 0.5 * rect.height
      }
    }, {
      type: Direction.RIGHT,
      position: {
        x: rect.x + rect.width,
        y: rect.y + 0.5 * rect.height
      }
    }, {
      type: Direction.BOTTOM_LEFT,
      position: {
        x: rect.x,
        y: rect.y + rect.height
      }
    }, {
      type: Direction.BOTTOM,
      position: {
        x: rect.x + 0.5 * rect.width,
        y: rect.y + rect.height
      }
    }, {
      type: Direction.BOTTOM_RIGHT,
      position: {
        x: rect.x + rect.width,
        y: rect.y + rect.height
      }
    }];
  };

  RectUtil.snapPointToRect = function snapPointToRect(point, rect) {
    if (RectUtil.isPointInside(rect, point)) return point;
    return {
      x: NumberUtil.snapValueToRange(point.x, rect.x, rect.x + rect.width),
      y: NumberUtil.snapValueToRange(point.y, rect.y, rect.y + rect.height)
    };
  };

  return RectUtil;
}();

var SizeUtil = /*#__PURE__*/function () {
  function SizeUtil() {}

  SizeUtil.scale = function scale(size, _scale) {
    return {
      width: size.width * _scale,
      height: size.height * _scale
    };
  };

  return SizeUtil;
}();

var ViewPortActions = /*#__PURE__*/function () {
  function ViewPortActions() {}

  ViewPortActions.updateViewPortSize = function updateViewPortSize() {
    if (!!EditorModel.editor) {
      EditorModel.viewPortSize = {
        width: EditorModel.editor.offsetWidth,
        height: EditorModel.editor.offsetHeight
      };
    }
  };

  ViewPortActions.updateDefaultViewPortImageRect = function updateDefaultViewPortImageRect() {
    if (!!EditorModel.viewPortSize && !!EditorModel.image) {
      var minMargin = {
        x: ViewPointSettings.CANVAS_MIN_MARGIN_PX,
        y: ViewPointSettings.CANVAS_MIN_MARGIN_PX
      };

      var realImageRect = _extends({
        x: 0,
        y: 0
      }, ImageUtil.getSize(EditorModel.image));

      var viewPortWithMarginRect = _extends({
        x: 0,
        y: 0
      }, EditorModel.viewPortSize);

      var viewPortWithoutMarginRect = RectUtil.expand(viewPortWithMarginRect, PointUtil.multiply(minMargin, -1));
      EditorModel.defaultRenderImageRect = RectUtil.fitInsideRectWithRatio(viewPortWithoutMarginRect, RectUtil.getRatio(realImageRect));
    }
  };

  ViewPortActions.calculateViewPortContentSize = function calculateViewPortContentSize() {
    if (!!EditorModel.viewPortSize && !!EditorModel.image) {
      var defaultViewPortImageRect = EditorModel.defaultRenderImageRect;
      var scaledImageSize = SizeUtil.scale(EditorModel.defaultRenderImageRect, GeneralSelector.getZoom());
      return {
        width: scaledImageSize.width + 2 * defaultViewPortImageRect.x,
        height: scaledImageSize.height + 2 * defaultViewPortImageRect.y
      };
    } else {
      return null;
    }
  };

  ViewPortActions.calculateViewPortContentImageRect = function calculateViewPortContentImageRect() {
    if (!!EditorModel.viewPortSize && !!EditorModel.image) {
      var defaultViewPortImageRect = EditorModel.defaultRenderImageRect;
      var viewPortContentSize = ViewPortActions.calculateViewPortContentSize();
      return _extends(_extends({}, defaultViewPortImageRect), {}, {
        width: viewPortContentSize.width - 2 * defaultViewPortImageRect.x,
        height: viewPortContentSize.height - 2 * defaultViewPortImageRect.y
      });
    } else {
      return null;
    }
  };

  ViewPortActions.resizeCanvas = function resizeCanvas(newCanvasSize) {
    if (!!newCanvasSize && !!EditorModel.canvas) {
      EditorModel.canvas.width = newCanvasSize.width;
      EditorModel.canvas.height = newCanvasSize.height;
    }
  };

  ViewPortActions.resizeViewPortContent = function resizeViewPortContent() {
    var viewPortContentSize = ViewPortActions.calculateViewPortContentSize();
    viewPortContentSize && ViewPortActions.resizeCanvas(viewPortContentSize);
  };

  ViewPortActions.calculateAbsoluteScrollPosition = function calculateAbsoluteScrollPosition(relativePosition) {
    var viewPortContentSize = ViewPortActions.calculateViewPortContentSize();
    var viewPortSize = EditorModel.viewPortSize;
    return {
      x: relativePosition.x * (viewPortContentSize.width - viewPortSize.width),
      y: relativePosition.y * (viewPortContentSize.height - viewPortSize.height)
    };
  };

  ViewPortActions.getRelativeScrollPosition = function getRelativeScrollPosition() {
    if (!!EditorModel.viewPortScrollbars) {
      var values = EditorModel.viewPortScrollbars.getValues();
      return {
        x: values.left,
        y: values.top
      };
    } else {
      return null;
    }
  };

  ViewPortActions.getAbsoluteScrollPosition = function getAbsoluteScrollPosition() {
    if (!!EditorModel.viewPortScrollbars) {
      var values = EditorModel.viewPortScrollbars.getValues();
      return {
        x: values.scrollLeft,
        y: values.scrollTop
      };
    } else {
      return null;
    }
  };

  ViewPortActions.setScrollPosition = function setScrollPosition(position) {
    EditorModel.viewPortScrollbars.scrollLeft(position.x);
    EditorModel.viewPortScrollbars.scrollTop(position.y);
  };

  ViewPortActions.translateViewPortPosition = function translateViewPortPosition(direction) {
    if (EditorModel.viewPortActionsDisabled) return;
    var directionVector = DirectionUtil.convertDirectionToVector(direction);
    var translationVector = PointUtil.multiply(directionVector, ViewPointSettings.TRANSLATION_STEP_PX);
    var currentScrollPosition = ViewPortActions.getAbsoluteScrollPosition();
    var nextScrollPosition = PointUtil.add(currentScrollPosition, translationVector);
    ViewPortActions.setScrollPosition(nextScrollPosition);
    EditorActions.fullRender();
  };

  ViewPortActions.setZoom = function setZoom(value) {
    var currentZoom = GeneralSelector.getZoom();
    var isNewValueValid = NumberUtil.isValueInRange(value, ViewPointSettings.MIN_ZOOM, ViewPointSettings.MAX_ZOOM);

    if (isNewValueValid && value !== currentZoom) {
      store.dispatch(updateZoom(value));
    }
  };

  return ViewPortActions;
}();

var MouseEventUtil = /*#__PURE__*/function () {
  function MouseEventUtil() {}

  MouseEventUtil.getEventType = function getEventType(event) {
    if (!event) return null;

    switch (event.type) {
      case EventType.MOUSE_DOWN:
        return EventType.MOUSE_DOWN;

      case EventType.MOUSE_UP:
        return EventType.MOUSE_UP;

      case EventType.MOUSE_MOVE:
        return EventType.MOUSE_MOVE;

      default:
        return null;
    }
  };

  return MouseEventUtil;
}();

var ViewPortHelper = /*#__PURE__*/function () {
  function ViewPortHelper() {}

  var _proto = ViewPortHelper.prototype;

  _proto.update = function update(data) {
    if (!!data.event) {
      switch (MouseEventUtil.getEventType(data.event)) {
        case EventType.MOUSE_MOVE:
          this.mouseMoveHandler(data);
          break;

        case EventType.MOUSE_UP:
          this.mouseUpHandler();
          break;

        case EventType.MOUSE_DOWN:
          this.mouseDownHandler(data);
          break;
      }
    }
  };

  _proto.mouseDownHandler = function mouseDownHandler(data) {
    var event = data.event;
    this.startScrollPosition = data.absoluteViewPortContentScrollPosition;
    this.mouseStartPosition = {
      x: event.screenX,
      y: event.screenY
    };
    store.dispatch(updateCustomCursorStyle(CursorType.GRABBING));
    EditorModel.canvas.style.cursor = 'none';
  };

  _proto.mouseUpHandler = function mouseUpHandler() {
    this.startScrollPosition = null;
    this.mouseStartPosition = null;
    store.dispatch(updateCustomCursorStyle(CursorType.GRAB));
    EditorModel.canvas.style.cursor = 'none';
  };

  _proto.mouseMoveHandler = function mouseMoveHandler(data) {
    if (!!this.startScrollPosition && !!this.mouseStartPosition) {
      var event = data.event;
      var currentMousePosition = {
        x: event.screenX,
        y: event.screenY
      };
      var mousePositionDelta = PointUtil.subtract(currentMousePosition, this.mouseStartPosition);
      var nextScrollPosition = PointUtil.subtract(this.startScrollPosition, mousePositionDelta);
      ViewPortActions.setScrollPosition(nextScrollPosition);
      store.dispatch(updateCustomCursorStyle(CursorType.GRABBING));
    } else {
      store.dispatch(updateCustomCursorStyle(CursorType.GRAB));
    }

    EditorModel.canvas.style.cursor = 'none';
  };

  return ViewPortHelper;
}();

var PopupWindowType;

(function (PopupWindowType) {
  PopupWindowType["LOAD_LABEL_NAMES"] = "LOAD_LABEL_NAMES";
  PopupWindowType["UPDATE_LABEL_NAMES"] = "UPDATE_LABEL_NAMES";
  PopupWindowType["SUGGEST_LABEL_NAMES"] = "SUGGEST_LABEL_NAMES";
  PopupWindowType["LOAD_IMAGES"] = "LOAD_IMAGES";
  PopupWindowType["LOAD_AI_MODEL"] = "LOAD_AI_MODEL";
  PopupWindowType["EXPORT_LABELS"] = "EXPORT_LABELS";
  PopupWindowType["INSERT_LABEL_NAMES"] = "INSERT_LABEL_NAMES";
  PopupWindowType["EXIT_PROJECT"] = "EXIT_PROJECT";
  PopupWindowType["LOADER"] = "LOADER";
})(PopupWindowType || (PopupWindowType = {}));

var Settings = function Settings() {};
Settings.GITHUB_URL = 'https://github.com/SkalskiP';
Settings.MEDIUM_URL = 'https://medium.com/@piotr.skalski92';
Settings.PATREON_URL = 'https://www.patreon.com/make_sense';
Settings.TOP_NAVIGATION_BAR_HEIGHT_PX = 35;
Settings.EDITOR_BOTTOM_NAVIGATION_BAR_HEIGHT_PX = 40 + 1;
Settings.EDITOR_TOP_NAVIGATION_BAR_HEIGHT_PX = 40 + 1;
Settings.SIDE_NAVIGATION_BAR_WIDTH_CLOSED_PX = 23 + 1;
Settings.SIDE_NAVIGATION_BAR_WIDTH_OPEN_PX = Settings.SIDE_NAVIGATION_BAR_WIDTH_CLOSED_PX + 300 + 1;
Settings.TOOLKIT_TAB_HEIGHT_PX = 40;
Settings.TOOLBOX_PANEL_WIDTH_PX = 50 + 1;
Settings.EDITOR_MIN_WIDTH = 900;
Settings.EDITOR_MIN_HEIGHT = 500;
Settings.PRIMARY_COLOR = '#F8C182';
Settings.SECONDARY_COLOR = '#EC77FF';
Settings.DARK_THEME_FIRST_COLOR = '#171717';
Settings.DARK_THEME_SECOND_COLOR = '#282828';
Settings.DARK_THEME_THIRD_COLOR = '#4c4c4c';
Settings.DARK_THEME_FORTH_COLOR = '#262c2f';
Settings.CROSS_HAIR_THICKNESS_PX = 1;
Settings.CROSS_HAIR_COLOR = '#fff';
Settings.RESIZE_HANDLE_DIMENSION_PX = 8;
Settings.RESIZE_HANDLE_HOVER_DIMENSION_PX = 16;
Settings.CLOSEABLE_POPUPS = [PopupWindowType.LOAD_IMAGES, PopupWindowType.EXPORT_LABELS, PopupWindowType.EXIT_PROJECT, PopupWindowType.UPDATE_LABEL_NAMES];

var RenderEngineConfig = function RenderEngineConfig() {
  this.lineThickness = 2;
  this.lineActiveColor = Settings.PRIMARY_COLOR;
  this.lineInactiveColor = '#fff';
  this.anchorSize = {
    width: Settings.RESIZE_HANDLE_DIMENSION_PX,
    height: Settings.RESIZE_HANDLE_DIMENSION_PX
  };
  this.anchorHoverSize = {
    width: Settings.RESIZE_HANDLE_HOVER_DIMENSION_PX,
    height: Settings.RESIZE_HANDLE_HOVER_DIMENSION_PX
  };
  this.suggestedAnchorDetectionSize = {
    width: 100,
    height: 100
  };
  this.activeAnchorColor = Settings.SECONDARY_COLOR;
  this.inactiveAnchorColor = Settings.DARK_THEME_SECOND_COLOR;
};

function updateActiveLabelId(activeLabelId) {
  return {
    type: Action.UPDATE_ACTIVE_LABEL_ID,
    payload: {
      activeLabelId: activeLabelId
    }
  };
}
function updateHighlightedLabelId(highlightedLabelId) {
  return {
    type: Action.UPDATE_HIGHLIGHTED_LABEL_ID,
    payload: {
      highlightedLabelId: highlightedLabelId
    }
  };
}
function updateActiveLabelType(activeLabelType) {
  return {
    type: Action.UPDATE_ACTIVE_LABEL_TYPE,
    payload: {
      activeLabelType: activeLabelType
    }
  };
}
function updateImageDataById(id, newImageData) {
  return {
    type: Action.UPDATE_IMAGE_DATA_BY_ID,
    payload: {
      id: id,
      newImageData: newImageData
    }
  };
}
function addImageData(imageData) {
  return {
    type: Action.ADD_IMAGES_DATA,
    payload: {
      imageData: imageData
    }
  };
}

var LabelsSelector = /*#__PURE__*/function () {
  function LabelsSelector() {}

  LabelsSelector.getLabelNames = function getLabelNames() {
    return store.getState().labels.labels;
  };

  LabelsSelector.getActiveLabelNameId = function getActiveLabelNameId() {
    return store.getState().labels.activeLabelNameId;
  };

  LabelsSelector.getActiveLabelType = function getActiveLabelType() {
    return store.getState().labels.activeLabelType;
  };

  LabelsSelector.getImagesData = function getImagesData() {
    return store.getState().labels.imagesData;
  };

  LabelsSelector.getActiveImageIndex = function getActiveImageIndex() {
    return 0;
  };

  LabelsSelector.getActiveImageData = function getActiveImageData() {
    var activeImageIndex = LabelsSelector.getActiveImageIndex();
    if (activeImageIndex === null) return null;
    return LabelsSelector.getImageDataByIndex(activeImageIndex);
  };

  LabelsSelector.getImageDataByIndex = function getImageDataByIndex(index) {
    var imagesData = LabelsSelector.getImagesData();
    return imagesData[index];
  };

  LabelsSelector.getImageDataById = function getImageDataById() {
    var imagesData = LabelsSelector.getImagesData();
    return imagesData[0];
  };

  LabelsSelector.getActiveLabelId = function getActiveLabelId() {
    return store.getState().labels.activeLabelId;
  };

  LabelsSelector.getHighlightedLabelId = function getHighlightedLabelId() {
    return store.getState().labels.highlightedLabelId;
  };

  LabelsSelector.getActiveRectLabel = function getActiveRectLabel() {
    var activeLabelId = LabelsSelector.getActiveLabelId();
    if (activeLabelId === null) return null;
    return find(LabelsSelector.getActiveImageData().labelRects, {
      id: activeLabelId
    });
  };

  LabelsSelector.getActivePolygonLabel = function getActivePolygonLabel() {
    var activeLabelId = LabelsSelector.getActiveLabelId();
    if (activeLabelId === null) return null;
    return find(LabelsSelector.getActiveImageData().labelPolygons, {
      id: activeLabelId
    });
  };

  return LabelsSelector;
}();

var UnitUtil = /*#__PURE__*/function () {
  function UnitUtil() {}

  UnitUtil.deg2rad = function deg2rad(angleDeg) {
    return angleDeg * Math.PI / 180;
  };

  UnitUtil.rad2deg = function rad2deg(angleRad) {
    return angleRad * 180 / Math.PI;
  };

  return UnitUtil;
}();

var DrawUtil = /*#__PURE__*/function () {
  function DrawUtil() {}

  DrawUtil.clearCanvas = function clearCanvas(canvas) {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  DrawUtil.drawLine = function drawLine(canvas, startPoint, endPoint, color, thickness) {
    if (color === void 0) {
      color = "#111111";
    }

    if (thickness === void 0) {
      thickness = 1;
    }

    var ctx = canvas.getContext('2d');
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(endPoint.x + 1, endPoint.y + 1);
    ctx.stroke();
    ctx.restore();
  };

  DrawUtil.drawRect = function drawRect(canvas, rect, color, thickness) {
    if (color === void 0) {
      color = "#fff";
    }

    if (thickness === void 0) {
      thickness = 1;
    }

    var ctx = canvas.getContext('2d');
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.beginPath();
    ctx.rect(rect.x, rect.y, rect.width, rect.height);
    ctx.stroke();
    ctx.restore();
  };

  DrawUtil.drawRectWithFill = function drawRectWithFill(canvas, rect, color) {
    if (color === void 0) {
      color = "#fff";
    }

    var ctx = canvas.getContext('2d');
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(rect.x, rect.y, rect.width, rect.height);
    ctx.fill();
    ctx.restore();
  };

  DrawUtil.shadeEverythingButRect = function shadeEverythingButRect(canvas, rect, color) {
    if (color === void 0) {
      color = "rgba(0, 0, 0, 0.7)";
    }

    var ctx = canvas.getContext('2d');
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    ctx.restore();
  };

  DrawUtil.drawCircleWithFill = function drawCircleWithFill(canvas, anchorPoint, radius, color) {
    if (color === void 0) {
      color = "#ffffff";
    }

    var ctx = canvas.getContext('2d');
    ctx.save();
    var startAngleRad = UnitUtil.deg2rad(0);
    var endAngleRad = UnitUtil.deg2rad(360);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(anchorPoint.x, anchorPoint.y, radius, startAngleRad, endAngleRad, false);
    ctx.fill();
    ctx.restore();
  };

  DrawUtil.drawCircle = function drawCircle(canvas, anchorPoint, radius, startAngleDeg, endAngleDeg, thickness, color) {
    if (thickness === void 0) {
      thickness = 20;
    }

    if (color === void 0) {
      color = "#ffffff";
    }

    var ctx = canvas.getContext('2d');
    var startAngleRad = UnitUtil.deg2rad(startAngleDeg);
    var endAngleRad = UnitUtil.deg2rad(endAngleDeg);
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.beginPath();
    ctx.arc(anchorPoint.x, anchorPoint.y, radius, startAngleRad, endAngleRad, false);
    ctx.stroke();
    ctx.restore();
  };

  DrawUtil.drawPolygon = function drawPolygon(canvas, anchors, color, thickness) {
    if (color === void 0) {
      color = "#fff";
    }

    if (thickness === void 0) {
      thickness = 1;
    }

    var ctx = canvas.getContext('2d');
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.beginPath();
    ctx.moveTo(anchors[0].x, anchors[0].y);

    for (var i = 1; i < anchors.length; i++) {
      ctx.lineTo(anchors[i].x, anchors[i].y);
    }

    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  };

  DrawUtil.drawPolygonWithFill = function drawPolygonWithFill(canvas, anchors, color) {
    if (color === void 0) {
      color = "#fff";
    }

    var ctx = canvas.getContext('2d');
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(anchors[0].x, anchors[0].y);

    for (var i = 1; i < anchors.length; i++) {
      ctx.lineTo(anchors[i].x, anchors[i].y);
    }

    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  DrawUtil.drawText = function drawText(canvas, text, textSize, anchorPoint, color, bold, align) {
    if (color === void 0) {
      color = "#ffffff";
    }

    if (bold === void 0) {
      bold = false;
    }

    if (align === void 0) {
      align = "center";
    }

    var ctx = canvas.getContext('2d');
    ctx.save();
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = "middle";
    ctx.font = (bold ? "bold " : "") + textSize + "px Arial";
    ctx.fillText(text, anchorPoint.x, anchorPoint.y);
    ctx.restore();
  };

  DrawUtil.getRandomRGBColor = function getRandomRGBColor() {
    return "rgb(" + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + ")";
  };

  DrawUtil.hexToRGB = function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  };

  return DrawUtil;
}();

var LineUtil = /*#__PURE__*/function () {
  function LineUtil() {}

  LineUtil.getDistanceFromLine = function getDistanceFromLine(l, p) {
    if (l.start.x !== l.end.x || l.start.y !== l.end.y) {
      var nom = Math.abs((l.end.y - l.start.y) * p.x - (l.end.x - l.start.x) * p.y + l.end.x * l.start.y - l.end.y * l.start.x);
      var denom = Math.sqrt(Math.pow(l.end.y - l.start.y, 2) + Math.pow(l.end.x - l.start.x, 2));
      return nom / denom;
    }

    return null;
  };

  LineUtil.getCenter = function getCenter(l) {
    return {
      x: (l.start.x + l.end.x) / 2,
      y: (l.start.y + l.end.y) / 2
    };
  };

  return LineUtil;
}();

var RenderEngineUtil = /*#__PURE__*/function () {
  function RenderEngineUtil() {}

  RenderEngineUtil.calculateImageScale = function calculateImageScale(data) {
    return data.realImageSize.width / data.viewPortContentImageRect.width;
  };

  RenderEngineUtil.isMouseOverImage = function isMouseOverImage(data) {
    return RectUtil.isPointInside(data.viewPortContentImageRect, data.mousePositionOnViewPortContent);
  };

  RenderEngineUtil.isMouseOverCanvas = function isMouseOverCanvas(data) {
    return RectUtil.isPointInside(_extends({
      x: 0,
      y: 0
    }, data.viewPortContentSize), data.mousePositionOnViewPortContent);
  };

  RenderEngineUtil.transferPolygonFromImageToViewPortContent = function transferPolygonFromImageToViewPortContent(polygon, data) {
    return polygon.map(function (point) {
      return RenderEngineUtil.transferPointFromImageToViewPortContent(point, data);
    });
  };

  RenderEngineUtil.transferPointFromImageToViewPortContent = function transferPointFromImageToViewPortContent(point, data) {
    var scale = RenderEngineUtil.calculateImageScale(data);
    return PointUtil.add(PointUtil.multiply(point, 1 / scale), data.viewPortContentImageRect);
  };

  RenderEngineUtil.transferPolygonFromViewPortContentToImage = function transferPolygonFromViewPortContentToImage(polygon, data) {
    return polygon.map(function (point) {
      return RenderEngineUtil.transferPointFromViewPortContentToImage(point, data);
    });
  };

  RenderEngineUtil.transferPointFromViewPortContentToImage = function transferPointFromViewPortContentToImage(point, data) {
    var scale = RenderEngineUtil.calculateImageScale(data);
    return PointUtil.multiply(PointUtil.subtract(point, data.viewPortContentImageRect), scale);
  };

  RenderEngineUtil.transferRectFromViewPortContentToImage = function transferRectFromViewPortContentToImage(rect, data) {
    var scale = RenderEngineUtil.calculateImageScale(data);
    return RectUtil.translate(RectUtil.scaleRect(rect, 1 / scale), data.viewPortContentImageRect);
  };

  RenderEngineUtil.transferRectFromImageToViewPortContent = function transferRectFromImageToViewPortContent(rect, data) {
    var scale = RenderEngineUtil.calculateImageScale(data);
    var translation = {
      x: -data.viewPortContentImageRect.x,
      y: -data.viewPortContentImageRect.y
    };
    return RectUtil.scaleRect(RectUtil.translate(rect, translation), scale);
  };

  RenderEngineUtil.wrapDefaultCursorStyleInCancel = function wrapDefaultCursorStyleInCancel(data) {
    if (RectUtil.isPointInside(data.viewPortContentImageRect, data.mousePositionOnViewPortContent)) {
      store.dispatch(updateCustomCursorStyle(CursorType.DEFAULT));
    } else {
      store.dispatch(updateCustomCursorStyle(CursorType.CANCEL));
    }
  };

  RenderEngineUtil.setValueBetweenPixels = function setValueBetweenPixels(value) {
    return Math.floor(value) + 0.5;
  };

  RenderEngineUtil.setPointBetweenPixels = function setPointBetweenPixels(point) {
    return {
      x: RenderEngineUtil.setValueBetweenPixels(point.x),
      y: RenderEngineUtil.setValueBetweenPixels(point.y)
    };
  };

  RenderEngineUtil.setRectBetweenPixels = function setRectBetweenPixels(rect) {
    var topLeft = {
      x: rect.x,
      y: rect.y
    };
    var bottomRight = {
      x: rect.x + rect.width,
      y: rect.y + rect.height
    };
    var topLeftBetweenPixels = RenderEngineUtil.setPointBetweenPixels(topLeft);
    var bottomRightBetweenPixels = RenderEngineUtil.setPointBetweenPixels(bottomRight);
    return {
      x: topLeftBetweenPixels.x,
      y: topLeftBetweenPixels.y,
      width: bottomRightBetweenPixels.x - topLeftBetweenPixels.x,
      height: bottomRightBetweenPixels.y - topLeftBetweenPixels.y
    };
  };

  return RenderEngineUtil;
}();

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var rngBrowser = createCommonjsModule(function (module) {
// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}
});

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]]
  ]).join('');
}

var bytesToUuid_1 = bytesToUuid;

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rngBrowser();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid_1(b);
}

var v1_1 = v1;

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rngBrowser)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid_1(rnds);
}

var v4_1 = v4;

var uuid = v4_1;
uuid.v1 = v1_1;
uuid.v4 = v4_1;

var uuid_1 = uuid;

var BaseRenderEngine = /*#__PURE__*/function () {
  function BaseRenderEngine(canvas) {
    this.canvas = canvas;
  }

  var _proto = BaseRenderEngine.prototype;

  _proto.update = function update(data, onLabelsDataChange) {
    if (!!data.event) {
      switch (MouseEventUtil.getEventType(data.event)) {
        case EventType.MOUSE_MOVE:
          this.mouseMoveHandler(data);
          break;

        case EventType.MOUSE_UP:
          this.mouseUpHandler(data, onLabelsDataChange);
          break;

        case EventType.MOUSE_DOWN:
          this.mouseDownHandler(data);
          break;
      }
    }
  };

  return BaseRenderEngine;
}();

var PolygonRenderEngine = /*#__PURE__*/function (_BaseRenderEngine) {
  _inheritsLoose(PolygonRenderEngine, _BaseRenderEngine);

  function PolygonRenderEngine(canvas) {
    var _this;

    _this = _BaseRenderEngine.call(this, canvas) || this;
    _this.config = new RenderEngineConfig();
    _this.activePath = [];
    _this.resizeAnchorIndex = null;
    _this.suggestedAnchorPositionOnCanvas = null;
    _this.suggestedAnchorIndexInPolygon = null;
    _this.labelType = LabelType.POLYGON;
    return _this;
  }

  var _proto = PolygonRenderEngine.prototype;

  _proto.update = function update(data, onLabelsDataChange) {
    if (!!data.event) {
      switch (MouseEventUtil.getEventType(data.event)) {
        case EventType.MOUSE_MOVE:
          this.mouseMoveHandler(data);
          break;

        case EventType.MOUSE_UP:
          this.mouseUpHandler(data, onLabelsDataChange);
          break;

        case EventType.MOUSE_DOWN:
          this.mouseDownHandler(data);
          break;
      }
    }
  };

  _proto.mouseDownHandler = function mouseDownHandler(data) {
    var _this2 = this;

    var isMouseOverCanvas = RenderEngineUtil.isMouseOverCanvas(data);

    if (isMouseOverCanvas) {
      if (this.isCreationInProgress()) {
        var isMouseOverStartAnchor = this.isMouseOverAnchor(data.mousePositionOnViewPortContent, this.activePath[0]);

        if (isMouseOverStartAnchor) {
          this.addLabelAndFinishCreation(data);
        } else {
          this.updateActivelyCreatedLabel(data);
        }
      } else {
        var polygonUnderMouse = this.getPolygonUnderMouse(data);

        if (!!polygonUnderMouse) {
          var anchorIndex = polygonUnderMouse.vertices.reduce(function (indexUnderMouse, anchor, index) {
            if (indexUnderMouse === null) {
              var anchorOnCanvas = RenderEngineUtil.transferPointFromImageToViewPortContent(anchor, data);

              if (_this2.isMouseOverAnchor(data.mousePositionOnViewPortContent, anchorOnCanvas)) {
                return index;
              }
            }

            return indexUnderMouse;
          }, null);

          if (anchorIndex !== null) {
            this.startExistingLabelResize(polygonUnderMouse.id, anchorIndex);
          } else {
            store.dispatch(updateActiveLabelId(polygonUnderMouse.id));
            var isMouseOverNewAnchor = this.isMouseOverAnchor(data.mousePositionOnViewPortContent, this.suggestedAnchorPositionOnCanvas);

            if (isMouseOverNewAnchor) {
              this.addSuggestedAnchorToPolygonLabel(data);
            }
          }
        } else {
          this.updateActivelyCreatedLabel(data);
        }
      }
    }
  };

  _proto.mouseUpHandler = function mouseUpHandler(data, onLabelsDataChange) {
    if (this.isResizeInProgress()) this.endExistingLabelResize(data, onLabelsDataChange);
  };

  _proto.mouseMoveHandler = function mouseMoveHandler(data) {
    if (!!data.viewPortContentImageRect && !!data.mousePositionOnViewPortContent) {
      var isOverImage = RenderEngineUtil.isMouseOverImage(data);

      if (isOverImage && !this.isCreationInProgress()) {
        var labelPolygon = this.getPolygonUnderMouse(data);

        if (!!labelPolygon && !this.isResizeInProgress()) {
          if (LabelsSelector.getHighlightedLabelId() !== labelPolygon.id) {
            store.dispatch(updateHighlightedLabelId(labelPolygon.id));
          }

          var pathOnCanvas = RenderEngineUtil.transferPolygonFromImageToViewPortContent(labelPolygon.vertices, data);
          var linesOnCanvas = this.mapPointsToLines(pathOnCanvas.concat(pathOnCanvas[0]));

          for (var j = 0; j < linesOnCanvas.length; j++) {
            if (this.isMouseOverLine(data.mousePositionOnViewPortContent, linesOnCanvas[j])) {
              this.suggestedAnchorPositionOnCanvas = LineUtil.getCenter(linesOnCanvas[j]);
              this.suggestedAnchorIndexInPolygon = j + 1;
              break;
            }
          }
        } else {
          if (LabelsSelector.getHighlightedLabelId() !== null) {
            store.dispatch(updateHighlightedLabelId(null));
            this.discardSuggestedPoint();
          }
        }
      }
    }
  };

  _proto.render = function render(data) {
    var imageData = LabelsSelector.getActiveImageData();

    if (imageData) {
      this.drawExistingLabels(data);
      this.drawActivelyCreatedLabel(data);
      this.drawActivelyResizeLabel(data);
      this.updateCursorStyle(data);
      this.drawSuggestedAnchor(data);
    }
  };

  _proto.updateCursorStyle = function updateCursorStyle(data) {
    if (!!this.canvas && !!data.mousePositionOnViewPortContent && !GeneralSelector.getImageDragModeStatus()) {
      var isMouseOverCanvas = RenderEngineUtil.isMouseOverCanvas(data);

      if (isMouseOverCanvas) {
        if (this.isCreationInProgress()) {
          var isMouseOverStartAnchor = this.isMouseOverAnchor(data.mousePositionOnViewPortContent, this.activePath[0]);
          if (isMouseOverStartAnchor && this.activePath.length > 2) store.dispatch(updateCustomCursorStyle(CursorType.CLOSE));else store.dispatch(updateCustomCursorStyle(CursorType.DEFAULT));
        } else {
          var anchorUnderMouse = this.getAnchorUnderMouse(data);
          var isMouseOverNewAnchor = this.isMouseOverAnchor(data.mousePositionOnViewPortContent, this.suggestedAnchorPositionOnCanvas);

          if (!!isMouseOverNewAnchor) {
            store.dispatch(updateCustomCursorStyle(CursorType.ADD));
          } else if (this.isResizeInProgress()) {
            store.dispatch(updateCustomCursorStyle(CursorType.MOVE));
          } else if (!!anchorUnderMouse) {
            store.dispatch(updateCustomCursorStyle(CursorType.MOVE));
          } else {
            RenderEngineUtil.wrapDefaultCursorStyleInCancel(data);
          }
        }

        this.canvas.style.cursor = 'none';
      } else {
        this.canvas.style.cursor = 'default';
      }
    }
  };

  _proto.drawActivelyCreatedLabel = function drawActivelyCreatedLabel(data) {
    var _this3 = this;

    var standardizedPoints = this.activePath.map(function (point) {
      return RenderEngineUtil.setPointBetweenPixels(point);
    });
    var path = standardizedPoints.concat(data.mousePositionOnViewPortContent);
    var lines = this.mapPointsToLines(path);
    DrawUtil.drawPolygonWithFill(this.canvas, path, DrawUtil.hexToRGB(this.config.lineActiveColor, 0.2));
    lines.forEach(function (line) {
      DrawUtil.drawLine(_this3.canvas, line.start, line.end, _this3.config.lineActiveColor, _this3.config.lineThickness);
    });
    this.mapPointsToAnchors(standardizedPoints).forEach(function (handleRect) {
      DrawUtil.drawRectWithFill(_this3.canvas, handleRect, _this3.config.activeAnchorColor);
    });
  };

  _proto.drawActivelyResizeLabel = function drawActivelyResizeLabel(data) {
    var _this4 = this;

    var activeLabelPolygon = LabelsSelector.getActivePolygonLabel();

    if (!!activeLabelPolygon && this.isResizeInProgress()) {
      var snappedMousePosition = RectUtil.snapPointToRect(data.mousePositionOnViewPortContent, data.viewPortContentImageRect);
      var polygonOnCanvas = activeLabelPolygon.vertices.map(function (point, index) {
        return index === _this4.resizeAnchorIndex ? snappedMousePosition : RenderEngineUtil.transferPointFromImageToViewPortContent(point, data);
      });
      this.drawPolygon(polygonOnCanvas, true);
    }
  };

  _proto.drawExistingLabels = function drawExistingLabels(data) {
    var _this5 = this;

    var activeLabelId = LabelsSelector.getActiveLabelId();
    var highlightedLabelId = LabelsSelector.getHighlightedLabelId();
    var imageData = LabelsSelector.getActiveImageData();
    imageData.labelPolygons.forEach(function (labelPolygon) {
      var isActive = labelPolygon.id === activeLabelId || labelPolygon.id === highlightedLabelId;
      var pathOnCanvas = RenderEngineUtil.transferPolygonFromImageToViewPortContent(labelPolygon.vertices, data);

      if (!(labelPolygon.id === activeLabelId && _this5.isResizeInProgress())) {
        _this5.drawPolygon(pathOnCanvas, isActive);
      }
    });
  };

  _proto.drawPolygon = function drawPolygon(polygon, isActive) {
    var _this6 = this;

    var color = isActive ? this.config.lineActiveColor : this.config.lineInactiveColor;
    var standardizedPoints = polygon.map(function (point) {
      return RenderEngineUtil.setPointBetweenPixels(point);
    });

    if (isActive) {
      DrawUtil.drawPolygonWithFill(this.canvas, standardizedPoints, DrawUtil.hexToRGB(color, 0.2));
    }

    DrawUtil.drawPolygon(this.canvas, standardizedPoints, color, this.config.lineThickness);

    if (isActive) {
      this.mapPointsToAnchors(standardizedPoints).forEach(function (handleRect) {
        DrawUtil.drawRectWithFill(_this6.canvas, handleRect, _this6.config.activeAnchorColor);
      });
    }
  };

  _proto.drawSuggestedAnchor = function drawSuggestedAnchor(data) {
    if (this.suggestedAnchorPositionOnCanvas) {
      var suggestedAnchorRect = RectUtil.getRectWithCenterAndSize(this.suggestedAnchorPositionOnCanvas, this.config.suggestedAnchorDetectionSize);
      var isMouseOverSuggestedAnchor = RectUtil.isPointInside(suggestedAnchorRect, data.mousePositionOnViewPortContent);

      if (isMouseOverSuggestedAnchor) {
        var handleRect = RectUtil.getRectWithCenterAndSize(this.suggestedAnchorPositionOnCanvas, this.config.anchorSize);
        DrawUtil.drawRectWithFill(this.canvas, handleRect, this.config.lineInactiveColor);
      }
    }
  };

  _proto.updateActivelyCreatedLabel = function updateActivelyCreatedLabel(data) {
    if (this.isCreationInProgress()) {
      var mousePositionSnapped = RectUtil.snapPointToRect(data.mousePositionOnViewPortContent, data.viewPortContentImageRect);
      this.activePath.push(mousePositionSnapped);
    } else {
      var isMouseOverImage = RectUtil.isPointInside(data.viewPortContentImageRect, data.mousePositionOnViewPortContent);

      if (isMouseOverImage) {
        EditorActions.setViewPortActionsDisabledStatus(true);
        this.activePath.push(data.mousePositionOnViewPortContent);
        store.dispatch(updateActiveLabelId(null));
      }
    }
  };

  _proto.cancelLabelCreation = function cancelLabelCreation() {
    this.activePath = [];
    EditorActions.setViewPortActionsDisabledStatus(false);
  };

  _proto.finishLabelCreation = function finishLabelCreation() {
    this.activePath = [];
    EditorActions.setViewPortActionsDisabledStatus(false);
  };

  _proto.addLabelAndFinishCreation = function addLabelAndFinishCreation(data) {
    if (this.isCreationInProgress() && this.activePath.length > 2) {
      var polygonOnImage = RenderEngineUtil.transferPolygonFromViewPortContentToImage(this.activePath, data);
      this.addPolygonLabel(polygonOnImage);
      this.finishLabelCreation();
    }
  };

  _proto.addPolygonLabel = function addPolygonLabel(polygon) {
    var activeLabelId = LabelsSelector.getActiveLabelNameId();
    var imageData = LabelsSelector.getActiveImageData();
    var labelPolygon = {
      id: uuid_1.v4(),
      labelId: activeLabelId,
      vertices: polygon
    };
    imageData.labelPolygons.push(labelPolygon);
    store.dispatch(updateImageDataById("0", imageData));
    store.dispatch(updateActiveLabelId(labelPolygon.id));
  };

  _proto.startExistingLabelResize = function startExistingLabelResize(labelId, anchorIndex) {
    store.dispatch(updateActiveLabelId(labelId));
    this.resizeAnchorIndex = anchorIndex;
    EditorActions.setViewPortActionsDisabledStatus(true);
  };

  _proto.endExistingLabelResize = function endExistingLabelResize(data, onLabelsDataChange) {
    this.applyResizeToPolygonLabel(data, onLabelsDataChange);
    this.resizeAnchorIndex = null;
    EditorActions.setViewPortActionsDisabledStatus(false);
  };

  _proto.applyResizeToPolygonLabel = function applyResizeToPolygonLabel(data, onLabelsDataChange) {
    var _this7 = this;

    var imageData = LabelsSelector.getActiveImageData();
    var activeLabel = LabelsSelector.getActivePolygonLabel();
    imageData.labelPolygons = imageData.labelPolygons.map(function (polygon) {
      if (polygon.id !== activeLabel.id) {
        return polygon;
      } else {
        return _extends(_extends({}, polygon), {}, {
          vertices: polygon.vertices.map(function (value, index) {
            if (index !== _this7.resizeAnchorIndex) {
              return value;
            } else {
              var snappedMousePosition = RectUtil.snapPointToRect(data.mousePositionOnViewPortContent, data.viewPortContentImageRect);
              return RenderEngineUtil.transferPointFromViewPortContentToImage(snappedMousePosition, data);
            }
          })
        });
      }
    });
    var labelPolygons = imageData.labelPolygons,
        labelRects = imageData.labelRects;
    var labelsData = {
      labelRects: labelRects,
      labelPolygons: labelPolygons
    };
    onLabelsDataChange(labelsData);
    store.dispatch(updateImageDataById("0", imageData));
    store.dispatch(updateActiveLabelId(activeLabel.id));
  };

  _proto.discardSuggestedPoint = function discardSuggestedPoint() {
    this.suggestedAnchorIndexInPolygon = null;
    this.suggestedAnchorPositionOnCanvas = null;
  };

  _proto.addSuggestedAnchorToPolygonLabel = function addSuggestedAnchorToPolygonLabel(data) {
    var _this8 = this;

    var imageData = LabelsSelector.getActiveImageData();
    var activeLabel = LabelsSelector.getActivePolygonLabel();
    var newAnchorPositionOnImage = RenderEngineUtil.transferPointFromViewPortContentToImage(this.suggestedAnchorPositionOnCanvas, data);

    var insert = function insert(arr, index, newItem) {
      return [].concat(arr.slice(0, index), [newItem], arr.slice(index));
    };

    var newImageData = _extends(_extends({}, imageData), {}, {
      labelPolygons: imageData.labelPolygons.map(function (polygon) {
        if (polygon.id !== activeLabel.id) {
          return polygon;
        } else {
          return _extends(_extends({}, polygon), {}, {
            vertices: insert(polygon.vertices, _this8.suggestedAnchorIndexInPolygon, newAnchorPositionOnImage)
          });
        }
      })
    });

    store.dispatch(updateImageDataById("0", newImageData));
    this.startExistingLabelResize(activeLabel.id, this.suggestedAnchorIndexInPolygon);
    this.discardSuggestedPoint();
  };

  _proto.isInProgress = function isInProgress() {
    return this.isCreationInProgress() || this.isResizeInProgress();
  };

  _proto.isCreationInProgress = function isCreationInProgress() {
    return this.activePath !== null && this.activePath.length !== 0;
  };

  _proto.isResizeInProgress = function isResizeInProgress() {
    return this.resizeAnchorIndex !== null;
  };

  _proto.isMouseOverAnchor = function isMouseOverAnchor(mouse, anchor) {
    if (!mouse || !anchor) return null;
    return RectUtil.isPointInside(RectUtil.getRectWithCenterAndSize(anchor, this.config.anchorSize), mouse);
  };

  _proto.isMouseOverLine = function isMouseOverLine(mouse, l) {
    var hoverReach = this.config.anchorHoverSize.width / 2;
    var minX = Math.min(l.start.x, l.end.x);
    var maxX = Math.max(l.start.x, l.end.x);
    var minY = Math.min(l.start.y, l.end.y);
    var maxY = Math.max(l.start.y, l.end.y);
    return minX - hoverReach <= mouse.x && maxX + hoverReach >= mouse.x && minY - hoverReach <= mouse.y && maxY + hoverReach >= mouse.y && LineUtil.getDistanceFromLine(l, mouse) < hoverReach;
  };

  _proto.mapPointsToLines = function mapPointsToLines(points) {
    var lines = [];

    for (var i = 0; i < points.length - 1; i++) {
      lines.push({
        start: points[i],
        end: points[i + 1]
      });
    }

    return lines;
  };

  _proto.mapPointsToAnchors = function mapPointsToAnchors(points) {
    var _this9 = this;

    return points.map(function (point) {
      return RectUtil.getRectWithCenterAndSize(point, _this9.config.anchorSize);
    });
  };

  _proto.getPolygonUnderMouse = function getPolygonUnderMouse(data) {
    var labelPolygons = LabelsSelector.getActiveImageData().labelPolygons;

    for (var i = 0; i < labelPolygons.length; i++) {
      var pathOnCanvas = RenderEngineUtil.transferPolygonFromImageToViewPortContent(labelPolygons[i].vertices, data);
      var linesOnCanvas = this.mapPointsToLines(pathOnCanvas.concat(pathOnCanvas[0]));

      for (var j = 0; j < linesOnCanvas.length; j++) {
        if (this.isMouseOverLine(data.mousePositionOnViewPortContent, linesOnCanvas[j])) return labelPolygons[i];
      }

      for (var _j = 0; _j < pathOnCanvas.length; _j++) {
        if (this.isMouseOverAnchor(data.mousePositionOnViewPortContent, pathOnCanvas[_j])) return labelPolygons[i];
      }
    }

    return null;
  };

  _proto.getAnchorUnderMouse = function getAnchorUnderMouse(data) {
    var labelPolygons = LabelsSelector.getActiveImageData().labelPolygons;

    for (var i = 0; i < labelPolygons.length; i++) {
      var pathOnCanvas = RenderEngineUtil.transferPolygonFromImageToViewPortContent(labelPolygons[i].vertices, data);

      for (var j = 0; j < pathOnCanvas.length; j++) {
        if (this.isMouseOverAnchor(data.mousePositionOnViewPortContent, pathOnCanvas[j])) return pathOnCanvas[j];
      }
    }

    return null;
  };

  return PolygonRenderEngine;
}(BaseRenderEngine);

var PrimaryEditorRenderEngine = /*#__PURE__*/function (_BaseRenderEngine) {
  _inheritsLoose(PrimaryEditorRenderEngine, _BaseRenderEngine);

  function PrimaryEditorRenderEngine(canvas) {
    return _BaseRenderEngine.call(this, canvas) || this;
  }

  var _proto = PrimaryEditorRenderEngine.prototype;

  _proto.mouseMoveHandler = function mouseMoveHandler() {};

  _proto.mouseDownHandler = function mouseDownHandler() {};

  _proto.mouseUpHandler = function mouseUpHandler() {};

  _proto.render = function render() {
    EditorModel.primaryRenderingEngine.drawImage(EditorModel.image, ViewPortActions.calculateViewPortContentImageRect());
  };

  _proto.drawImage = function drawImage(image, imageRect) {
    if (!!image && !!this.canvas) {
      var ctx = this.canvas.getContext('2d');
      ctx.drawImage(image, imageRect.x, imageRect.y, imageRect.width, imageRect.height);
    }
  };

  _proto.isInProgress = function isInProgress() {
    return false;
  };

  return PrimaryEditorRenderEngine;
}(BaseRenderEngine);

var LabelStatus;

(function (LabelStatus) {
  LabelStatus["ACCEPTED"] = "ACCEPTED";
  LabelStatus["REJECTED"] = "REJECTED";
  LabelStatus["UNDECIDED"] = "UNDECIDED";
})(LabelStatus || (LabelStatus = {}));

var RectRenderEngine = /*#__PURE__*/function (_BaseRenderEngine) {
  _inheritsLoose(RectRenderEngine, _BaseRenderEngine);

  function RectRenderEngine(canvas) {
    var _this;

    _this = _BaseRenderEngine.call(this, canvas) || this;
    _this.config = new RenderEngineConfig();

    _this.mouseDownHandler = function (data) {
      var isMouseOverImage = RenderEngineUtil.isMouseOverImage(data);
      var isMouseOverCanvas = RenderEngineUtil.isMouseOverCanvas(data);

      if (isMouseOverCanvas) {
        var rectUnderMouse = _this.getRectUnderMouse(data);

        if (!!rectUnderMouse) {
          var rect = _this.calculateRectRelativeToActiveImage(rectUnderMouse.rect, data);

          var anchorUnderMouse = _this.getAnchorUnderMouseByRect(rect, data.mousePositionOnViewPortContent, data.viewPortContentImageRect);

          if (!!anchorUnderMouse && rectUnderMouse.status === LabelStatus.ACCEPTED) {
            store.dispatch(updateActiveLabelId(rectUnderMouse.id));

            _this.startRectResize(anchorUnderMouse);
          } else {
            if (!!LabelsSelector.getHighlightedLabelId()) store.dispatch(updateActiveLabelId(LabelsSelector.getHighlightedLabelId()));else _this.startRectCreation(data.mousePositionOnViewPortContent);
          }
        } else if (isMouseOverImage) {
          _this.startRectCreation(data.mousePositionOnViewPortContent);
        }
      }
    };

    _this.mouseUpHandler = function (data, onLabelsDataChange) {
      if (!!data.viewPortContentImageRect) {
        var mousePositionSnapped = RectUtil.snapPointToRect(data.mousePositionOnViewPortContent, data.viewPortContentImageRect);
        var activeLabelRect = LabelsSelector.getActiveRectLabel();

        if (!!_this.startCreateRectPoint && !PointUtil.equals(_this.startCreateRectPoint, mousePositionSnapped)) {
          var minX = Math.min(_this.startCreateRectPoint.x, mousePositionSnapped.x);
          var minY = Math.min(_this.startCreateRectPoint.y, mousePositionSnapped.y);
          var maxX = Math.max(_this.startCreateRectPoint.x, mousePositionSnapped.x);
          var maxY = Math.max(_this.startCreateRectPoint.y, mousePositionSnapped.y);
          var rect = {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY
          };

          _this.addRectLabel(RenderEngineUtil.transferRectFromImageToViewPortContent(rect, data), onLabelsDataChange);
        }

        if (!!_this.startResizeRectAnchor && !!activeLabelRect) {
          var _rect = _this.calculateRectRelativeToActiveImage(activeLabelRect.rect, data);

          var startAnchorPosition = PointUtil.add(_this.startResizeRectAnchor.position, data.viewPortContentImageRect);
          var delta = PointUtil.subtract(mousePositionSnapped, startAnchorPosition);
          var resizeRect = RectUtil.resizeRect(_rect, _this.startResizeRectAnchor.type, delta);
          var scale = RenderEngineUtil.calculateImageScale(data);
          var scaledRect = RectUtil.scaleRect(resizeRect, scale);
          var imageData = LabelsSelector.getActiveImageData();
          imageData.labelRects = imageData.labelRects.map(function (labelRect) {
            if (labelRect.id === activeLabelRect.id) {
              return _extends(_extends({}, labelRect), {}, {
                rect: scaledRect
              });
            }

            return labelRect;
          });
          var labelRects = imageData.labelRects,
              labelPolygons = imageData.labelPolygons;
          var labelsData = {
            labelRects: labelRects,
            labelPolygons: labelPolygons
          };
          onLabelsDataChange(labelsData);
          store.dispatch(updateImageDataById("0", imageData));
        }
      }

      _this.endRectTransformation();
    };

    _this.mouseMoveHandler = function (data) {
      if (!!data.viewPortContentImageRect && !!data.mousePositionOnViewPortContent) {
        var isOverImage = RenderEngineUtil.isMouseOverImage(data);

        if (isOverImage && !_this.startResizeRectAnchor) {
          var labelRect = _this.getRectUnderMouse(data);

          if (!!labelRect && !_this.isInProgress()) {
            if (LabelsSelector.getHighlightedLabelId() !== labelRect.id) {
              store.dispatch(updateHighlightedLabelId(labelRect.id));
            }
          } else {
            if (LabelsSelector.getHighlightedLabelId() !== null) {
              store.dispatch(updateHighlightedLabelId(null));
            }
          }
        }
      }
    };

    _this.addRectLabel = function (rect, onLabelsDataChange) {
      var activeLabelId = LabelsSelector.getActiveLabelNameId();
      var imageData = LabelsSelector.getActiveImageData();
      var labelRect = {
        id: uuid_1.v4(),
        labelId: activeLabelId,
        rect: rect,
        status: LabelStatus.ACCEPTED,
        suggestedLabel: null
      };
      imageData.labelRects.push(labelRect);
      var labelRects = imageData.labelRects,
          labelPolygons = imageData.labelPolygons;
      var labelsData = {
        labelRects: labelRects,
        labelPolygons: labelPolygons
      };
      onLabelsDataChange(labelsData);
      store.dispatch(updateImageDataById("0", imageData));
      store.dispatch(updateActiveLabelId(labelRect.id));
    };

    _this.labelType = LabelType.RECTANGLE;
    return _this;
  }

  var _proto = RectRenderEngine.prototype;

  _proto.render = function render(data) {
    var _this2 = this;

    var activeLabelId = LabelsSelector.getActiveLabelId();
    var imageData = LabelsSelector.getActiveImageData();

    if (imageData) {
      imageData.labelRects.forEach(function (labelRect) {
        var displayAsActive = labelRect.status === LabelStatus.ACCEPTED && labelRect.id === activeLabelId;
        displayAsActive ? _this2.drawActiveRect(labelRect, data) : _this2.drawInactiveRect(labelRect, data);
      });
      this.drawCurrentlyCreatedRect(data.mousePositionOnViewPortContent, data.viewPortContentImageRect);
      this.updateCursorStyle(data);
    }
  };

  _proto.drawCurrentlyCreatedRect = function drawCurrentlyCreatedRect(mousePosition, imageRect) {
    if (!!this.startCreateRectPoint) {
      var mousePositionSnapped = RectUtil.snapPointToRect(mousePosition, imageRect);
      var activeRect = {
        x: this.startCreateRectPoint.x,
        y: this.startCreateRectPoint.y,
        width: mousePositionSnapped.x - this.startCreateRectPoint.x,
        height: mousePositionSnapped.y - this.startCreateRectPoint.y
      };
      var activeRectBetweenPixels = RenderEngineUtil.setRectBetweenPixels(activeRect);
      DrawUtil.drawRect(this.canvas, activeRectBetweenPixels, this.config.lineActiveColor, this.config.lineThickness);
    }
  };

  _proto.drawInactiveRect = function drawInactiveRect(labelRect, data) {
    var rectOnImage = RenderEngineUtil.transferRectFromViewPortContentToImage(labelRect.rect, data);
    var highlightedLabelId = LabelsSelector.getHighlightedLabelId();
    var displayAsActive = labelRect.status === LabelStatus.ACCEPTED && labelRect.id === highlightedLabelId;
    this.renderRect(rectOnImage, displayAsActive);
  };

  _proto.drawActiveRect = function drawActiveRect(labelRect, data) {
    var rect = this.calculateRectRelativeToActiveImage(labelRect.rect, data);

    if (!!this.startResizeRectAnchor) {
      var startAnchorPosition = PointUtil.add(this.startResizeRectAnchor.position, data.viewPortContentImageRect);
      var endAnchorPositionSnapped = RectUtil.snapPointToRect(data.mousePositionOnViewPortContent, data.viewPortContentImageRect);
      var delta = PointUtil.subtract(endAnchorPositionSnapped, startAnchorPosition);
      rect = RectUtil.resizeRect(rect, this.startResizeRectAnchor.type, delta);
    }

    var rectOnImage = RectUtil.translate(rect, data.viewPortContentImageRect);
    this.renderRect(rectOnImage, true);
  };

  _proto.renderRect = function renderRect(rectOnImage, isActive) {
    var _this3 = this;

    var rectBetweenPixels = RenderEngineUtil.setRectBetweenPixels(rectOnImage);
    var lineColor = isActive ? this.config.lineActiveColor : this.config.lineInactiveColor;
    DrawUtil.drawRect(this.canvas, rectBetweenPixels, lineColor, this.config.lineThickness);

    if (isActive) {
      var handleCenters = RectUtil.mapRectToAnchors(rectOnImage).map(function (rectAnchor) {
        return rectAnchor.position;
      });
      handleCenters.forEach(function (center) {
        var handleRect = RectUtil.getRectWithCenterAndSize(center, _this3.config.anchorSize);
        var handleRectBetweenPixels = RenderEngineUtil.setRectBetweenPixels(handleRect);
        DrawUtil.drawRectWithFill(_this3.canvas, handleRectBetweenPixels, _this3.config.activeAnchorColor);
      });
    }
  };

  _proto.updateCursorStyle = function updateCursorStyle(data) {
    if (!!this.canvas && !!data.mousePositionOnViewPortContent && !GeneralSelector.getImageDragModeStatus()) {
      var rectUnderMouse = this.getRectUnderMouse(data);
      var rectAnchorUnderMouse = this.getAnchorUnderMouse(data);

      if (!!rectAnchorUnderMouse && rectUnderMouse && rectUnderMouse.status === LabelStatus.ACCEPTED || !!this.startResizeRectAnchor) {
        store.dispatch(updateCustomCursorStyle(CursorType.MOVE));
        return;
      } else if (RenderEngineUtil.isMouseOverCanvas(data)) {
        if (!RenderEngineUtil.isMouseOverImage(data) && !!this.startCreateRectPoint) store.dispatch(updateCustomCursorStyle(CursorType.MOVE));else RenderEngineUtil.wrapDefaultCursorStyleInCancel(data);
        this.canvas.style.cursor = 'none';
      } else {
        this.canvas.style.cursor = 'default';
      }
    }
  };

  _proto.isInProgress = function isInProgress() {
    return !!this.startCreateRectPoint || !!this.startResizeRectAnchor;
  };

  _proto.calculateRectRelativeToActiveImage = function calculateRectRelativeToActiveImage(rect, data) {
    var scale = RenderEngineUtil.calculateImageScale(data);
    return RectUtil.scaleRect(rect, 1 / scale);
  };

  _proto.getRectUnderMouse = function getRectUnderMouse(data) {
    var activeRectLabel = LabelsSelector.getActiveRectLabel();

    if (!!activeRectLabel && this.isMouseOverRectEdges(activeRectLabel.rect, data)) {
      return activeRectLabel;
    }

    var labelRects = LabelsSelector.getActiveImageData().labelRects;

    for (var i = 0; i < labelRects.length; i++) {
      if (this.isMouseOverRectEdges(labelRects[i].rect, data)) {
        return labelRects[i];
      }
    }

    return null;
  };

  _proto.isMouseOverRectEdges = function isMouseOverRectEdges(rect, data) {
    var rectOnImage = RectUtil.translate(this.calculateRectRelativeToActiveImage(rect, data), data.viewPortContentImageRect);
    var outerRectDelta = {
      x: this.config.anchorHoverSize.width / 2,
      y: this.config.anchorHoverSize.height / 2
    };
    var outerRect = RectUtil.expand(rectOnImage, outerRectDelta);
    var innerRectDelta = {
      x: -this.config.anchorHoverSize.width / 2,
      y: -this.config.anchorHoverSize.height / 2
    };
    var innerRect = RectUtil.expand(rectOnImage, innerRectDelta);
    return RectUtil.isPointInside(outerRect, data.mousePositionOnViewPortContent) && !RectUtil.isPointInside(innerRect, data.mousePositionOnViewPortContent);
  };

  _proto.getAnchorUnderMouseByRect = function getAnchorUnderMouseByRect(rect, mousePosition, imageRect) {
    var rectAnchors = RectUtil.mapRectToAnchors(rect);

    for (var i = 0; i < rectAnchors.length; i++) {
      var anchorRect = RectUtil.translate(RectUtil.getRectWithCenterAndSize(rectAnchors[i].position, this.config.anchorHoverSize), imageRect);

      if (!!mousePosition && RectUtil.isPointInside(anchorRect, mousePosition)) {
        return rectAnchors[i];
      }
    }

    return null;
  };

  _proto.getAnchorUnderMouse = function getAnchorUnderMouse(data) {
    var labelRects = LabelsSelector.getActiveImageData().labelRects;

    for (var i = 0; i < labelRects.length; i++) {
      var rect = this.calculateRectRelativeToActiveImage(labelRects[i].rect, data);
      var rectAnchor = this.getAnchorUnderMouseByRect(rect, data.mousePositionOnViewPortContent, data.viewPortContentImageRect);
      if (!!rectAnchor) return rectAnchor;
    }

    return null;
  };

  _proto.startRectCreation = function startRectCreation(mousePosition) {
    this.startCreateRectPoint = mousePosition;
    store.dispatch(updateActiveLabelId(null));
    EditorActions.setViewPortActionsDisabledStatus(true);
  };

  _proto.startRectResize = function startRectResize(activatedAnchor) {
    this.startResizeRectAnchor = activatedAnchor;
    EditorActions.setViewPortActionsDisabledStatus(true);
  };

  _proto.endRectTransformation = function endRectTransformation() {
    this.startCreateRectPoint = null;
    this.startResizeRectAnchor = null;
    EditorActions.setViewPortActionsDisabledStatus(false);
  };

  return RectRenderEngine;
}(BaseRenderEngine);

var CanvasUtil = /*#__PURE__*/function () {
  function CanvasUtil() {}

  CanvasUtil.getMousePositionOnCanvasFromEvent = function getMousePositionOnCanvasFromEvent(event, canvas) {
    if (!!canvas && !!event) {
      var canvasRect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - canvasRect.left,
        y: event.clientY - canvasRect.top
      };
    }

    return null;
  };

  CanvasUtil.getClientRect = function getClientRect(canvas) {
    if (!!canvas) {
      var canvasRect = canvas.getBoundingClientRect();
      return {
        x: canvasRect.left,
        y: canvasRect.top,
        width: canvasRect.width,
        height: canvasRect.height
      };
    }

    return null;
  };

  CanvasUtil.getSize = function getSize(canvas) {
    if (!!canvas) {
      var canvasRect = canvas.getBoundingClientRect();
      return {
        width: canvasRect.width,
        height: canvasRect.height
      };
    }

    return null;
  };

  return CanvasUtil;
}();

var EditorActions = /*#__PURE__*/function () {
  function EditorActions() {}

  EditorActions.mountSupportRenderingEngine = function mountSupportRenderingEngine(activeLabelType) {
    EditorModel.supportRenderingEngine = activeLabelType === LabelType.RECTANGLE ? new RectRenderEngine(EditorModel.canvas) : new PolygonRenderEngine(EditorModel.canvas);
  };

  EditorActions.swapSupportRenderingEngine = function swapSupportRenderingEngine(activeLabelType) {
    EditorActions.mountSupportRenderingEngine(activeLabelType);
  };

  EditorActions.mountRenderEnginesAndHelpers = function mountRenderEnginesAndHelpers(activeLabelType) {
    EditorModel.viewPortHelper = new ViewPortHelper();
    EditorModel.primaryRenderingEngine = new PrimaryEditorRenderEngine(EditorModel.canvas);
    EditorActions.mountSupportRenderingEngine(activeLabelType);
  };

  EditorActions.fullRender = function fullRender() {
    DrawUtil.clearCanvas(EditorModel.canvas);
    EditorModel.primaryRenderingEngine.render();
    EditorModel === null || EditorModel === void 0 ? void 0 : EditorModel.supportRenderingEngine.render(EditorActions.getEditorData());
  };

  EditorActions.setLoadingStatus = function setLoadingStatus(status) {
    EditorModel.isLoading = status;
  };

  EditorActions.setActiveImage = function setActiveImage(image) {
    EditorModel.image = image;
  };

  EditorActions.setViewPortActionsDisabledStatus = function setViewPortActionsDisabledStatus(status) {
    EditorModel.viewPortActionsDisabled = status;
  };

  EditorActions.getEditorData = function getEditorData(event) {
    return {
      mousePositionOnViewPortContent: EditorModel.mousePositionOnViewPortContent,
      viewPortContentSize: CanvasUtil.getSize(EditorModel.canvas),
      event: event,
      zoom: GeneralSelector.getZoom(),
      viewPortSize: EditorModel.viewPortSize,
      defaultRenderImageRect: EditorModel.defaultRenderImageRect,
      viewPortContentImageRect: ViewPortActions.calculateViewPortContentImageRect(),
      realImageSize: ImageUtil.getSize(EditorModel.image),
      absoluteViewPortContentScrollPosition: ViewPortActions.getAbsoluteScrollPosition()
    };
  };

  EditorActions.updateMousePositionIndicator = function updateMousePositionIndicator(event) {
    if (!EditorModel.image || !EditorModel.canvas) {
      EditorModel.mousePositionIndicator.style.display = 'none';
      EditorModel.cursor.style.display = 'none';
      return;
    }

    var mousePositionOverViewPortContent = CanvasUtil.getMousePositionOnCanvasFromEvent(event, EditorModel.canvas);
    var viewPortContentScrollPosition = ViewPortActions.getAbsoluteScrollPosition();
    var viewPortContentImageRect = ViewPortActions.calculateViewPortContentImageRect();
    var mousePositionOverViewPort = PointUtil.subtract(mousePositionOverViewPortContent, viewPortContentScrollPosition);
    var isMouseOverImage = RectUtil.isPointInside(viewPortContentImageRect, mousePositionOverViewPortContent);
    var isMouseOverViewPort = RectUtil.isPointInside(_extends({
      x: 0,
      y: 0
    }, EditorModel.viewPortSize), mousePositionOverViewPort);

    if (isMouseOverViewPort && !GeneralSelector.getPreventCustomCursorStatus()) {
      EditorModel.cursor.style.left = mousePositionOverViewPort.x + 'px';
      EditorModel.cursor.style.top = mousePositionOverViewPort.y + 'px';
      EditorModel.cursor.style.display = 'block';

      if (isMouseOverImage && ![CursorType.GRAB, CursorType.GRABBING].includes(GeneralSelector.getCustomCursorStyle())) {
        var imageSize = ImageUtil.getSize(EditorModel.image);
        var scale = imageSize.width / viewPortContentImageRect.width;
        var mousePositionOverImage = PointUtil.multiply(PointUtil.subtract(mousePositionOverViewPortContent, viewPortContentImageRect), scale);
        var text = 'x: ' + Math.round(mousePositionOverImage.x) + ', y: ' + Math.round(mousePositionOverImage.y);
        EditorModel.mousePositionIndicator.innerHTML = text;
        EditorModel.mousePositionIndicator.style.left = mousePositionOverViewPort.x + 15 + 'px';
        EditorModel.mousePositionIndicator.style.top = mousePositionOverViewPort.y + 15 + 'px';
        EditorModel.mousePositionIndicator.style.display = 'block';
      } else {
        EditorModel.mousePositionIndicator.style.display = 'none';
      }
    } else {
      EditorModel.cursor.style.display = 'none';
      EditorModel.mousePositionIndicator.style.display = 'none';
    }
  };

  return EditorActions;
}();

var FileUtil = /*#__PURE__*/function () {
  function FileUtil() {}

  FileUtil.loadImage = function loadImage(fileData, onSuccess, onFailure) {
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(fileData);
      var image = new Image();
      image.src = url;

      image.onload = function () {
        onSuccess(image);
        resolve();
      };

      image.onerror = function () {
        onFailure();
        reject();
      };
    });
  };

  FileUtil.loadLabelsList = function loadLabelsList(fileData, onSuccess, onFailure) {
    var reader = new FileReader();
    reader.readAsText(fileData);

    reader.onloadend = function (evt) {
      var contents = evt.target.result;
      onSuccess(contents.split(/[\r\n]/));
    };

    reader.onerror = function () {
      return onFailure();
    };
  };

  return FileUtil;
}();

var NOOP = function NOOP() {};

var useCanvasListeners = function useCanvasListeners(_ref) {
  var imageData = _ref.imageData,
      annotationType = _ref.annotationType,
      imageDragMode = _ref.imageDragMode,
      _ref$onLabelsDataChan = _ref.onLabelsDataChange,
      onLabelsDataChange = _ref$onLabelsDataChan === void 0 ? NOOP : _ref$onLabelsDataChan;
  useEffect(function () {
    var update = function update(event) {
      var editorData = EditorActions.getEditorData(event);
      EditorModel.mousePositionOnViewPortContent = CanvasUtil.getMousePositionOnCanvasFromEvent(event, EditorModel.canvas);
      EditorModel.primaryRenderingEngine.update(editorData);

      if (imageDragMode) {
        EditorModel.viewPortHelper.update(editorData);
      } else {
        EditorModel === null || EditorModel === void 0 ? void 0 : EditorModel.supportRenderingEngine.update(editorData, onLabelsDataChange);
      }

      EditorActions.updateMousePositionIndicator(event);
      EditorActions.fullRender();
    };

    window.addEventListener(EventType.MOUSE_MOVE, update);
    window.addEventListener(EventType.MOUSE_UP, update);
    EditorModel.canvas.addEventListener(EventType.MOUSE_DOWN, update);
    return function () {
      window.removeEventListener(EventType.MOUSE_MOVE, update);
      window.removeEventListener(EventType.MOUSE_UP, update);
      EditorModel.canvas.removeEventListener(EventType.MOUSE_DOWN, update);
    };
  }, [imageDragMode, onLabelsDataChange]);
  useEffect(function () {
    var updateModelAndRender = function updateModelAndRender() {
      ViewPortActions.updateViewPortSize();
      ViewPortActions.updateDefaultViewPortImageRect();
      ViewPortActions.resizeViewPortContent();
      EditorActions.fullRender();
    };

    var saveLoadedImage = function saveLoadedImage(image, imageData) {
      imageData.loadStatus = true;
      EditorActions.setActiveImage(image);
      EditorActions.setLoadingStatus(false);
      updateModelAndRender();
    };

    if (imageData.loadStatus) {
      updateModelAndRender();
    } else {
      if (!EditorModel.isLoading) {
        EditorActions.setLoadingStatus(true);

        var saveLoadedImagePartial = function saveLoadedImagePartial(image) {
          return saveLoadedImage(image, imageData);
        };

        FileUtil.loadImage(imageData.fileData, saveLoadedImagePartial, NOOP);
      }
    }
  }, [imageData]);
  useEffect(function () {
    EditorActions.mountRenderEnginesAndHelpers(annotationType);
  }, [annotationType]);
};

var DEFAULT_SCROLL_POSITION = {
  x: 0.5,
  y: 0.5
};

var useCanvasZoom = function useCanvasZoom(zoom) {
  var isMounted = useRef(false);
  useEffect(function () {
    if (isMounted.current) {
      if (EditorModel.viewPortActionsDisabled) return;
      var currentZoom = GeneralSelector.getZoom();
      var currentRelativeScrollPosition = ViewPortActions.getRelativeScrollPosition();
      var nextRelativeScrollPosition = currentZoom === 1 ? DEFAULT_SCROLL_POSITION : currentRelativeScrollPosition;
      ViewPortActions.setZoom(zoom);
      ViewPortActions.resizeViewPortContent();
      ViewPortActions.setScrollPosition(ViewPortActions.calculateAbsoluteScrollPosition(nextRelativeScrollPosition));
      EditorActions.fullRender();
    } else {
      isMounted.current = true;
    }
  }, [zoom]);
};

function _templateObject5() {
  var data = _taggedTemplateLiteralLoose(["\n  ", "\n  cursor: none;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteralLoose(["\n  ", "\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n  ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$1() {
  var data = _taggedTemplateLiteralLoose(["\n  ", "\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}

var selector = function selector(state) {
  return {
    customCursorStyle: state.general.customCursorStyle,
    imageDragMode: state.general.imageDragMode
  };
};

var onContextMenu = function onContextMenu(event) {
  return event.preventDefault();
};

var CanvasAnnotation = function CanvasAnnotation(_ref) {
  var annotationType = _ref.annotationType,
      className = _ref.className,
      imageFile = _ref.imageFile,
      labelsData = _ref.labelsData,
      _ref$onRectChange = _ref.onRectChange,
      onLabelsDataChange = _ref$onRectChange === void 0 ? function () {} : _ref$onRectChange,
      _ref$zoom = _ref.zoom,
      zoom = _ref$zoom === void 0 ? 1 : _ref$zoom,
      _ref$isImageDrag = _ref.isImageDrag,
      isImageDrag = _ref$isImageDrag === void 0 ? false : _ref$isImageDrag;
  var imageData = useMemo(function () {
    return _extends({
      fileData: imageFile,
      loadStatus: false
    }, labelsData);
  }, [imageFile, labelsData]);
  var dispatch = useDispatch();
  useEffect(function () {
    dispatch(addImageData([imageData]));
  }, [dispatch, imageData, imageFile]);
  useEffect(function () {
    dispatch(updateImageDragModeStatus(isImageDrag));
  }, [dispatch, isImageDrag]);
  useEffect(function () {
    dispatch(updateActiveLabelType(annotationType));
    dispatch(updateActiveLabelId(null));
  }, [dispatch, annotationType]);
  useCanvasZoom(zoom);

  var _useSelector = useSelector(selector, isEqual),
      customCursorStyle = _useSelector.customCursorStyle;

  useCanvasListeners({
    imageData: imageData,
    annotationType: annotationType,
    imageDragMode: isImageDrag,
    onLabelsDataChange: onLabelsDataChange
  });
  return React.createElement(Container, {
    className: className
  }, React.createElement(EditorWrapper, null, imageData && React.createElement(Editor, {
    ref: function ref(_ref2) {
      return EditorModel.editor = _ref2;
    },
    draggable: false
  }, React.createElement(Scrollbars, {
    ref: function ref(_ref3) {
      return EditorModel.viewPortScrollbars = _ref3;
    },
    renderTrackHorizontal: function renderTrackHorizontal(props) {
      return React.createElement(NoCursorTrack, Object.assign({}, props));
    },
    renderTrackVertical: function renderTrackVertical(props) {
      return React.createElement(NoCursorTrack, Object.assign({}, props));
    },
    draggable: false
  }, React.createElement(Canvas, {
    ref: function ref(_ref4) {
      return EditorModel.canvas = _ref4;
    },
    draggable: false,
    onContextMenu: onContextMenu
  })), React.createElement(MouseIndicator, {
    ref: function ref(_ref5) {
      return EditorModel.mousePositionIndicator = _ref5;
    },
    draggable: false
  }), React.createElement(Cursor, {
    isGrabbing: customCursorStyle === CursorType.GRABBING,
    isTransform: customCursorStyle !== CursorType.DEFAULT,
    ref: function ref(_ref6) {
      return EditorModel.cursor = _ref6;
    },
    draggable: false
  }, React.createElement(Icon, {
    d: IconPaths[customCursorStyle]
  })))));
};

var EditorWrapper = styled.div({
  "display": "flex",
  "flexDirection": "column",
  "width": "100%",
  "height": "100%",
  "alignSelf": "stretch"
});
var Container = styled.div({
  "height": "100%",
  "width": "100%",
  "alignSelf": "stretch",
  "display": "flex",
  "flexDirection": "column"
});
var Canvas = styled.canvas(_templateObject$1(), {
  "position": "absolute",
  "cursor": "none"
});
var MouseIndicator = styled.div(_templateObject2(), {
  "userSelect": "none",
  "pointerEvents": "none"
}, {
  "position": "absolute",
  "color": "#fff",
  "opacity": "0.75",
  "padding": "0.25rem"
}, {
  "backgroundColor": "#4a5568",
  "zIndex": "50"
});
var Cursor = styled.div(_templateObject3(), {
  "position": "absolute",
  "width": "0.5rem",
  "height": "0.5rem",
  "color": "#fff",
  "fill": "currentColor"
}, {
  "pointerEvents": "none",
  "zIndex": "40"
}, {
  "borderColor": "#fff",
  "backgroundColor": "#fff",
  "borderRadius": "9999px"
}, {
  "transitionProperty": "transform",
  "transitionTimingFunction": "cubic-bezier(0.4, 0, 0.2, 1)",
  "transitionDuration": "200ms"
}, ifProp("isTransform", {
  "borderWidth": "1px",
  "backgroundColor": "transparent",
  "--transform-translate-x": "0",
  "--transform-translate-y": "0",
  "--transform-rotate": "0",
  "--transform-skew-x": "0",
  "--transform-skew-y": "0",
  "--transform-scale-x": "3.5",
  "--transform-scale-y": "3.5",
  "transform": "translateX(var(--transform-translate-x)) translateY(var(--transform-translate-y)) rotate(var(--transform-rotate)) skewX(var(--transform-skew-x)) skewY(var(--transform-skew-y)) scaleX(var(--transform-scale-x)) scaleY(var(--transform-scale-y))"
}), ifProp("isGrabbing", {
  "--transform-scale-x": "2.5",
  "--transform-scale-y": "2.5"
}));
var Editor = styled.div(_templateObject4(), {
  "flexGrow": "1",
  "position": "relative"
});
var NoCursorTrack = styled.div(_templateObject5(), {
  "pointerEvents": "none"
});
CanvasAnnotation.className = Container;

AppInitializer.init();

var ReactCanvasAnnotation = function ReactCanvasAnnotation(props) {
  return React.createElement(Provider, {
    store: store
  }, React.createElement(CanvasAnnotation, Object.assign({}, props)));
};

export default ReactCanvasAnnotation;
//# sourceMappingURL=index.modern.js.map
