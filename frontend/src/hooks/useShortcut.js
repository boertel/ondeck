import { useEffect } from 'react'

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

const useShortcut = (shortcut, callback) => {
  useEffect(() => {

    const onKeyDown = evt => {
      if (typeof shortcut === 'string') {
        if (isShortcut(shortcut, evt) && typeof callback === 'function') {
          callback(evt)
        }
      } else if (typeof shortcut === 'object') {
        Object.keys(shortcut).forEach(key => {
          if (isShortcut(key, evt) && typeof shortcut[key] === 'function') {
            shortcut[key](evt)
          }
        })
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [shortcut, callback])
}

export default useShortcut
