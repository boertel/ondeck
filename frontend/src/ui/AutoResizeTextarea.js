import React, { useRef, useEffect } from 'react'


const AutoResizeTextarea = React.forwardRef(({ style = {}, ...props }, ref) => {
  useEffect(() => {
    const computedStyle = window.getComputedStyle(ref.current)
    const paddingTop = (parseInt(computedStyle['padding-top'], 10) || 0) / 2
    ref.current.paddingTop = paddingTop
    ref.current.maxHeight = parseInt(computedStyle['min-height'], 10)
    onResize()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onResize = () => {
    const { scrollHeight } = ref.current
    if (scrollHeight >= ref.current.maxHeight) {
      ref.current.style.height = `5px`
      ref.current.style.height = `${ref.current.scrollHeight + ref.current.paddingTop}px`
    }
  }

  return <textarea onInput={onResize} ref={ref} style={{ ...style, minHeight: '38px', resize: 'none' }} {...props} />
})

export default AutoResizeTextarea
