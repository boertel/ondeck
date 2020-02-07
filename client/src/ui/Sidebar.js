import React from 'react'
import styled from 'styled-components'
import View from "./View";

const Sidebar = props => {
  return (
    <View
      as="nav"
      {...props}
    />
  );
};

export default styled(Sidebar)`
  flex-direction: column;
  background-color: ${({ theme }) => theme.sidebar};
  border-radius: 0;
`
