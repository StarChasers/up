import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import FileUploadProvider from '../../../providers/FileUploadProvider'
import UploadBoxContentProvider from '../../../providers/UploadBoxContentProvider'

const queryClient = new QueryClient()

const Providers: React.FC = (props) => (
  <QueryClientProvider client={queryClient}>
    <UploadBoxContentProvider>
      <FileUploadProvider>{props.children}</FileUploadProvider>
    </UploadBoxContentProvider>
  </QueryClientProvider>
)

export default Providers
