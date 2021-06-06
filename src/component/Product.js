import React from 'react'
import "../css/Product.css"
import {  useStateValue }  from "./StateProvider";


const Product = ({ id, title, price, image, rating }) => {
    
         const [state, dispatch] = useStateValue();
   
    console.log(`this is from product : ${state}`);
   
    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                price: price,
                rating: rating,
                image: image
            }
        })
     }
        return (
            <div className="product">
                <div className="product_info">
                    <p>{title}</p>
                    <p className="product_price">
                        <small>$</small>
                        <strong>{price}</strong>
                    </p>
                
                    <div className="product_rating">
                        
                        {Array(rating)
                            .fill()
                            .map((_, i) => (<p><span>💥</span></p>))}
                               
                    </div>
                
                </div>
                <img src={image} alt="product" />
            
                <button onClick={addToBasket}>Add to Basket</button>
            
            </div>
        )
     
}

export default Product;
