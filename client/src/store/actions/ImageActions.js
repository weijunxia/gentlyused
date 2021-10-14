import { GetUploadUrl, UploadToS3 } from '../../services/ImageServices'
const {
  UPLOAD_IMAGE_TO_S3,
  SET_AWS_S3_IMAGE_URL,
  S3_RESPONSE
} = require('../types')

export const UploadImageToS3 = (data) => {
  return async (dispatch) => {
    try {
      const uploadImage = await UploadToS3(data)
      dispatch({ type: UPLOAD_IMAGE_TO_S3, payload: uploadImage })
    } catch (error) {
      throw error
    }
  }
}

export const SetAWSS3ImageUrl = (url) => {
  return async (dispatch) => {
    try {
      const s3Url = await GetUploadUrl(url)
      dispatch({ type: SET_AWS_S3_IMAGE_URL, payload: s3Url })
    } catch (error) {
      throw error
    }
  }
}

export const S3Response = (response, type) => {
  return { type: S3_RESPONSE, data: { _response: response, _type: type } }
}
