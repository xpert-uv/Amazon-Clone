import React,{useState, useEffect} from 'react'
import '../css/Payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link,useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from './reducer';
import axios from '../component/Axios';
import { db } from '../firebase';


const Payment = () => {
    const [{ basket, user }, dispatch] = useStateValue();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [processsing, setProcessing] = useState("");
    const [succeeded, setSucceeded] = useState(false);
    const [clientSecret, setClientSecret] = useState(true);
    const history = useHistory();


    useEffect(() => {
        //generate the special stripe secret which allows us to charge a customer

        const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket])
    
    console.log("the client secre", clientSecret);

    const handleSubmit = async e => {
        e.preventDefault()
        setProcessing(true);
        // this confirms the payments and knows how much to charges
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
                card: elements.getElement(CardElement)
            },
        }).then(({ paymentIntent }) => {
            //paymentIntent == payment confirmation 
            // database 

            db
                .collection("users")
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created:paymentIntent.created
            })


            setSucceeded(true);
            setError(null);
            setProcessing(false);
            // empty the basket
            dispatch({
                type: 'EMPTY_BASKET'
                
            })
            history.replace("/orders");
            console.log("this from payment pages");
        })
    }
    
    const handleChange = e => {
        //listen for changes in the CardElement
        // dispaly any errors as the customer types their card details
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");

    }


    return (
        <div className="payment">
            <div className="payment_container">
                <h1>
                    Checkout(
                     <Link to='/checkout'>{ basket?.length} items</Link>
                    )
                </h1>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment_address">
                        {/** need to fix address */}
                        <p>{user?.email}</p>
                        <p>{user?.email}</p>
                        <p>{ user?.email}</p>
                    </div>
                </div>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div calssName='payment_items'>
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                image={item.image}
                                title={item.title}
                                price={item.price}
                                rating={item.rating} />
                            
                        ))}
                    </div>

                </div>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment_details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment_pricecontainer">
                                 <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total:{value}</h3>)}
                                   decimalScale={2}
                                   value={getBasketTotal(basket)}
                                   displayType={"text"}
                                   thousandSeparator={true}
                                    prefix={"$"} />
                                
                                <button disabled={processsing || disabled || succeeded}>
                                    <span>{ processsing? <p>Processing</p>: "Buy Now"} </span>
                                </button>
                                   
                            </div>
                            {/**errors */}
                            {error && <div>{ error}</div>}
                        </form>


                    </div>

                </div>

            </div>
            
        </div>
    )
}

export default Payment
