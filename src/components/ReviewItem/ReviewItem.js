import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,key,price} = props.product;
    const reviewItemStyle = {
        borderBottom : '1px solid lightgray',
        marginBottom : '5px',
        paddingBottom : '5px',
        marginLeft: '200px'
    }
    return (
        <div style={reviewItemStyle} className="review-item">
            <h3 className="product-name">{name}</h3>
            <p>Quantity: {quantity}</p>
            <p> <small>$ {price} </small></p>
            <button 
            className="main-button"
            onClick={() => props.removeProduct(key)}>Remove</button>
        </div>
    );
};

export default ReviewItem;<h3>This is review</h3>