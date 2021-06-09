import React from 'react'
import "../css/header.css";
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from '../firebase';
const Header = () => {
    const [{ basket, user }, dispatch] = useStateValue();


    const handleAuthentication = () => {

        if (user) {
            auth.signOut();
        }
        
    }
    
    return (
        <div className="header">
            <Link to='/'>
            <img
                className="header_logo"
               src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                    alt="amg-logo" />
                </Link>
            <div className="header_search">
                <input className="header_searchInput"type='text' />
                <SearchIcon
                    className="header_searchIcon" />

            </div>
            <div className="header_nav">
                <Link to={!user && "/login"}>
                <div onClick={handleAuthentication} className="header_option">
                    
                    <span className="header_optionLineOne">{ user? `Hello,${user.email}` :"Hello Guest"}</span>
                    <span className="header_optionLineTwo">{ user? "Log Out" :"Sign In"}</span>
                        
                </div>
                </Link>
                <Link to="/orders">
                <div className="header_option">
                    <span className="header_optionLineOne">Returns</span>
                    <span className="header_optionLineTwo">& Orders</span>
                    </div>
                </Link>
                
                <div className="header_option">
                    <span className="header_optionLineOne">Your</span>
                    <span className="header_optionLineTwo">Prime</span>
                </div>
                <div className="header_option"></div>
            </div>
            <div class="header_optionBasket ">
                <Link to='/checkout'>
                <ShoppingBasketIcon
                   />
                    <span className="header_optionLineTwo header_basketCount">{basket?.length}</span></Link>
          </div>
                
            
        </div>
    )
}

export default Header;
