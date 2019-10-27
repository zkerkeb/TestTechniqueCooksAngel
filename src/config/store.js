import {applyMiddleware, createStore} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {persistStore, persistReducer} from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel1'
import FilesystemStorage from 'redux-persist-filesystem-storage'
import reducers from '../reducers'

const persistConfig = {
  key: 'root',
  storage: FilesystemStorage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['movies'],
}

const devMiddleware = []

if (__DEV__) {
  devMiddleware.push(logger)
}

const pReducer = persistReducer(persistConfig, reducers)

export const store = createStore(
  pReducer,
  applyMiddleware(...devMiddleware, thunk),
)
export const persistor = persistStore(store)
