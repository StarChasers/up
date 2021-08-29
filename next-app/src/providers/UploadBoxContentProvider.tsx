import React, { createContext, useState } from 'react'

import { Boxes } from '../containers/UploadBoxes'

export type TUploadBoxContentContext = {
  currentBox: Boxes
  setCurrentBox: React.Dispatch<Boxes>
}

export const UploadBoxContentContext = createContext<TUploadBoxContentContext>({
  currentBox: 'DefaultUploadBox',
  setCurrentBox: () => undefined
})

const UploadBoxContentProvider: React.FC = (props) => {
  const [currentBox, setCurrentBox] = useState<Boxes>('DefaultUploadBox')

  return (
    <UploadBoxContentContext.Provider value={{ currentBox, setCurrentBox }}>
      {props.children}
    </UploadBoxContentContext.Provider>
  )
}

export default UploadBoxContentProvider
