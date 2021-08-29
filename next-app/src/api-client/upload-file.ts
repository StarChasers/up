import axios, { AxiosResponse } from 'axios'

import { IUploadFileRequest, IUploadFileResponse } from '../../@types/api-client/uploadFile'

const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL ?? '/api'

const uploadFile = (payload: IUploadFileRequest): Promise<AxiosResponse<IUploadFileResponse>> => {
  const data = new FormData()
  data.append('file', payload.data.file)
  data.append('expires', payload.data.expires?.toString() ?? undefined)

  return axios.post(`${backendApiUrl}/upload`, data, payload.config)
}

export default uploadFile
