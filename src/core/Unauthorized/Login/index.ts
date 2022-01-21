import { connect } from 'react-redux'

import { currentUser } from 'common/store/currentUser'
import { Login as LoginComponent } from './Login'
import { loginUser, registerCredentials } from './actions'

export const Login = connect(null, {
  loginUser,
  registerCredentials,
  setAccessToken: currentUser.actions.setAccessToken,
})(LoginComponent)
