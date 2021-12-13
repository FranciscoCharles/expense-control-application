import React from "react";
import { Content } from "../../components/Content";
import { StyledSection } from "./style";

export function Loading() {
  return (
    <Content>
      <StyledSection>
        <h1> Carregando pagina</h1>
      </StyledSection>
    </Content>
  );
}
