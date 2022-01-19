import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import Header from './Header/Header';
import Products from './Products/Products';

import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons

const App = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [productsList, setProductsList] = useState([]);

  const incrementQty = (id) => {
    const product = productsList.find((p) => p.id == id);
    product.qty++;
    setProductsList([...productsList]);
    setTotalAmount(totalAmount + +product.price);
  };

  const decrementQty = (id) => {
    const product = productsList.find((p) => p.id == id);
    product.qty--;
    setProductsList([...productsList]);
    setTotalAmount(totalAmount - +product.price);
  };

  const persistData = () => {
    localStorage.setItem('CART_TOTAL_AMOUNT', totalAmount);
    localStorage.setItem('CART_STATE', JSON.stringify(productsList));
  };

  const loadData = () => {
    const totalAmount = +localStorage.getItem('CART_TOTAL_AMOUNT');
    const productList = JSON.parse(localStorage.getItem('CART_STATE'));
    console.log(totalAmount);
    console.log(productList);
    if (productList?.length > 0) {
      setTotalAmount(totalAmount);
      setProductsList(productList);
      return false;
    }
    return true;
  };

  useEffect(() => {
    const callBackend = loadData();
    if (callBackend) {
      axios.get('https://dnc0cmt2n557n.cloudfront.net/products.json').then(
        (res) => {
          let initalCartAmount = 0;
          const products = res.data.products.map((p) => {
            initalCartAmount += +p.price;
            return {
              ...p,
              qty: 1,
            };
          });
          setProductsList(products);
          setTotalAmount(initalCartAmount);
        },
        (err) => console.error(err)
      );
    }
  }, []);

  useEffect(() => {
    persistData();
  }, [totalAmount]);

  return (
    <div className="main">
      <Header
        cartItemsList={productsList}
        totalAmount={totalAmount}
        setTotalAmount={setTotalAmount}
      />
      <Products
        productsList={productsList}
        incrementQty={incrementQty}
        decrementQty={decrementQty}
      />
    </div>
  );
};

render(<App />, document.getElementById('root'));
