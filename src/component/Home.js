import React from 'react'
import "../css/Home.css";
import Product from'./Product'
const Home = () => {
    return (
        <div className="home">
            <div className="home_container">
                <img
                    className="home_image"
                    src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.JPG"
                    alt=""
                    />
           
            <div className="home_row">
                             
                    <Product
                        id={1}
                    title="Malibu Rising: A Novel"
                    price={30.99}
                    image="https://images-na.ssl-images-amazon.com/images/I/51vCy8b-J2L._SX330_BO1,204,203,200_.jpg"
                    rating={3}
                />
                    <Product
                        id={2}
                    title="Malibu Rising: A Novel"
                    price={30.99}
                    image="https://images-na.ssl-images-amazon.com/images/I/51vCy8b-J2L._SX330_BO1,204,203,200_.jpg"
                    rating={3}
                />
            </div>
            <div className="home_row">
                    <Product
                        id={3}
                    title="Men's Regular-fit Short-Sleeve Print Shirt"
                    price={ 16.90}
                    rating={ 3}
                    image="https://m.media-amazon.com/images/I/81Pzxs6nadL._AC_UL320_.jpg" />
                    <Product
                        id={4}
                    title="Men's Venice Burnout Notch Neck Tee Shirt"
                    price={25 }
                    rating={ 3}
                    image="https://m.media-amazon.com/images/I/91R3aUFDJ9L._AC_UL320_.jpg" />
                    <Product
                        id={5}
                    title="Men's Slim-fit Stretch Cotton Tropical Hawaiian Shirt"
                    price={50 }
                    rating={3 }
                    image="https://m.media-amazon.com/images/I/91OBRzjFFUL._AC_UL320_.jpg"/>
               
                             
            </div>
             <div className="home_row">
                    <Product
                        id={6}
                    title="Apple Magic Mouse 2 (Wireless, Rechargable) - Silver"
                    price={3000 }
                    rating={5 }
                    image="https://images-na.ssl-images-amazon.com/images/I/41fVVAi1UiL._AC_UL220_SR180,220_.jpg"/>
               
                </div>
            </div>
            
        </div>
    )
}

export default Home;
