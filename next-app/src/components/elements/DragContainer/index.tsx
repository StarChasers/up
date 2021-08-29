import { css } from '@emotion/css'
import React, { useContext } from 'react'

import { FileUploadContext } from '../../../providers/FileUploadProvider'
import Box from './Box'
import BorderContainer from './BorderContainer'
import { TypographyH5 } from '../Typography'
import theme from '../../../assets/theme'

const DragContainer = () => {
  const fileUploadContext = useContext(FileUploadContext)

  return (
    <Box
      {...fileUploadContext.fileUploadDropzone?.getRootProps()}
      className={
        fileUploadContext.fileUploadDropzone.isDragActive &&
        css`
          opacity: 1;
          z-index: 100;
        `
      }
    >
      <BorderContainer>
        <TypographyH5
          className={css`
            color: ${theme.colors.upBase02};
            font-weight: bold;
          `}
        >
          Drop file here!
        </TypographyH5>
      </BorderContainer>
    </Box>
  )
}

export default DragContainer
