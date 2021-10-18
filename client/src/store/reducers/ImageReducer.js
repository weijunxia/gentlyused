import {
  SET_AWS_S3_IMAGE_URL,
  GET_ALL_IMAGES,
  DELETE_IMAGE,
  TOGGLE_IMAGE_UPLOADER
} from '../types'

const iState = {
  allImages: [],
  awsS3ImageUrl: [],
  imageUploadToggle: false
}

const ImageReducer = (state = iState, action) => {
  switch (action.type) {
    case SET_AWS_S3_IMAGE_URL:
      let s3UrlCopy = [...state.awsS3ImageUrl].push(action.payload)
      return { ...state, awsS3ImageUrl: s3UrlCopy }
    case GET_ALL_IMAGES:
      return { ...state, allImages: action.payload }
    case DELETE_IMAGE:
      return { ...state, allImages: action.payload }
    case TOGGLE_IMAGE_UPLOADER:
      return { ...state, imageUploadToggle: !state.imageUploadToggle }
    default:
      return state
  }
}

export default ImageReducer
