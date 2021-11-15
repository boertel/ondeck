import React from 'react'
import _classNames from 'classnames'
import styled from 'styled-components'

const _View = React.forwardRef(
  (
    { alignItems, radius, justifyContent, flexDirection, flexWrap, as: AsComponent, classNames, className, ...props },
    ref
  ) => {
    let _className = className
    if (classNames) {
      // FIXME probably want to memo this since classNames is an array
      _className = _classNames.apply(_classNames, classNames)
    }
    return <AsComponent {...props} className={_className} ref={ref} />
  }
)

const View = styled(_View)`
  width: ${({ $width }) => $width};

  display: flex;
  border-radius: ${({ radius }) => radius};
  flex-direction: ${({ flexDirection }) => flexDirection};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  flex-wrap: ${({ flexWrap }) => flexWrap};
  gap: ${({ $gap }) => $gap};
`

View.defaultProps = {
  forwardedAs: 'div',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  flexDirection: 'row',
  flexWrap: 'initial',
  radius: 'var(--border-radius)',
  $width: '100%',
}

export default View
