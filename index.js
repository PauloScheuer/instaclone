/**
 * @format
 */
import React from 'react';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import axios from 'axios';
import { name as appName } from './app.json';

import storeConfig from './src/store/storeConfig';
import App from './src/App';

axios.defaults.baseURL = 'https://instaclone-683f4-default-rtdb.firebaseio.com/';

const store = storeConfig();
const Redux = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

AppRegistry.registerComponent(appName, () => Redux);
