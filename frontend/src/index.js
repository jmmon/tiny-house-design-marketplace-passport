import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import ProductsContextProvider from './contexts/ProductsContext';
import CartContextProvider from './contexts/CartContext';

ReactDOM.render(
    <CartContextProvider>
        <App />
    </CartContextProvider>,
    document.getElementById('root')
);

/* <ProductsContextProvider></ProductsContextProvider> */