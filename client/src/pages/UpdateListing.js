import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Field } from 'react-final-form'
import { useLocation } from 'react-router-dom'
import { CheckUserSession } from '../store/actions/AuthActions'
import {
  UpdateUserProduct,
  DeleteUserProduct,
  LoadProductById,
  LoadAllProducts,
  ToggleProductDeleteModal
} from '../store/actions/ProductActions'
import '../styles/updatelisting.css'

const mapStateToProps = ({ authenticationState, productState }) => {
  return { authenticationState, productState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    CheckUserSession: (data) => dispatch(CheckUserSession(data)),
    deleteUserProduct: (id) => dispatch(DeleteUserProduct(id)),
    toggleProductModal: () => dispatch(ToggleProductDeleteModal()),
    loadAllProducts: () => dispatch(LoadAllProducts()),
    updateProduct: (id, data) => dispatch(UpdateUserProduct(id, data)),
    checkUserSession: (data) => dispatch(CheckUserSession(data))
  }
}

function UpdateListing(props) {
  let updateProductFormData = {
    title: props.productState.individualProduct.title,
    description: props.productState.individualProduct.description,
    price: props.productState.individualProduct.price,
    size: props.productState.individualProduct.size
  }
  const updateUsersProduct = async (values) => {
    await props.updateProduct(props.productState.individualProduct.id, values)

    updateProductFormData = {
      title: values.title,
      description: values.description,
      price: values.price,
      size: parseInt(values.price),
      updatedAt: new Date()
    }
  }
  const checkUserSession = async (token) => {
    await props.checkUserSession(token)
  }
  useEffect(() => {
    const token = localStorage.getItem('token')
    checkUserSession(token)
    props.loadAllProducts()
  }, [])
  return (
    <div className="update_listing">
      <div className="update_listing_left"></div>
      <div className="update_listing_right">
        <Form
          onSubmit={updateUsersProduct}
          updateUsersProduct={updateUsersProduct}
          initialValues={updateProductFormData}
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
          render={({
            submitError,
            updateUsersProduct,
            submitting,
            reset,
            values
          }) => (
            <form
              className="update_product_form"
              onSubmit={(e) => {
                e.preventDefault()
                updateUsersProduct(values)
              }}
            >
              <Field name="title">
                {({ input, meta }) => (
                  <div className="update_product_input_field">
                    <label className="update_product_label">Title</label>
                    <input
                      {...input}
                      type="text"
                      placeholder={updateProductFormData.title}
                    />
                    {(meta.error || meta.submitError) && meta.touched && (
                      <span>{meta.error || meta.submitError}</span>
                    )}
                  </div>
                )}
              </Field>
              <Field name="description" component="textarea">
                {({ input, meta }) => (
                  <div className="update_product_input_field">
                    <label className="update_product_label">Description</label>
                    <input
                      {...input}
                      placeholder={updateProductFormData.description}
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="size">
                {({ input, meta }) => (
                  <div className="update_product_input_field">
                    <label className="update_product_label">Size</label>
                    <input
                      {...input}
                      type="text"
                      placeholder={updateProductFormData.size}
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="price">
                {({ input, meta }) => (
                  <div className="update_product_input_field">
                    <label className="update_product_label">Price $</label>
                    <input
                      {...input}
                      type="number"
                      placeholder={updateProductFormData.price}
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              {submitError && <div className="error">{submitError}</div>}
              <button className="update_product_button" disabled={submitting}>
                Update Listing
              </button>
            </form>
          )}
        ></Form>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateListing)
