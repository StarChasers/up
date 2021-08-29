import React from 'react'

import Layout from '../components/elements/Layout'
import HomePage from '../containers/HomePage'

export interface IHomePageProps {}

const Home = (props: IHomePageProps) => (
  <Layout {...props}>
    <HomePage {...props} />
  </Layout>
)

export default Home
