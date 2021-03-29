import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    document.title= 'Product Detail';
    const {productKey} = useParams();
    const [product,setProduct] = useState({});
    useEffect(()=>{
        fetch('https://sheltered-harbor-12069.herokuapp.com/product/'+productKey)
        .then(res=>res.json())
        .then(data=>setProduct(data));
    },[productKey])

    const [loading,setLoading] = useState(true);
    return (
        <div>
            <h1>Product detail:</h1>
            <Product showAddToCart = {false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;
{/* <h1>Coming Soon</h1> */}