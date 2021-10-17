import { SET_AWS_S3_IMAGE_URL, GET_ALL_IMAGES, DELETE_IMAGE } from '../types'

const iState = {
  allImages: [],
  awsS3ImageUrl: ''
}

const ImageReducer = (state = iState, action) => {
  switch (action.type) {
    case SET_AWS_S3_IMAGE_URL:
      return { ...state, awsS3ImageUrl: action.payload }
    case GET_ALL_IMAGES:
      return { ...state, allImages: action.payload }
    case DELETE_IMAGE:
      return { ...state, allImages: action.payload }
    default:
      return state
  }
}

export default ImageReducer
