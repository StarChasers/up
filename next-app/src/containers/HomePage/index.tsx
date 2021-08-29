import React from 'react'

import { IHomePageProps } from '../../pages'

import useHomePage from './useHomePage'
import HomePageView from './HomePageView'

const HomePage = (props: IHomePageProps) => {
  const state = useHomePage(props)
  return <HomePageView {...props} {...state} />
}

export default HomePage
