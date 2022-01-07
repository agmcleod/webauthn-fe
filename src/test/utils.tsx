import React, { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { render as rtlRender } from '@testing-library/react'

import { store } from '../common/store'

export function render(ui: React.ReactElement, options = {}) {
  const Wrapper = ({ children }: PropsWithChildren<{}>) => {
    return <Provider store={store}>{children}</Provider>
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options })
}
