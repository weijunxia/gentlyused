import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import {
  SetAWSS3ImageUrl,
  SetUploadFile,
  ToggleImageUpload,
  GetImageByProduct
} from '../store/actions/ImageActions'
import { CheckUserSession } from '../store/actions/AuthActions'
import { PostProduct, LoadAllProducts } from '../store/actions/ProductActions'
import { Form, Field } from 'react-final-form'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import { connect, useDispatch } from 'react-redux'
import '../styles/sell.css'
import SellPreview from '../components/SellPreview'
const mapStateToProps = ({
  userState,
  imageState,
  productState,
  authenticationState
}) => {
  return { userState, imageState, productState, authenticationState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setS3Url: (data) => dispatch(SetAWSS3ImageUrl(data)),
    postProduct: (data) => dispatch(PostProduct(data)),
    getAllProducts: () => dispatch(LoadAllProducts()),
    checkUserSession: (data) => dispatch(CheckUserSession(data)),
    toggleImageUpload: () => dispatch(ToggleImageUpload()),
    setUploads: (data) => dispatch(SetUploadFile(data)),
    getImageByProductId: (id) => dispatch(GetImageByProduct(id))
  }
}

function Sell(props) {
  const handleUploadChange = async (e) => {
    await props.setUploads(e.target.files[0])
    // console.log(e.target.files[0])
    // console.log(props.imageState.filesToUpload[0])

    if (props.imageState.filesToUpload) {
      let formData = new FormData()
      formData.append('file_name', e.target.files[0])
      formData.append('image_user_id', props.userState.individualUser.id)
      formData.append(
        'image_product_id',
        props.productState.recentlyAddedProduct.id
      )
      const res = await props.setS3Url(formData)
      return res
    }
  }
  const imagePreviews = async (id) => {
    if (props.productState.recentlyAddedProduct) {
      await props.getImageByProductId(id)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    // formData.append('file_name', files)
    const res = await props.setS3Url(formData)
    return res
  }

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  const dispatch = useDispatch()
  let productFormData = { sold: false, product_user_id: '' }
  const token = localStorage.getItem('token')

  const checkUserSession = async (token) => {
    const sessionStatus = await props.checkUserSession(token)
    return sessionStatus
  }

  const uploadProduct = async (values) => {
    await sleep(300)
    const sessionStatus = await props.checkUserSession(token)
    values.product_user_id = sessionStatus
    values.price = parseInt(values.price)
    await props.postProduct(values)
    await props.toggleImageUpload()
    // await props.getAllProducts()
  }
  const renderImages = () => {
    if (props.productState.productImages && props.recentlyAddedProduct) {
      console.log('hello')
    }
  }

  useEffect(() => {
    props.getAllProducts()
    checkUserSession()
    imagePreviews(props.productState.recentlyAddedProduct.id)
    renderImages()
  }, [props.imageState.awsS3ImageUrl])

  const sellPage = (
    <Form
      onSubmit={uploadProduct}
      uploadProduct={uploadProduct}
      initialValues={productFormData}
      validate={(values) => {
        const errors = {}
        if (!values.title) {
          errors.title = 'Title Required'
        }
        if (!values.description) {
          errors.description = 'Description Required'
        }
        if (!values.size) {
          errors.size = 'Size Required'
        }
        if (!values.price) {
          errors.price = 'Price Required'
        }
        return errors
      }}
      render={({ submitError, uploadProduct, submitting, values }) => (
        <form
          className="sell_form"
          onSubmit={(e) => {
            e.preventDefault()
            uploadProduct(values)
          }}
        >
          <Field name="title">
            {({ input, meta }) => (
              <div className="sell_page_input_field">
                <label className="sell_page_label">Title</label>
                <input
                  className="sell_page_input"
                  {...input}
                  type="text"
                  placeholder="Jordan Brand ?? Dior"
                />
                {(meta.error || meta.submitError) && meta.touched && (
                  <span>{meta.error || meta.submitError}</span>
                )}
              </div>
            )}
          </Field>
          <Field name="description" component="textarea">
            {({ input, meta }) => (
              <div className="sell_page_input_field">
                <label className="sell_page_label">Description</label>
                <textarea
                  className="sell_page_input"
                  {...input}
                  placeholder="100% Authentic "
                />

                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="size">
            {({ input, meta }) => (
              <div className="sell_page_input_field">
                <label className="sell_page_label">Size</label>
                <input
                  className="sell_page_input"
                  {...input}
                  type="text"
                  placeholder="US 9"
                />
                {meta.error && meta.touched && <span>{meta.error}</span>}
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="price">
            {({ input, meta }) => (
              <div className="sell_page_input_field">
                <label className="sell_page_label">Price $</label>
                <input
                  className="sell_page_input"
                  {...input}
                  type="number"
                  placeholder="5000"
                />
                {meta.error && meta.touched && <span>{meta.error}</span>}
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          {submitError && <div className="error">{submitError}</div>}
          <button className="sell_page_create_post" disabled={submitting}>
            Create Post
          </button>
        </form>
      )}
    />
  )

  return (
    <div className="sell_page">
      Post your Listing Today for Free Shipping!
      <div className="sell_page_product_form">{sellPage}</div>
      <input
        type="file"
        accept="image/*"
        className="sell_page_image_input"
        onChange={handleUploadChange}
      ></input>
      <div></div>
      <SellPreview />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Sell)
