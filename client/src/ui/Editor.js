import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components/macro'
import marked from 'marked'
import { NativeTypes } from 'react-dnd-html5-backend'
import { useDrop } from 'react-dnd'

import useUpload from './UploadInput'

function useDropFiles() {
  const [files, setFiles] = useState({})
  const [collected, ref] = useDrop({
    accept: [NativeTypes.FILE],
    drop(item, monitor) {
      const { files } = monitor.getItem()
      setFiles(files)
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  return [collected, ref, files]
}

function DropArea() {
  return (
    <p className="dropArea">
      <label>Attach files by dragging &amp; dropping, selecting or pasting them.</label>
    </p>
  )
}

const CHARACTERS = {
  b: 'bold',
  i: 'italic',
  u: 'underline',
}


function Editor({ value, onChange, characters, onMetaEnter, ...props }) {
  const ref = useRef(null)

  const [collected, dropzone, files] = useDropFiles()
  const { uploads, uploadFiles } = useUpload(files)

  const done = useRef({})

  useEffect(() => {
    const { selectionStart, selectionEnd } = ref.current
    for (const key in uploads) {
    if (!done.current[key]) {
        const { placeholder, content, src } = uploads[key];
        const targetValue = ref.current.value
        const start = targetValue.substring(0, selectionStart)
        const end = targetValue.substring(selectionEnd)

        if (!ref.current.value.includes(placeholder)) {
          ref.current.value = start + placeholder + end
        } else if (!ref.current.value.includes(content)) {
          ref.current.value = ref.current.value.replace(placeholder, content)
          done.current[key] = true
        }
        onChange({ target: { value: ref.current.value }})
      }
    }
  }, [uploads])

  const onPaste = evt => {
    const { files } = evt.clipboardData
    if (files.length) {
      uploadFiles(files)
      evt.preventDefault()
    }
  }

  /*
  useEffect(() => {
    const { selectionStart, selectionEnd } = ref.current
    for (const key in f) {
      const { alt, src, } = f[key]
      const targetValue = ref.current.value
      const start = targetValue.substring(0, selectionStart)
      const end = targetValue.substring(selectionEnd)

      const content = `![${alt}](${src})`
      const lookFor = new RegExp(`!\\[(.*)\\]\\((${src})\\)`)
      console.log(content)
      if (lookFor.test(ref.current.value)) {
        ref.current.value = start + content + end
      } else {
        ref.current.value.replace(lookFor, content)
      }

      onChange({ target: { value: ref.current.value }})
      ref.current.selectionStart = ref.current.selectionEnd = ref.current.selectionStart + content.length
    }
  }, [JSON.stringify(f)])
  */

  const onKeyDown = evt => {
    const { selectionStart, selectionEnd } = ref.current
    const targetValue = ref.current.value
    const start = targetValue.substring(0, selectionStart)
    const end = targetValue.substring(selectionEnd)
    const selection = targetValue.substring(selectionStart, selectionEnd)

    if (evt.key === 'Enter') {
      const lines = targetValue.split('\n')
      if (lines.length > 0) {
        const previousLine = lines[lines.length - 1]
        let match
        if (previousLine.startsWith(characters.list)) {
          const newValue = start + '\n' + characters.list + end
          ref.current.value = newValue
          onChange({ target: { value: newValue }})
          ref.current.selectionStart = ref.current.selectionEnd = selectionStart + characters.list.length + 1
          evt.preventDefault()
        } else if (match = previousLine.match(/^[\d]+\./)) {
          const index = `${parseInt(match[0], 10) + 1}.`
          const newValue = start + '\n' + index + end
          onChange({ target: { value: newValue }})
          ref.current.selectionStart = ref.current.selectionEnd = selectionStart + index.length + 1
          evt.preventDefault()
        }
      }
    }

    if (evt.key === 'Tab' && !evt.shiftKey) {
      const newValue = start + characters.tab + end
      // somehow we need both to keep caret at the right place
      ref.current.value = newValue
      onChange({ target: { value: newValue }})
      ref.current.selectionStart = ref.current.selectionEnd = selectionStart + characters.tab.length
      evt.preventDefault()
    }
    if (evt.metaKey) {
      if (evt.key === 'Enter') {
        onMetaEnter && onMetaEnter(evt)
      }
      if (evt.key === 'b' || evt.key === 'i' || evt.key === 'u') {
        const character = characters[CHARACTERS[evt.key]]
        const newValue = start + character + selection + character + end
        ref.current.value = newValue
        onChange({ target: { value: newValue }})
        ref.current.selectionStart = ref.current.selectionEnd = selectionStart + character.length * 2 + selection.length
        evt.preventDefault()
      }
    }
  }

  const onResize = () => {
    const maxHeight = parseInt(getComputedStyle(ref.current)['max-height'], 10)
    const { scrollHeight } = ref.current
    if (scrollHeight < maxHeight) {
      ref.current.style.height = `5px`
      ref.current.style.height = `${ref.current.scrollHeight}px`
    }
  }

  useEffect(() => onResize(), [])

  return (
    <div className="editor" ref={dropzone}>
      <textarea
        ref={ref}
        placeholder="Leave a comment"
        onChange={evt => onChange(evt)}
        onPaste={onPaste}
        value={value}
        onKeyDown={onKeyDown}
        onInput={onResize}
        {...props}
      />
      <DropArea />
    </div>
  )
}

Editor.defaultProps = {
  characters: {
    tab: '  ',
    bold: '**',
    italic: '_',
    strike: '~',
    underline: '__',
    list: '- ',
  },
}

marked.setOptions({
  gfm: true,
})

function Markdown({ value, ...props }) {
  const __html = marked(value)
  return <div dangerouslySetInnerHTML={{ __html }} {...props} />
}

function Preview({ value }) {
  return <div className="preview">{value ? <Markdown value={value} /> : 'Nothing to preview'}</div>
}

const MyEditor = React.forwardRef(({ className, value, onChange, name, id, }, ref) => {
  return (
    <div className={className}>
      <Editor ref={ref} value={value} onChange={onChange} name={name} id={id} />
      <Preview value={value} />
    </div>
  )
})

export default styled(MyEditor)`
  width: 100%;
  .editor {
    background-color: var(--fg);
    border-radius: var(--border-radius);
    border-style: solid;
    border-width: 2px;
    border-color: var(--border-color);

    &:focus-within {
      border-style: solid;
      border-width: 2px;
      border-radius: var(--border-radius);
      border-color: var(--primary);

      .dropArea {
        border-color: var(--border-color);
        color: var(--primary);
      }
    }

    textarea {
      display: block;
      width: 100%;
      min-height: 100px;
      max-height: 200px;
      max-width: 100%;
      padding: 8px;
      margin: 0;
      resize: vertical;
      line-height: 1.6;
      font-size: 1rem;
      color: var(--default);
      background-color: transparent;
      outline: none;
      border: none;
    }

    .dropArea {
      display: flex;
      position: relative;
      justify-content: space-between;
      padding: 7px 10px;
      margin: 0;
      font-size: 14px;
      line-height: 16px;
      color: var(--default);
      border-top: 2px dashed var(--border-color);
    }
  }

  .preview {
    border: 2px solid var(--border-color);
    padding: 12px;
    border-radius: var(--border-radius);

    pre {
      background-color: #ccc;
      padding: 12px;
      border-radius: var(--border-radius);
      overflow: scroll;
    }
  }
`
