import React from 'react';

import './Products.css';

const Products = ({ productsList, decrementQty, incrementQty }) => {
  return (
    <div className="products_container">
      {productsList.map((p) => (
        <div key={p.id} className="product">
          <img src={p.image} />
          <div>
            <span>{p.title}</span> <br />
            <span>{p.desc}</span>
          </div>
          <div>
            <button onClick={() => decrementQty(p.id)} disabled={p.qty < 1}>
              <i className="pi pi-minus"></i>
            </button>
            <input type="number" disabled value={p.qty} />
            <button onClick={() => incrementQty(p.id)}>
              <i className="pi pi-plus"></i>
            </button>
          </div>
          <div>
            <span>
              {p.currency}
              {p.price}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
