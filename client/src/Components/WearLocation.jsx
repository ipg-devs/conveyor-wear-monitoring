import React from "react";
import styled from "styled-components";
import { colors } from "./config";
const WearLocationWrapper = styled.div`
  display: flex;
  width: 240px;
`;

const Wear = styled.div`
  flex-grow: 1;
  height: 20px;
  background-color: ${props => colors[props.value]};
`;

export default ({ values }) => (
  <WearLocationWrapper>
    {values.map((color, i) => (
      <Wear key ={i} value={color} />
    ))}
  </WearLocationWrapper>
);
