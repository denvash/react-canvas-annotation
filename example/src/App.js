import { OptionBox, TypePicker } from 'components';
import image from 'images/img.jpg';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import ReactCanvasAnnotation from 'react-canvas-annotation';
import styled from 'styled-components';
import 'tailwindcss/dist/base.css';
import tw from 'twin.macro';

const labelsDataDefault = {
  labelRects: [],
  labelPolygons: [],
};

const onLabelsDataChange = console.log;
const ZOOM_STEP = 0.1;

const App = () => {
  const [annotationType, setAnnotationType] = useState(`RECTANGLE`);
  const [imageFile, setImageFile] = useState(null);
  const [isImageDrag, toggleDragMode] = useReducer(p => !p, false);

  const [zoom, setZoom] = useState(1);

  const canvasZoom = useCallback(
    (isZoomIn = true) => () => setZoom(prev => prev + (isZoomIn ? 1 : -1) * ZOOM_STEP),
    [],
  );

  const setDefault = useCallback(() => setZoom(1), []);
  const setMaxZoom = useCallback(() => setZoom(2), []);

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
        <OptionBox onClick={canvasZoom()}>Zoom In</OptionBox>
        <OptionBox onClick={canvasZoom(false)}>Zoom Out</OptionBox>
        <OptionBox onClick={setDefault}>Default Zoom</OptionBox>
        <OptionBox onClick={setMaxZoom}>Zoom Max</OptionBox>
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
  ${ReactCanvasAnnotation.className} {
    ${tw`border border-gray-500`}
  }
`;

const TopActions = styled.div`
  ${tw`grid grid-flow-col gap-2 m-2`}
`;

export default App;
