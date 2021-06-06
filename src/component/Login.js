import React,{useState} from 'react';
import '../css/Login.css';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase';

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   
   
    const signIn = (e) => {
        e.preventDefault()
        // some firebase 
        auth.signInWithEmailAndPassword(email, password).then(auth => {
            history.push('/')
        })
            .catch(error => alert(error.message));
    }
    
    const register = (e) => {
        //some firebase 
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password).then((auth) => {
            // it successfully created a new user with email and password
            console.log(auth);
            if (auth) {
                history.push('/')
            }
    
        }).catch(error=>alert(error.message))
    
    }
    
    return (
        <div className="login">
            <Link to='/'>
            <img  className="login_logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                    alt="amg-logo" />
                </Link>
            <div className="login_container">
                <h1>Sign In</h1>
                <form >
                    <h5>E-mail</h5>
                    <input
                        type="text"
                        value={email}
                        onChange={e=>setEmail(e.target.value) }/>
                    <h5>Password</h5>
                    <input
                        type="password"
                        value={password}
                        onChange={e=>setPassword(e.target.value) }/>


                    <button onClick={ signIn}type="submit"className="login_signInButton">Sing In</button>
                </form>
                <p>
                    By continuing,
                    you agree to Colone - Amazon's Conditions of Use and Privacy Notice.
                </p>
                <button onClick={register}
                    className="login_registerButton">Create your Amazon Account</button>
            </div>
            
        </div>
    )
}

export default Login;
