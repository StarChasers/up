import { css } from '@emotion/css'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

import DefaultUpload from '../../../components/blocks/Boxes/DefaultUploadBox'
import Button from '../../../components/elements/Button'
import colorVariants from '../../../components/elements/Button/variants/_colorVariants'
import theme from '../../../assets/theme'
import LineWithText from '../../../components/elements/LineWithText'
import DesktopContainer from '../../../components/elements/DesktopContainer'
import MobileContainer from '../../../components/elements/MobileContainer'
import Icon from '../../../components/elements/Icon'
import { IDefaultUploadBoxState } from './useDefaultUploadBox'

const DefaultUploadBoxView = (props: IDefaultUploadBoxState) => (
  <>
    <DesktopContainer
      breakpoint={theme.breakpoints.sm}
      className={css`
        display: grid;
      `}
    >
      <DefaultUpload>
        <Button
          variant='uploadDashed'
          buttonProps={{
            onClick: props.fileUpload.fileUploadDropzone.open
          }}
        >
          Drop file here
        </Button>
        <LineWithText>OR</LineWithText>
        <Button
          variant='transparent'
          colorStates={colorVariants.transparent}
          icon={<Icon icon={faFolderOpen} />}
          iconAlign={'left'}
          textProps={{
            className: css`
              color: ${theme.colors.upBase01};
            `
          }}
          buttonProps={{ onClick: props.fileUpload.fileUploadDropzone.open }}
        >
          Choose file
        </Button>
      </DefaultUpload>
    </DesktopContainer>
    <MobileContainer breakpoint={theme.breakpoints.sm}>
      <DefaultUpload>
        <Button
          variant='transparent'
          colorStates={colorVariants.transparent}
          textProps={{
            className: css`
              color: ${theme.colors.upBase01};
            `
          }}
          buttonProps={{ onClick: props.fileUpload.fileUploadDropzone.open }}
        >
          Choose file
        </Button>
      </DefaultUpload>
    </MobileContainer>
  </>
)

export default DefaultUploadBoxView
