import React, { PropsWithChildren } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

import { State } from 'common/store/root'
import { selectors, logout } from 'common/store/currentUser'

interface Props {
  accessToken: string
  tokenData: { [key: string]: any } | null
  logout: () => void
}

function RequireAuthComp({
  accessToken,
  children,
  tokenData,
  logout,
}: PropsWithChildren<Props>) {
  let location = useLocation()

  if (
    !accessToken ||
    (tokenData && tokenData.exp && tokenData.exp * 1000 < Date.now())
  ) {
    if (tokenData) {
      logout()
    }
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to='/login' state={{ from: location }} />
  }

  return children as JSX.Element
}

export const RequireAuth = connect(
  (state: State) => ({
    accessToken: selectors.getAccessToken(state),
    tokenData: selectors.getTokenData(state),
  }),
  {
    logout,
  }
)(RequireAuthComp)
