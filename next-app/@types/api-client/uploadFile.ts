import { IAxiosRequest } from '../axios'

export interface IUploadFileRequest extends IAxiosRequest {
  data: {
    file: File
    expires?: number | string
  }
}

export interface IUploadFileResponse {
  key: string
  accessToken: string
  toDelete?: string
}
