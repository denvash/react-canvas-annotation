export const generateExample = () => ({
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
});

export const generateEmpty = () => ({
  labelRects: [],
  labelPolygons: [],
});
