import React from 'react'
import styled from 'styled-components/macro';


function Input({ icon: Icon, as: As, type, label, htmlFor, className, ...props }) {
  const { id, name } = props;
  return (
    <div className={className}>
      {!!label && (<label htmlFor={htmlFor || id || name}>{label}</label>)}
      <div className="input">
        {!!Icon && <Icon />}
        <As {...props} type={type} />
      </div>
    </div>
  )
}

Input.defaultProps = {
  as: 'input',
  type: 'text',
}

export default styled(Input)`
  &.full-width {
    width: 100%;
    .input {
      width: 100%;
    }
  }

  margin-bottom: 12px;

  & > label {
    display: inline-flex;
    margin-bottom: 6px;
  }


  .input {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;


    svg {
      margin: 0 0.5em;
      position: absolute;
      right: 0;
    }

    &:focus-within {
      svg {
        color: var(--primary);
      }
    }
  }

  svg + input {
    padding-right: 34px;
  }

  input,
  textarea,
  select {
    padding: 0.65em 0.5em;
    font-size: 1em;
    border-width: 2px;
    border-style: solid;
    border-color: var(--border-color);
    background-color: var(--fg);
    color: var(--default);
    border-radius: var(--border-radius);
    appearance: none;
    width: 100%;
    line-height: 1em;
    height: calc(1em + 0.65em * 2 + 4px);
  }

  textarea {
    resize: vertical;
    box-sizing: border-box;
    height: auto;
  }

  &.transparent {
    input,
    textarea,
    select {
      border-color: transparent;
      background-color: transparent;
    }

    .input {
      color: var(--placeholder);
    }
  }

  input:hover,
  select:hover,
  textarea:hover {
    outline: none;
    border-color: var(--border-color-hover);
  }

  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
    border-color: var(--primary);
  }

  select {
    height: 2.5em;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>');
    background-repeat: no-repeat;
    background-size: 1em;
    background-position: center right 0.5em;
  }

  select[multiple] {
    height: auto;
    background-image: none;
    background-repeat: no-repeat;
    background-size: auto;
    background-position: initial;
  }
`
