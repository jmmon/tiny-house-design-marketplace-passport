import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ProductsContextProvider from './contexts/ProductsContext';
import CartContextProvider from './contexts/CartContext';

ReactDOM.render(
  <ProductsContextProvider>
      <CartContextProvider>
          <App />
      </CartContextProvider>
  </ProductsContextProvider>,
  document.getElementById('root')
);