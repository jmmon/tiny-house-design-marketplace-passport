import React, { createContext, useState, useEffect } from 'react';
// import { dummyProducts } from '../services/dummy';
export const ProductsContext = createContext()

const ProductsContextProvider = ({children}) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/api/designs/browse')
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                console.log('ProductsContext Fetch not OK', res);
            }
        })
        .then(jsonRes => { 
            console.log('ProductsContext Fetch jsonRes', jsonRes);
            setProducts(jsonRes);
        })
        .catch(e => console.log(e));
    }, []);
    

    return ( 
        <ProductsContext.Provider value={{products}} >
            { children }
        </ProductsContext.Provider>
     );
}
 
export default ProductsContextProvider;