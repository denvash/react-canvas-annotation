import ClassName from 'interfaces/types/ClassName';
import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg``;

type IProps = {
  d: string;
};

const Icon: React.FC<IProps> & ClassName = ({ d, ...props }) => (
  <SVG viewBox="0 0 24 24" {...props}>
    <path d={d} />
  </SVG>
);

Icon.className = SVG;
export default Icon;
