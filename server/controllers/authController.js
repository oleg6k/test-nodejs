const bCrypt = require('bcrypt')

const userService = require('../services/userService')

const authHelper = require('../helpers/authHelper')
const resHelper = require('../helpers/responseHelper')


const signIn = (req, res) => {
  const {login, password} = req.body

  if (!login || !password) {
    return resHelper.responseError(res, "Fields 'login', 'password' are required!")
  }

  userService.getUserByLogin(login)
    .then((user) => {
      if (!user) {
        return resHelper.responseError(res, 'Incorrect login!')
      }
      const validPassword = bCrypt.compareSync(password, user.password)
      if (validPassword) {
        return authHelper.updateTokens(user.id, true)
          .then(tokens => resHelper.response(res, tokens))
      } else {
        return resHelper.responseError(res, 'Incorrect password!')
      }
    }).catch(e => resHelper.responseError(res, 'Ooops!'))
}

const signUp = (req, res) => {
  const {email, phone, password} = req.body
  if (!email || !phone || !password) {
    return resHelper.responseError(res, "Fields 'email','phone' and 'password' are required!")
  }
  userService.addUser({email, phone, password})
    .then((user) => {
      return authHelper.updateTokens(user.id, true)
        .then(tokens => resHelper.response(res, tokens))
    }).catch(e => {
    return resHelper.responseError(res, 'Ooops! Maybe you are not unique?...')
  })
}

const logout = (req, res) => {
  return authHelper.updateTokens(req.user.id, true)
    .then(tokens => resHelper.response(res, tokens))
}


module.exports = {
  signIn,
  signUp,
  logout
}