import React from 'react'
import { GetUploadUrl, UploadToS3 } from '../services/ImageServices'

function Sell() {
  function handleImageSubmit(e) {
    e.preventDefault()
    // UploadToS3()
    GetUploadUrl(e.target[0].files[0].name)
    // console.log('e.target[0]', e.target[0].files[0])
  }

  return (
    <div className="sell">
      <div>
        <form className="image_form" onSubmit={(e) => handleImageSubmit(e)}>
          <input type="file" accept="image/*" className="image_input" />
          {/* get secure url from our server
                post image directly to s3 buck
                post request to my server to store any extra data
            */}
          <button>Upload</button>
        </form>
      </div>
    </div>
  )
}

export default Sell
