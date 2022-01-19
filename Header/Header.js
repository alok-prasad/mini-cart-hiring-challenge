import React, { useState } from 'react';

import './Header.css';

const Header = ({ totalAmount, setTotalAmount, cartItemsList }) => {
  const [showCart, setShowCart] = useState(false);

  const removeItem = (i) => {
    setTotalAmount(totalAmount - +i.price * i.qty);
    i.qty = 0;
  };

  return (
    <div className="top_header card">
      <h1 className="app_name">Mini Cart</h1>
      <div className="cart_icon">
        <i className="pi pi-shopping-cart"></i>
      </div>
      <div className="cart_details" onClick={() => setShowCart(!showCart)}>
        <span>${totalAmount}</span> <br />
        <span>
          {cartItemsList?.filter((i) => i.qty > 0)?.length} items
        </span>{' '}
        <i className="pi pi-caret-down"></i>
        <div
          className="cart_items"
          style={{ display: showCart ? 'block' : 'none' }}
        >
          <ul>
            {cartItemsList
              .filter((i) => i.qty > 0)
              .map((i, key) => (
                <li key={key}>
                  <i className="pi pi-times" onClick={() => removeItem(i)}></i>
                  <div className="cart_item_details">
                    <span>{i.title}</span> <br />
                    <span>
                      {i.currency}
                      {i.price}
                    </span>
                  </div>
                  <span className="item_quantity">Qty {i.qty}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
