import { OptionBox, TypePicker } from 'components';
import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { className, LABEL_TYPE, ReactCanvasAnnotation } from 'react-canvas-annotation';
import styled from 'styled-components';
import 'tailwindcss/dist/base.css';
import tw from 'twin.macro';
import image from './img.jpg';

const labelsDataExample = {
  labelRects: [
    {
      id: 'Rect-Example',
      rect: {
        x: 697.2371134020618,
        y: 454.26804123711344,
        width: 717.0309278350516,
        height: 492.1237113402062,
      },
    },
  ],
  labelPolygons: [
    {
      id: `Poly-Example`,
      vertices: [
        { x: 623.7525773195875, y: 440.9072164948454 },
        { x: 1331.8762886597938, y: 305.07216494845363 },
        { x: 1641.4020618556701, y: 732.6185567010309 },
        { x: 882.0618556701031, y: 790.5154639175258 },
      ],
    },
  ],
};
const labelsDataDefault = {
  labelRects: [],
  labelPolygons: [],
};

const ZOOM_STEP = 0.1;

const App = () => {
  const [labels, setLabels] = useState(labelsDataDefault);
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
      console.info(`file uploaded`, file);
      setImageFile(file);
    };
    fetchImage();
  }, []);

  useEffect(() => {
    console.log(labels);
  }, [labels]);

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
        <OptionBox onClick={() => setLabels({ ...labelsDataExample })}>Add Random Rect</OptionBox>
      </TopActions>
      {imageFile && (
        <ReactCanvasAnnotation
          zoom={zoom}
          imageFile={imageFile}
          labels={labels}
          onChange={setLabels}
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
  > ${className} {
    ${tw`border border-gray-500`}
  }
`;

const TopActions = styled.div`
  ${tw`grid grid-flow-col gap-2 m-2`}
`;

export default App;
