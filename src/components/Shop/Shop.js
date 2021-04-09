import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    document.title= 'Shop more';
    // const first10 = fakeData.slice(0,10);
    const [products,setProducts] = useState([]);
    const [cart , setCart] = useState([]);
    const [search,setSearch] = useState('');

    useEffect(()=>{
        fetch('https://sheltered-harbor-12069.herokuapp.com/products?search='+search)
        .then(res=>res.json())
        .then(data=>setProducts(data))
    },[search])

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://sheltered-harbor-12069.herokuapp.com/productsByKeys',{
            method: 'POST',
            headers:{
                'Content-TYpe': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res=>res.json())
        .then(data=>setCart(data))
    },[])

    const handleSearch = event => {
        setSearch(event.target.value);
    }

    const handleAddProduct = (product) =>{
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd=> pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd=>pd.key !== toBeAddedKey);
            newCart = [...others,sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart,product];
        }
        // const count = sameProduct.length;
        // const newCart = [...cart,product];

        setCart(newCart);
        
        // const sameProduct = newCart.filter(pd=> pd.key === product.key);
        // const count = sameProduct.length;
        addToDatabaseCart(product.key,count);
    }

    return (
        <div className ="twin-container">
           <div className="product-container">
           <input type="text" placeholder="search product" onBlur={handleSearch} className="product-search"/> 
           
                {
                    products.map(pd =>    
                    <Product
                    key = {pd.key}
                    showAddToCart = {true}
                    handleAddProduct = {handleAddProduct}
                    product = {pd}></Product> )
                }
            
           </div>
            {/* <h3>{products.length}</h3> */}
         <div className="cart-container">
             <Cart cart = {cart}>
                <Link to = "review">
                <button className="main-button">Review Order</button>
                </Link>
             </Cart>
         </div>
        </div>
    );
};

export default Shop;