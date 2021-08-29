import axios from 'axios'

const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL ?? '/api'

// TODO: Typescript types
const getConfiguration = (): Promise<any> => {
  return axios.get(`${backendApiUrl}/configuration`)
}

export default getConfiguration
