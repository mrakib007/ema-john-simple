import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import  fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    document.title= 'Product Detail';
    const {productKey} = useParams();
    const [loading,setLoading] = useState(true);
    const product = fakeData.find(pd=> pd.key === productKey);        
    return (
        <div>
            <h1>Product detail:</h1>
            <Product showAddToCart = {false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;
{/* <h1>Coming Soon</h1> */}