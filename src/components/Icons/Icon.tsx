import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg``;

type IProps = {
  d: string;
};

const Icon: React.FC<IProps> = ({ d, ...props }) => (
  <SVG viewBox="0 0 24 24" {...props}>
    <path d={d} />
  </SVG>
);

export default Icon;
