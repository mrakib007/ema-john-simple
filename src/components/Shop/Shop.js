import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products,setProducts] = useState(first10);
    return (
        <div className ="shop-container">
           <div className="product-container">
           
                {
                    products.map(pd => <Product product = {pd}></Product> )
                }
            
           </div>
            {/* <h3>{products.length}</h3> */}
         <div className="cart-container">
             <h3>This is cart container</h3>
         </div>
        </div>
    );
};

export default Shop;