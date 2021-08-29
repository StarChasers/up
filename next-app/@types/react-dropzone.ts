import { DropEvent, FileRejection } from 'react-dropzone'

export type TOnDropParams = (
  acceptedFiles: File[],
  fileRejections: FileRejection[],
  event: DropEvent
) => void
