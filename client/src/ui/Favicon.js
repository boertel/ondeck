import React from 'react'
import { Helmet } from 'react-helmet'

function faviconTemplate(string, icon) {
  return `<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${icon}</text></svg>`.trim()
}

const Favicon = ({ emoji }) => {
  const svg = faviconTemplate`${emoji}`
  const href = `data:image/svg+xml,${svg}`
  return (
    <Helmet>
      <link rel="icon" href={href} />
    </Helmet>
  )
}

export default Favicon
