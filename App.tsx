import React from 'react';
import Base from './src';
import {Provider} from 'react-redux';
import store from './src/api/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <Base />
    </Provider>
  );
}

export default App;
