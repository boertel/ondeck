import React from 'react'
import styled from 'styled-components/macro';


function Input({ icon: Icon, as: As, label, className, ...props }) {
  return (
    <div className={className}>
      <label>{label}
      <div className="input">
        <As {...props} />
        {!!Icon && <Icon />}
      </div>
      </label>
    </div>
  )
}

Input.defaultProps = {
  as: 'input',
}

export default styled(Input)`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: flex-end;
  width: 100%;

  border-radius: ${({ theme }) => theme.radius};
  padding: 4px;
  margin-bottom: 8px;

  border: 1px solid ${({ theme }) => theme.borderColor};

  &.no-border {
    border: none
  }

  label {
    width: 100%;
    color: ${({ theme }) => theme.primary};
  }

  .input {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }

  input + svg {
    margin-right: 6px;
    color: ${({ theme }) => theme.placeholder};
  }

  input:focus + svg,
  input:not(:placeholder-shown) + svg
  {
    color: ${({ theme }) => theme.color};
  }

  textarea, input {
    width: 100%;
    background-color: transparent;
    color: ${({ theme }) => theme.color};
    font-size: 1em;
    border: 2px solid transparent;
    outline: none;
  }
`
