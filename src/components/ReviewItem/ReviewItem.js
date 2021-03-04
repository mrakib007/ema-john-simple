import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity} = props.product;
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
            <button className="main-button">Remove</button>
        </div>
    );
};

export default ReviewItem;<h3>This is review</h3>