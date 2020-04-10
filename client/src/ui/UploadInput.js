import { useEffect, useReducer, } from 'react'
import axios from 'axios'
import { v4 as uuid4 } from 'uuid'

import { upload } from '../resources/api'


const handleUpload = async (file, { dispatch }) => {
  if (!file) {
    return
  }
  const params = {
    filename: file.name,
    filetype: file.type,
    path: 'uploads',
  }

  const response = await upload.get('/upload', { params })
  const { signedUrl, src, contentType } = response.data

  dispatch({
    type: 'start',
    key: file.key,
    payload: {
      placeholder: `![Uploading ${src}...]()`,
      src: '',
      //src: window.URL.createObjectURL(file),
    }
  })

  await axios.put(signedUrl, file, {
    headers: { 'Content-Type': contentType, },
    onUploadProgress: ({ total, loaded }) => {
      dispatch({
        type: 'progress',
        key: file.key,
        payload: {
          progress: loaded / total,
        }
      })
    }
  })

  dispatch({
    type: 'finish',
    key: file.key,
    payload: {
      content: `![${src}](${src})`,
      src,
    }
  })
}

function reducer(state, action) {
  const { key, payload } = action
  switch(action.type) {
    case 'start':
    case 'finish':
      return {
        ...state,
        [key]: {
          ...(state[key] || {}),
          ...payload
        }
      }
    default:
      return state
  }
}

const useUpload = files => {
  const [state, dispatch] = useReducer(reducer, {})

  const upload = (file) => {
    file.key = uuid4()
    return handleUpload(file, { dispatch })
  }

  const uploadFiles = (files) => {
    const uploads = Array.from(files).map(async file => {
      return await upload(file)
    })

    Promise.all(uploads)
  }

  useEffect(() => {
    if (files.length) {
      uploadFiles(files)
    }
  }, [files])


  return { uploads: state, uploadFiles }
}

export default useUpload
