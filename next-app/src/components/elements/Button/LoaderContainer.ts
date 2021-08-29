import { css } from '@emotion/react'
import styled from '@emotion/styled'

const LoaderContainer = styled('div')<{ isLoading?: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: ${(props) => (props.isLoading ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`

export const changeOpacityOnLoading = css`
  opacity: 0.5;
`

export default LoaderContainer
