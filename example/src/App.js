import { OptionBox, TypePicker } from 'components';
import React, { useEffect, useMemo, useReducer, useState } from 'react';
import ReactCanvasAnnotation, { className, LABEL_TYPE } from 'react-canvas-annotation';
import styled from 'styled-components';
import 'tailwindcss/dist/base.css';
import tw from 'twin.macro';
import image from './img.jpg';

const labelsDataDefault = {
  labelRects: [],
  labelPolygons: [],
};

const onLabelsDataChange = console.log;
const ZOOM_STEP = 0.1;

const App = () => {
  const [annotationType, setAnnotationType] = useState(LABEL_TYPE.RECTANGLE);
  const [imageFile, setImageFile] = useState(null);
  const [isImageDrag, toggleDragMode] = useReducer(p => !p, false);

  const [zoom, setZoom] = useState(1);

  const zoomAction = useMemo(
    () => ({
      default: () => setZoom(1),
      maxZoom: () => setZoom(2),
      zoom: (isZoomIn = true) => () => setZoom(prev => prev + (isZoomIn ? 1 : -1) * ZOOM_STEP),
    }),
    [],
  );

  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch(image);
      const buffer = await res.arrayBuffer();
      const file = new File([buffer], `img.jpg`, { type: `image/jpg` });
      setImageFile(file);
    };
    fetchImage();
  }, []);

  return (
    <Container>
      <TopActions>
        <OptionBox onClick={zoomAction.zoom()}>Zoom In</OptionBox>
        <OptionBox onClick={zoomAction.zoom(false)}>Zoom Out</OptionBox>
        <OptionBox onClick={zoomAction.default}>Default Zoom</OptionBox>
        <OptionBox onClick={zoomAction.maxZoom}>Zoom Max</OptionBox>
        <OptionBox isPressed={isImageDrag} onClick={toggleDragMode} disabled={zoom === 1}>
          Drag Image (Only on zoomed image)
        </OptionBox>
      </TopActions>
      {imageFile && (
        <ReactCanvasAnnotation
          zoom={zoom}
          imageFile={imageFile}
          labelsData={labelsDataDefault}
          onLabelsDataChange={onLabelsDataChange}
          annotationType={annotationType}
          isImageDrag={isImageDrag}
        />
      )}
      <TypePicker onChange={setAnnotationType} />
    </Container>
  );
};

const Container = styled.main`
  ${tw`flex flex-col items-center justify-center overflow-hidden`}
  ${className} {
    ${tw`border border-gray-500`}
  }
`;

const TopActions = styled.div`
  ${tw`grid grid-flow-col gap-2 m-2`}
`;

export default App;
