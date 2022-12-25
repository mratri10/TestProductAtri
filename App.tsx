import * as React from 'react';
import {PermissionsAndroid, Text, View} from 'react-native';
import {getCurrentPosition} from 'react-native-geolocation-service';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {API_URL, setBaseURL} from './src/apis';
import MyApp from './src/page/myapp';
import rootReducer from './src/redux';

const store = createStore(rootReducer, {}, applyMiddleware(thunk));
setBaseURL(API_URL);
function App() {
  React.useEffect(() => {}, []);

  return (
    <Provider store={store}>
      <MyApp />
    </Provider>
  );
}

export default App;
