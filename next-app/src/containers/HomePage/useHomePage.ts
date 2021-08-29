import { useContext } from 'react'

import {
  TUploadBoxContentContext,
  UploadBoxContentContext
} from '../../providers/UploadBoxContentProvider'
import { IHomePageProps } from '../../pages'
import { FileUploadContext, TFileUploadContext } from '../../providers/FileUploadProvider'

export interface IHomePageStateProps {
  uploadBoxContent: TUploadBoxContentContext
  fileUploadContext: TFileUploadContext
}

const useHomePage = ({}: IHomePageProps): IHomePageStateProps => {
  const uploadBoxContent = useContext(UploadBoxContentContext)
  const fileUploadContext = useContext(FileUploadContext)

  return { uploadBoxContent, fileUploadContext }
}

export default useHomePage
