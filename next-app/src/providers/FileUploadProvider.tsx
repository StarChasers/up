import { AxiosResponse } from 'axios'
import React, { useCallback, useContext, useEffect } from 'react'
import { DropzoneState, useDropzone } from 'react-dropzone'
import { useMutation, UseMutationResult } from 'react-query'

import APIClient from '../api-client'
import { IUploadFileRequest, IUploadFileResponse } from '../../@types/api-client/uploadFile'
import { TOnDropParams } from '../../@types/react-dropzone'
import { UploadBoxContentContext } from './UploadBoxContentProvider'

export type TFileUploadContext = {
  uploadFileMutation: UseMutationResult<
    AxiosResponse<IUploadFileResponse>,
    unknown,
    IUploadFileRequest
  >
  fileUploadDropzone: DropzoneState
}

const defaultValue: TFileUploadContext = {
  uploadFileMutation: null,
  fileUploadDropzone: null
}

export const FileUploadContext = React.createContext<TFileUploadContext>(defaultValue)

const FileUploadProvider: React.FC = (props) => {
  const uploadBoxContent = useContext(UploadBoxContentContext)

  const uploadFileMutation = useMutation(APIClient.uploadFile, {
    onError: (e) => {
      console.log(e)
    }
  })

  const uploadFile = (file: File) => {
    uploadFileMutation.mutate({ data: { file, expires: '24h' } })
  }

  const onDrop = useCallback<TOnDropParams>(
    (acceptedFiles) => {
      // Dragging files to upload should be only allowed on DefaultUploadBox
      if (uploadBoxContent.currentBox !== 'DefaultUploadBox') {
        return
      }

      uploadFile(acceptedFiles[0])
    },
    [uploadBoxContent.currentBox]
  )

  const fileUploadDropzone = useDropzone({
    multiple: false,
    noClick: true,
    noKeyboard: true,
    onDrop
  })

  useEffect(() => {
    const handleOnPaste = (event) => {
      const items = event.clipboardData.items
      let file
      if (event.clipboardData.getData('text') === '') {
        file = items[0].getAsFile()
      } else {
        file = new File([event.clipboardData.getData('text')], 'paste.txt', {
          type: 'text/plain'
        })
      }
      uploadFile(file)
    }

    window.addEventListener('paste', handleOnPaste, false)
    return () => window.removeEventListener('paste', handleOnPaste)
  }, [])

  return (
    <FileUploadContext.Provider
      value={{
        uploadFileMutation,
        fileUploadDropzone
      }}
    >
      <input {...fileUploadDropzone.getInputProps()} />
      {props.children}
    </FileUploadContext.Provider>
  )
}

export default FileUploadProvider
