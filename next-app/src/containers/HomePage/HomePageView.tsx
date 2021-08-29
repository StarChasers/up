import { css, cx } from '@emotion/css'
import Link from 'next/link'
import React from 'react'

import { IHomePageProps } from '../../pages'
import { IHomePageStateProps } from './useHomePage'

import HomePage from '../../components/blocks/HomePage'
import Container from '../../components/elements/Container'
import Box from '../../components/blocks/Box'
import image from '../../../public/images/mainImage.jpg'
import AlignedDiv from '../../components/elements/AlignedDiv'
import Circle from '../../components/elements/Circle'
import styleHelpers from '../../assets/styleHelpers'
import theme from '../../assets/theme'
import { TypographyP } from '../../components/elements/Typography'
import footerLinks from './footerLinks'
import ExpandableBalloon from '../../components/elements/ExpandableBalloon'
import UploadBoxes from '../UploadBoxes'
import DesktopContainer from '../../components/elements/DesktopContainer'

interface IHomePageViewProps extends IHomePageProps, IHomePageStateProps {}

const HomePageView = (props: IHomePageViewProps) => (
  <HomePage>
    <Container>
      <Box>
        <Box.Content>
          <Box.Image src={image} alt='Simple landscape' />
          {React.createElement(UploadBoxes[props.uploadBoxContent.currentBox]?.Component)}
        </Box.Content>
        <Box.TransparentBar>
          <DesktopContainer breakpoint={theme.breakpoints.sm}>
            <AlignedDiv>
              <div className={styleHelpers.hoverExpandableElement({ width: 255, height: 130 })}>
                <Circle
                  size='25px'
                  className={cx(
                    styleHelpers.centerBothSides,
                    css`
                      color: ${theme.colors.upBase02};
                      font-weight: 600;
                      font-family: 'Bree Serif', serif;
                      cursor: pointer;
                      user-select: none;
                    `
                  )}
                >
                  i
                </Circle>
                <ExpandableBalloon>
                  Did you know that you can paste <b>images</b> and <b>text</b> from your clipboard
                  directly into our website?
                </ExpandableBalloon>
              </div>
            </AlignedDiv>
          </DesktopContainer>
          <AlignedDiv align='flex-end' className={styleHelpers.childrenWithDots(theme)}>
            {footerLinks.map((footerLink) => (
              <Link key={footerLink.href} href={footerLink.href} passHref>
                <a target='_blank' rel='noreferrer noopener'>
                  <TypographyP>{footerLink.text}</TypographyP>
                </a>
              </Link>
            ))}
          </AlignedDiv>
          <Box.BackgroundBox />
        </Box.TransparentBar>
      </Box>
    </Container>
  </HomePage>
)

export default HomePageView
