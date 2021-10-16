import { GetUploadUrl } from '../../services/ImageServices'
const { SET_AWS_S3_IMAGE_URL } = require('../types')

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
