import { transparentize, darken } from 'polished'
import { createGlobalStyle } from 'styled-components'

const colors = {
  color: '#373737',
  primary: '#22986C',
  secondary: '#FCC530',
  danger: '#E96A73',
  foreground: '#FFF',
  background: '#F7F7F7',
  placeholder: '#999',
  sidebar: '#F7F7F7',
  overlay: 'rgba(38, 38, 38, 0.8)',
}

const theme = {
  ...colors,
  borderColor: 'rgba(0, 0, 0, 0.15)',
  hoverBackground: darken(0.10, colors.primary),
  radius: '4px',
}

export const GlobalStyle = createGlobalStyle`
  :root {
    --default: ${({ theme }) => theme.color};
    --primary: ${({ theme }) => theme.primary};
    --primary-hover: ${({ theme }) => transparentize(0.8, theme.primary)};
    --secondary: ${({ theme }) => theme.secondary};
    --border-color: ${({ theme }) => theme.borderColor};
    --border-color-hover: ${({ theme }) => theme.borderColor};
    --fg: ${({ theme }) => theme.foreground};
    --bg: ${({ theme }) => theme.background};
    --placeholder: ${({ theme }) => theme.placeholder};
    --border-radius: ${({ theme }) => theme.radius};
    --overlay: ${({ theme }) => theme.overlay};
  }

  html, body, #root {
    color: var(--default);
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: var(--fg);
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
  }

  ::placeholder {
    color: var(--placeholder);
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: var(--primary);
    text-decoration: none;
    cursor: pointer;

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
