import React, { useEffect } from 'react'
import {
  UploadImageToS3,
  SetAWSS3ImageUrl,
  S3Response
} from '../store/actions/ImageActions'
import { CheckUserSession } from '../store/actions/AuthActions'
import { PostProduct, LoadAllProducts } from '../store/actions/ProductActions'
import { Form, Field } from 'react-final-form'
import { connect, useDispatch } from 'react-redux'

const mapStateToProps = ({ imageState, productState, authenticationState }) => {
  return { imageState, productState, authenticationState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadToS3: (data) => dispatch(UploadImageToS3(data)),
    setS3Url: (data) => dispatch(SetAWSS3ImageUrl(data)),
    setResponse: (data) => dispatch(S3Response(data)),
    postProduct: (data) => dispatch(PostProduct(data)),
    getAllProducts: () => dispatch(LoadAllProducts()),
    checkUserSession: (data) => dispatch(CheckUserSession(data))
  }
}

function Sell(props) {
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
    await props.getAllProducts()
  }
  useEffect(() => {
    props.getAllProducts()
  }, [dispatch])

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
                  {...input}
                  type="text"
                  placeholder="Jordan Brand × Dior"
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
                <input
                  {...input}
                  placeholder="100% Authentic. Purchased from Dior boutique store in Costa Mesa. Won by ruffle.

Comes with original packaging, shopping bag and receipt.

42EU, more commonly known as 8.5US.

New and never worn.

Absolutely NO RETURN! NO TRADES! NO LOWBALL!!!

Listed price is intended for profile exposure. No one will be buying these at 50k"
                />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="size">
            {({ input, meta }) => (
              <div className="sell_page_input_field">
                <label className="sell_page_label">Size</label>
                <input {...input} type="text" placeholder="US 9" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="price">
            {({ input, meta }) => (
              <div className="sell_page_input_field">
                <label className="sell_page_label">Price $</label>
                <input {...input} type="number" placeholder="5000" />
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
    <div className="sell">
      <div>{sellPage}</div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Sell)
