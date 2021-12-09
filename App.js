import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import Navigations from './src/navigations';
import { Provider } from 'react-redux';
import {store, persistor} from './src/redux/store';
import { StatusBar, View } from 'react-native';
const App = () => {
  return(
    <View style={{flex:1}}>
      <StatusBar 
      
      translucent={true}
      />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigations />
      </PersistGate>
    </Provider>
    </View>
  )
};

export default App;