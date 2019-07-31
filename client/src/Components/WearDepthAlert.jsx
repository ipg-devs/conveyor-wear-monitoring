import React from "react";
import styled from "styled-components";
import { colors } from "./config";

const AlertDot = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: ${props => colors[props.value]};
`;

export default ({ value }) => <AlertDot value={value} />;
