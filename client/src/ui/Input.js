import React from 'react'
import styled from 'styled-components/macro';


function Input({ icon: Icon, as: As, type, label, className, ...props }) {
  return (
    <div className={className}>
      <label>{label}
      <div className="input">
        <As {...props} type={type} />
        {!!Icon && <Icon />}
      </div>
      </label>
    </div>
  )
}

Input.defaultProps = {
  as: 'input',
  type: 'text',
}

export default styled(Input)`
  margin-bottom: 12px;

  label {
    display: flex;
    flex-direction: column;
  }

  .input {
    margin-top: 6px;
  }

  input[type='email'],
  input[type='text'],
  input[type='number'],
  select {
    padding: 0.65rem 0.5rem;
    font-size: 1rem;
    border-width: 2px;
    border-style: solid;
    border-color: ${({ theme }) => theme.borderColor};
    background-color: rgb(248, 248, 248);
    color: ${({ theme }) => theme.color};
    border-radius: ${({ theme }) => theme.radius};
    appearance: none;
    width: 100%;
  }

  input[type='email']:hover,
  input[type='text']:hover,
  input[type='number']:hover,
  textarea:hover {
    border-color: ${({ theme }) => theme.borderColor};
  }

  input:focus,
  select:focus,
  textarea:focus,
  input:hover:focus,
  select:hover:focus,
  textarea:hover:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }

  select {
    height: 2.5rem;
    background-image: url('data:image/svg+xml;utf8,<svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>');
    background-repeat: no-repeat;
    background-size: 1rem;
    background-position: center right 0.5rem;
  }

  select[multiple] {
    height: auto;
    background-image: none;
    background-repeat: no-repeat;
    background-size: auto;
    background-position: initial;
  }

`
