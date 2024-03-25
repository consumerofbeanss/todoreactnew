import React, {useState, useEffect} from "react";
import {signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, createUserWithEmailAndPassword} from "firebase/auth";
import {auth, google} from "../firebase.js";
import  {useNavigate} from "react-router-dom";
import './welcome.css';

export default function Welcome() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [registerInformation, setRegisterInformation] = useState({
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: ""
    })

    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => { 
            if(user){
                navigate('/homepage');
            }
    });
}, []);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password).then(() => {
            navigate('/homepage')
        }).catch((err) => alert(err.message));
    }

    const handleRegister = () => {
        if (registerInformation.email !== registerInformation.confirmEmail) {
            alert("Email does not match")
            return;
        } else if (registerInformation.password !== registerInformation.confirmPassword) {
            alert("Password does not match")
            return;
        }
        createUserWithEmailAndPassword(auth, registerInformation.email, registerInformation.password).then(() => {
            navigate('/homepage')
        }).catch((err) => alert(err.message));
    }

    const handleGoogle = () => {
        signInWithPopup(auth, google).then((data) => {
            navigate('/homepage');
        })
    }

    return (
        <div className = "Welcome">
            <h1>Welcome to Todo Auth</h1>
            <div className="login-register-container">
                {isRegistering ? (
                    <>
                    <input type="email" placeholder="Email" value = {registerInformation.email} onChange={(e) => setRegisterInformation({...registerInformation, email: e.target.value})}/>
                    <input type="email" placeholder="Confirm Email" value = {registerInformation.confirmEmail} onChange={(e) => setRegisterInformation({...registerInformation, confirmEmail: e.target.value})}/>
                    <input type="password" placeholder="Password" value = {registerInformation.password} onChange={(e) => setRegisterInformation({...registerInformation, password: e.target.value})}/>
                    <input type="password" placeholder="Confirm Password" value = {registerInformation.confirmPassword} onChange={(e) => setRegisterInformation({...registerInformation, confirmPassword: e.target.value})}/>
                    <button className="login-button" onClick={handleRegister}>Register</button>
                    <button className="register-button" onClick={() => setIsRegistering(false)}>Go back</button>
                    </>
                ) : (
                    <>
                    <input type="email" placeholder="Email" onChange={handleEmailChange} value={email}/>
                    <input type="password" placeholder="Password" onChange={handlePasswordChange} value={password}/>
                    <button className="login-button" onClick={handleLogin}>Login</button>
                    <button className="google-button" onClick={handleGoogle}>Login with Google</button>
                    <button className="register-button" onClick={() => setIsRegistering(true)}>Create Account</button>
                    </>
                )}
            </div>
        </div>
    )
}