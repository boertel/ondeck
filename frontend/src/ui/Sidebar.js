import React from 'react'
import styled from 'styled-components'
import View from "./View";

const Sidebar = ({ children, ...props }) => {
  return (
    <nav {...props}>
      <View flexDirection="column" justifyContent="space-between">{children}</View>
    </nav>
  );
};

export default styled(Sidebar)`
  background-color: ${({ theme }) => theme.sidebar};
  > div {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 260px;
    height: 100%;
  }
`