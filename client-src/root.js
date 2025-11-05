import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import * as ReduxSaga from 'redux-saga'

// TODO: Add back RecordSelector in the root div once it's working.
//import RecordSelector from './components/RecordSelector';
import RecordViewerWrapper from './containers/RecordViewerWrapper';
import rootReducer from './reducers'
import rootSaga from './sagas/rootSaga'

// Root renderer for record viewer.
window.renderRoot = function(instanceUrl, accessToken, recordId, rootNode) {
  console.log('renderRoot called with:', { instanceUrl, hasAccessToken: !!accessToken, recordId });
  
  // Provide a small shim so components that still use React.PropTypes continue to work.
  React.PropTypes = PropTypes;

  const sagaMiddleware = ReduxSaga.createSagaMiddleware()
  const initialState = {login:{instanceUrl, accessToken}, record:{recordId}};
  console.log('Creating store with initial state:', initialState);
  
  const store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  
  // Log the initial state after store creation
  console.log('Initial Redux state:', store.getState());

  ReactDOM.render(
    <Provider store={store}>
      <div>
        <RecordViewerWrapper />
      </div>
    </Provider>,
    rootNode);
}
