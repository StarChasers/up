import React, { useContext } from 'react'
import Head from 'next/head'

import Page from '../../blocks/Page'
import { FileUploadContext } from '../../../providers/FileUploadProvider'
import DragContainer from '../DragContainer'
import { css } from '@emotion/css'

export interface LayoutProps {
  title?: string
}

const Layout: React.FC<LayoutProps> = ({
  title = 'UP | Share your dreams',
  children,
  ...props
}) => {
  const fileUploadContext = useContext(FileUploadContext)

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Page>
        <Page.Content
          {...fileUploadContext.fileUploadDropzone?.getRootProps()}
          {...props}
          className={
            fileUploadContext.fileUploadDropzone.isDragActive &&
            css`
              filter: brightness(50%);
            `
          }
          children={children}
        />
        <DragContainer />
      </Page>
    </>
  )
}

export default Layout
