import React from 'react'
import { Helmet } from 'react-helmet'

const BrowserTitle = ({ children }) => {
  return (
    <Helmet>
      <title>on deck{React.Children.count(children) > 0 ? ` | ${children}` : ''}</title>
    </Helmet>
  )
}

export default BrowserTitle
