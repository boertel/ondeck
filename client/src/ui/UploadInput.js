import { useState, useCallback } from 'react'
import S3Upload from 'react-s3-uploader/s3upload'


const S3_BUCKET_URL = 'ondeck-dev'

const useUpload = files => {
  /*
  const [progress, setProgress] = useState(0)

  const onUploadError = () => {}
  const onUploadFinished = () => {}
  const onProgress = (progress) => setProgress(progress)

  new S3Upload({
    files,
    contentDisposition: 'auto',
    uploadRequestHeaders: { 'x-amz-acl': 'public-read' },
    onError: onUploadError,
    onFinishS3Put: onUploadFinished,
    onProgress,
    server: '/api/dashboard',
    signingUrl: '/s3/sign',
    signingUrlQueryParams: { path: 'uploaded-image/' },
    s3Url: S3_BUCKET_URL,
  })
  */
  useCallback(() => {
    console.log(files)
  }, [files])

  return [files]
}

export default useUpload
