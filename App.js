import React from 'react';
import { createStore, combineReducers,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ProductReducers from './Store/actions/reducers/products';
import CartReducers from './Store/actions/reducers/carts';
import OrderReducers from './Store/actions/reducers/orders';
import NavigationContainer from './Navigation/NavigationContainer';
import AuthReducer from './Store/actions/reducers/auth';
import reduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
  products: ProductReducers,
  carts:CartReducers,
  Order:OrderReducers,
  Auth:AuthReducer,
});
const store = createStore(rootReducer,applyMiddleware(reduxThunk));
const App = () => {
  return (
    <Provider store={store}>
       
      <NavigationContainer />
    </Provider>
  );
};

 

export default App;
