import _debug from 'debug'
import { useCallback, useEffect } from 'react'

const debug = _debug('shortcuts')

const isShortcut = (shortcut, { key, metaKey, shiftKey, ctrlKey }) => {
  let parts = shortcut.split('+').map(v => v.trim().toLowerCase())
  const matches = new Array(parts.length).fill(false)

  do {
    const part = parts.shift()
    const index = parts.length
    if (part === 'meta' && metaKey) {
      matches[index] = true
    }
    if (part === 'shift' && shiftKey) {
      matches[index] = true
    }
    if (part === 'ctrl' && ctrlKey) {
      matches[index] = true
    }
    if (key.toLowerCase() === part) {
      matches[index] = true
    }
  } while (parts.length > 0)

  return matches.every(match => match === true)
}

const useShortcut = (shortcuts, ref) => {
  const execute = useCallback((evt) => {
    Object.keys(shortcuts).forEach(key => {
      if (isShortcut(key, evt) && typeof shortcuts[key] === 'function') {
        shortcuts[key](evt)
      }
    })
  }, [shortcuts])

  useEffect(() => {
    const onKeyDown = evt => {
      if (ref && ref.current) {
        const isFromCurrentRef = ref.current === evt.target || ref.current.contains(evt.target)
        debug(evt.key, ref.current, evt.target, isFromCurrentRef)
        if (isFromCurrentRef) {
          execute(evt)
        }
      } else {
        execute(evt)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [execute, ref])
}

export default useShortcut
