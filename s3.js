const aws = require('aws-sdk')
const crypto = require('crypto')
const { promisify } = require('util')
require('dotenv').config()

const region = 'us-east-2'
const bucketName = 'gentlyused'
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_KEY
const randomBytes = promisify(crypto.randomBytes)

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

const GenerateUploadURL = async () => {
  const rawBytes = await randomBytes(16)
  const imageName = rawBytes.toString('hex')

  const params = {
    Bucket: bucketName,
    Key: imageName,
    expires: 60
  }

  const uploadURL = await s3.getSignedUrlPromise('putObject', params)

  return uploadURL
}

module.exports = { GenerateUploadURL }
