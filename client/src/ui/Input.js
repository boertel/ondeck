import React from 'react'
import styled from 'styled-components/macro';


function Input({ icon: Icon, label, className, ...props }) {
  return (
    <div className={className}>
      <label>{label}
      <div className="input">
        <input {...props} />
        {!!Icon && <Icon />}
      </div>
      </label>
    </div>
  )
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

  .input {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }

  input + svg {
    color: ${({ theme }) => theme.placeholder};
  }

  input:focus + svg,
  input:not(:placeholder-shown) + svg
  {
    color: ${({ theme }) => theme.color};
  }

  input {
    width: 100%;
    background-color: transparent;
    color: ${({ theme }) => theme.color};
    font-size: 1em;
    border: 2px solid transparent;
    outline: none;
  }
`
