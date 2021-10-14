const { User } = require('../models')
const middleware = require('../middleware')

const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
      raw: true
    })

    if (
      user &&
      (await middleware.comparePassword(
        user.password_digest,
        req.body.password
      ))
    ) {
      let payload = {
        id: user.id,
        email: user.email
      }
      // const updatedUser = await User.update({ deleted: false })
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    throw error
  }
}

const Register = async (req, res) => {
  try {
    const { username, email, password, picture } = req.body
    console.log(req.body)
    let password_digest = await middleware.hashPassword(password)
    const user = await User.create({
      username,
      email,
      password_digest,
      picture,
      deleted: false
    })
    res.send(user)
  } catch (error) {
    throw error
  }
}

const UpdatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body
    const user = await User.findByPk(req.params.id)
    if (
      user &&
      (await middleware.comparePassword(
        user.datavalues.password_digest,
        oldPassword
      ))
    ) {
      let passwordDigest = await middleware.hashPassword(newPassword)
      await user.update({ passwordDigest })
      return res.send({ status: 'Ok', payload: user })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {}
}

const CheckSession = async (req, res) => {
  try {
    const { payload } = res.locals
    res.send(payload)
  } catch (error) {
    throw error
  }
}

module.exports = {
  Login,
  Register,
  UpdatePassword,
  CheckSession
}
