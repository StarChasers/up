import styled from '@emotion/styled'

import Content from './Content'

const Page = styled('div')`
  display: grid;
  min-height: 100vh;
  width: 100%;

  grid-template-columns: auto;
  grid-template-areas: 'content';
  grid-template-rows: 1fr;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: 100%;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    grid-template-rows: 5px auto auto;
  }
`

type PageProps = typeof Page & {
  Content: typeof Content
}

const PageBlock = Page as PageProps

PageBlock.Content = Content

export default PageBlock
