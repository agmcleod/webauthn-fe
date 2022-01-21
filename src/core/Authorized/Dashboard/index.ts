import { connect } from 'react-redux'

import { selectors, logout } from 'common/store/currentUser'
import { Dashboard as DashboardComp } from './Dashboard'
import { State } from 'common/store/root'

export const Dashboard = connect(
  (state: State) => ({
    tokenData: selectors.getTokenData(state),
  }),
  {
    logout,
  }
)(DashboardComp)
