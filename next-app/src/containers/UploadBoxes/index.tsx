import DefaultUploadBox from './DefaultUploadBox'

export type Boxes = 'DefaultUploadBox'

const UploadBoxes: { [key in Boxes]: { Component: () => JSX.Element } } = {
  DefaultUploadBox: {
    Component: DefaultUploadBox
  }
}

export default UploadBoxes
