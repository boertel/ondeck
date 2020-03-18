import { transparentize } from 'polished'
import { createGlobalStyle } from 'styled-components'

const colors = {
  color: '#373737',
  primary: '#22986C',
  foreground: '#FFF',
  background: '#FFF',
  placeholder: '#999',
  sidebar: '#F7F7F7',
}

const theme = {
  ...colors,
  borderColor: 'rgba(0, 0, 0, 0.15)',
  hoverBackground: transparentize(0.85, colors.primary),
  radius: '4px',
}

export const GlobalStyle = createGlobalStyle`
  @import url("https://rsms.me/inter/inter.css");
  html {
    font-family: "Inter", sans-serif;
  }
  @supports (font-variation-settings: normal) {
    html {
      font-family: "Inter var", sans-serif;
    }
  }

  html, body, #root {
    color: ${({ theme }) => theme.color};
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: ${({ theme }) => theme.background};
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
  }

  ::placeholder {
    color: ${({ theme }) => theme.placeholder}
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;

    &:hover, &:focus {
      text-decoration: underline;
    }
  }

  form {
    width: 100%;
  }

  h1, h2, h3, h4, h5 {
    margin: 0;
    padding: 0;
  }

  h5 {
    font-size: 1em;
  }
  h4 {
    font-size: 1.2em;
  }
  h3 {
    font-size: 1.4em;
  }
  h2 {
    font-size: 1.6em;
  }
  h1 {
    font-size: 1.8em;
  }
`

export default theme
