'use client'

import { FC } from 'react'
import { Provider } from 'react-redux'
import PageWrapper from './page-wrapper'
import { persistor, store } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { IWrapper } from './types/common.types'

const ReduxWrapper: FC<IWrapper> = ({ children, user, textBlocks, headerButton }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PageWrapper user={user} textBlocks={textBlocks} headerButton={headerButton}>
          {children}
        </PageWrapper>
      </PersistGate>
    </Provider>
  )
}

export default ReduxWrapper
