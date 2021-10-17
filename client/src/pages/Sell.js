import React, { useEffect, useState } from 'react'
import { SetAWSS3ImageUrl } from '../store/actions/ImageActions'
import { CheckUserSession } from '../store/actions/AuthActions'
import { PostProduct, LoadAllProducts } from '../store/actions/ProductActions'
import { Form, Field } from 'react-final-form'
import { connect, useDispatch } from 'react-redux'

const mapStateToProps = ({ imageState, productState, authenticationState }) => {
  return { imageState, productState, authenticationState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setS3Url: ({ image_user_id, image_product_id, file_name }) =>
      dispatch(
        SetAWSS3ImageUrl({
          image_user_id,
          image_product_id,
          file_name
        })
      ),
    postProduct: (data) => dispatch(PostProduct(data)),
    getAllProducts: () => dispatch(LoadAllProducts()),
    checkUserSession: (data) => dispatch(CheckUserSession(data))
  }
}

function Sell(props) {
  const [files, setFiles] = useState()
  const [form, setForm] = useState({
    image_user_id: null,
    image_product_id: null,
    file_name: null
  })
  const [uploaded, setUploaded] = useState(false)

  function handleFormChange(e) {
    setFiles(e.target.files[0])
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData()

    formData.append(form.image_user_id, '85cab45f-53e3-410a-8f1a-5e799e11595b')
    formData.append(form.image_user_id, 2)
    formData.append(form.file_name, files)
    console.log(form)
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
    await props.getAllProducts()
  }
  useEffect(() => {
    props.getAllProducts()
    checkUserSession()
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
                <input {...input} placeholder="100% Authentic " />
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
      <form onSubmit={handleSubmit}>
        <label>Upload Your Product Photos</label>
        <input type="file" onChange={handleFormChange}></input>
        <button>Upload</button>
      </form>
      {/* {uploaded ? <img src={image} alt="hello uwu" /> : null} */}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Sell)
