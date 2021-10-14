import { S3_RESPONSE, SET_AWS_S3_IMAGE_URL } from '../types'

const iState = {
  msg: '',
  type: '',
  awsS3ImageUrl: '',
  images: []
}

const ImageReducer = (state = iState, action) => {
  switch (action.type) {
    case SET_AWS_S3_IMAGE_URL:
      return { ...state, awsS3ImageUrl: action.payload }
    case S3_RESPONSE:
      return {
        ...state,
        ...{ msg: action.data._response, type: action.data._type }
      }
    default:
      return state
  }
}

export default ImageReducer
