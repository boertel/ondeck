import React from 'react'
import styled from 'styled-components'

const Login = ({ className }) => {
  return (
    <div className={className}>
      <main>
        <h1>ondeck</h1>
        <a className="button" href="/identity/login/github">
          Login with GitHub
        </a>
      </main>
      <footer>
        Created by{' '}
        <a href="https://ben.oertel.fr" target="_blank" rel="noreferrer">
          Benjamin Oertel
        </a>
        . You can check out the code on GitHub:{' '}
        <a href="https://github.com/boertel/ondeck" target="_blank" rel="noreferrer">
          boertel/ondeck
        </a>
        .
      </footer>
    </div>
  )
}

export default styled(Login)`
  display: flex;
  height: 100vh;
  flex-direction: column;
  max-width: 760px;
  margin: 0px auto;
  padding: 20px;

  main {
    flex-grow: 1;
  }

  h1 {
    margin-bottom: 40px;
  }

  a.button {
    text-align: center;
    border: 2px solid var(--primary);
    border-radius: var(--border-radius);
    padding: 6px 12px;
    text-decoration: none;
    &:hover,
    &:focus {
      background-color: var(--primary-hover);
    }
  }

  footer {
    font-size: 0.8em;
    padding: 20px 0;
    color: var(--placeholder);
  }
`
