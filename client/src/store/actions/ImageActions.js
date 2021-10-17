import {
  GetUploadUrl,
  DeleteImage,
  GetAllImages
} from '../../services/ImageServices'
const {
  SET_AWS_S3_IMAGE_URL,
  GET_ALL_IMAGES,
  DELETE_IMAGE
} = require('../types')

export const SetAWSS3ImageUrl = ({
  image_user_id,
  image_product_id,
  file_name
}) => {
  return async (dispatch) => {
    try {
      const s3Url = await GetUploadUrl({
        image_user_id,
        image_product_id,
        file_name
      })
      dispatch({ type: SET_AWS_S3_IMAGE_URL, payload: s3Url })
    } catch (error) {
      throw error
    }
  }
}

export const GetImages = () => {
  return async (dispatch) => {
    try {
      const images = await GetAllImages()
      dispatch({ type: GET_ALL_IMAGES, payload: images })
    } catch (error) {
      throw error
    }
  }
}

export const DeleteImageById = (id) => {
  return async (dispatch) => {
    try {
      const deleted = await DeleteImage(id)
      dispatch({ type: DELETE_IMAGE, payload: deleted })
    } catch (error) {
      throw error
    }
  }
}
