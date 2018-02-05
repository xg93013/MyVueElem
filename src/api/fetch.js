import axios from 'axios'
import { baseUrl } from './env'

export default async(url = '', data = {}, type = 'GET') => {
  type = type.toUpperCase()
  url = baseUrl + url

  // get请求
  if (type === 'GET') {
    return axios.get(url, {
      params: data
    })
    .then((res) => {
      return Promise.resolve(res.data)
      // console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  // post请求
  if (type === 'POST') {
    return axios.post(url,
      data
    )
    .then((res) => {
      return Promise.resolve(res.data)
      // console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }
}
