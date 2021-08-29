import { keyframes } from '@emotion/css'
import styled from '@emotion/styled'
import React from 'react'

import theme from '../../assets/theme'

const spinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
    opacity: 0.5;
  }
  100% {
    transform: rotate(360deg);
  }
`

const LoaderStyle = styled('span')<{ loaderColor: string }>`
  display: inline-flex;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  overflow: hidden;
  border-width: 2px;
  border-style: solid;
  border-color: ${(props) => props.loaderColor};
  border-top-color: transparent !important;
  animation: ${spinner} 1s linear infinite;
`

interface LoaderProps {
  loaderColor?: string
  style?: Record<string, unknown>
}

const Loader = ({ loaderColor = theme.colors.upBase09, ...props }: LoaderProps) => (
  <LoaderStyle loaderColor={loaderColor} {...props} />
)

export default Loader
