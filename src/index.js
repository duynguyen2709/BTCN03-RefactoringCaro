import { Provider } from 'react-redux';
import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/Game';

import rootReducer from './reducers/RootReducer';

const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}>
                  <Game/>
                </Provider>,
                document.getElementById('root'));