import React from 'react'
import {PersistGate} from 'redux-persist/lib/integration/react'
import {Provider} from 'react-redux'
import {ThemeProvider} from 'styled-components'
import SplashScreen from 'react-native-splash-screen'

import {persistor, store} from './src/config/store'
import theme from './src/config/themes'
import Navigator from './src/config/routes'

class App extends React.Component {
  componentDidMount() {
    setTimeout(() => SplashScreen.hide(), 500)
  }

  render() {
    // persistor.purge()
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Navigator></Navigator>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
