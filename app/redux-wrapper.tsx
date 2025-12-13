'use client'

import { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'
import PageWrapper from './page-wrapper'
import { persistor, store } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

const ReduxWrapper: FC<{ children: ReactNode; userId: string; appData: any }> = ({ children, userId, appData }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PageWrapper userId={userId} appData={appData}>
          {children}
        </PageWrapper>
      </PersistGate>
    </Provider>
  )
}

export default ReduxWrapper
