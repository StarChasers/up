import styled from '@emotion/styled'

import Content from './Content'
import Image from './Image'
import TransparentBar from './TransparentBar'
import BackgroundBox from './BackgroundBox'

const Box = styled('div')`
  position: relative;
  width: ${(props) => props.theme.constants.containerSizes.md};
  margin: 0 auto;
  min-height: 1px;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    width: ${(props) => props.theme.constants.containerSizes.sm};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    width: calc(100% - 50px);
  }
`

type BoxProps = typeof Box & {
  BackgroundBox: typeof BackgroundBox
  Content: typeof Content
  Image: typeof Image
  TransparentBar: typeof TransparentBar
}

const BoxProps = Box as BoxProps

BoxProps.BackgroundBox = BackgroundBox
BoxProps.Content = Content
BoxProps.Image = Image
BoxProps.TransparentBar = TransparentBar

export default BoxProps
