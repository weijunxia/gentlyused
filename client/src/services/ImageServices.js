import axios from 'axios'
import Client from '.'

export const GetUploadUrl = async (data) => {
  const res = await Client.post('/image', data)
  return res
}

export const UploadToS3 = async (url, data) => {
  const res = axios.put(url, data, {
    header: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return res
}
