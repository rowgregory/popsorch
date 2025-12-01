'use client'

import React, { FC } from 'react'
import { Provider } from 'react-redux'
import { ClientPageProps } from './types/common.types'
import PageWrapper from './page-wrapper'
import { persistor, store } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

const ReduxWrapper: FC<ClientPageProps> = ({ children, data }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PageWrapper data={data}>{children}</PageWrapper>
      </PersistGate>
    </Provider>
  )
}

export default ReduxWrapper
