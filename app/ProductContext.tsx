import React, { createContext, useState, useContext } from 'react';

const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [homeProducts, setHomeProducts] = useState([]);

  const addProductToHome = (product) => {
    setHomeProducts((prevProducts) => [...prevProducts, product]);
  };

  const removeProductFromHome = (productId) => {
    setHomeProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
  };

  return (
    <ProductContext.Provider value={{ homeProducts, addProductToHome, removeProductFromHome }}>
      {children}
    </ProductContext.Provider>
  );
};
