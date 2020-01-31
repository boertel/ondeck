import { transparentize } from 'polished'
import { createGlobalStyle } from 'styled-components'



const colors = {
  color: '#E1E3E5',
  primary: '#FD7065',
  foreground: '#373737',
  background: '#1F2023',
  placeholder: '#999',
}

const theme = {
  ...colors,
  borderColor: 'rgba(255, 255, 255, 0.15)',
  hoverBackground: transparentize(0.85, colors.primary),
  radius: '4px',
}


export const GlobalStyle = createGlobalStyle`
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
