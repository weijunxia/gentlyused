import {
  SET_AWS_S3_IMAGE_URL,
  GET_ALL_IMAGES,
  DELETE_IMAGE,
  SET_UPLOAD_FILE,
  TOGGLE_IMAGE_UPLOADER
} from '../types'

const iState = {
  allImages: [],
  awsS3ImageUrl: [],
  filesToUpload: [],
  previewImages: [],
  imageUploadToggle: false
}

const ImageReducer = (state = iState, action) => {
  switch (action.type) {
    case SET_AWS_S3_IMAGE_URL:
      return { ...state, awsS3ImageUrl: action.payload }
    case GET_ALL_IMAGES:
      return { ...state, allImages: action.payload }
    case DELETE_IMAGE:
      return { ...state, allImages: action.payload }
    case SET_UPLOAD_FILE:
      return { ...state, filesToUpload: action.payload }
    case TOGGLE_IMAGE_UPLOADER:
      return { ...state, imageUploadToggle: !state.imageUploadToggle }
    default:
      return state
  }
}

export default ImageReducer
