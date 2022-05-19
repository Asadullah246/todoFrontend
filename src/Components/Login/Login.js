import React, { useEffect, useState } from 'react';
// import {  useSignInWithGoogle } from 'firebase/auth';
// import {auth} from "/src/Firebase.init"
import Loading from '../Loading';
// import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Firebase.init';
import { useAuthState, useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';

import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { async } from '@firebase/util';
// import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const location = useLocation()
    const [state, setState]=useState(true)
    const [user, loading, authError] = useAuthState(auth);
    const [loginState, setLoginState]= useState(false);
    const navigate=useNavigate()
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [
        createUserWithEmailAndPassword,
        eUser,
        eLoading,
        eError,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [
        signInWithEmailAndPassword,
        loginUser,
        loginLoading,
        loginError,
    ] = useSignInWithEmailAndPassword(auth);


    let from = location.state?.from?.pathname || "/";
    useEffect( ()=>{
        if (user) { 
            axios.post('http://localhost:5000/login', {
                email: user.email  
            })
                .then(function (response) {
                    const token = response.data.token;
                    localStorage.setItem("accessToken", token);
                    setSuccess(`succefully logged in`);
                    navigate(from, { replace: true });
                   
                })
              .catch(function (err) {
                setError(err?.message);
                
              });   
        }
    },[user,from, navigate ])
    if (loading || gLoading) {
        return <Loading></Loading>
    }
    if (error) {
        setError(error.message);
        return;
    }
    
    const googleSignIn=()=>{
         signInWithGoogle();
    }
    const signup = async (e) => {
       
        const email = e.target.email.value;
        const password = e.target.password.value;
        createUserWithEmailAndPassword(email, password);
        navigate("/")
        setSuccess(`succefully logged in`);

    }

    const handleLogin=async (e)=>{
        setError("");
        setSuccess("");
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        signInWithEmailAndPassword(email, password);
        setSuccess(`succefully logged in`);
        navigate("/")
    }
    const signInBtn=e=>{
        // e.preventdefault()
        setState(false)

    }
    const signUpBtn=e=>{
        // e.preventdefault()
        setState(true) 

    }

    return (
        <div className='text-left w-1/2 mx-auto'>
            {
                state && <form onSubmit={signup}>
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">email</label>
                    <input type="email" id="email" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="email" required/>
                </div>
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">password</label>
                    <input type="password" id="password" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="password" required/>
                </div>
                <div>
                    <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">confirm-password</label>
                    <input type="password" id="confirm-password" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                </div>
                {error && <p>{error}</p>}
                {success && <p>{success}</p>}
                <button type='submit' value='login' className="bg-[#3B82F6] mt-2 mb-4 px-8 py-1 rounded text-white">sign up</button>

            </form>
            }
            {
                state? "": <form onSubmit={handleLogin}>
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">email</label>
                    <input type="email" id="email" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="email" required />
                </div>
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">password</label>
                    <input type="password" id="password" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="password" required/>
                </div>
                
                {error && <p>{error}</p>}
                {success && <p>{success}</p>}
                <button type='submit' value='login' className="bg-[#3B82F6] px-8 py-1 rounded text-white mb-4">login</button>

            </form>
            }
            
            <button onClick={googleSignIn} className="bg-[#3B82F6] mt-2 mb-4 px-8 py-1 rounded text-white">Sign in with google</button>
           {
               state &&  <p>Already have an account? <button onClick={signInBtn}  className="bg-[#3B82F6] mb-4 px-8 py-1 rounded text-white">sign in</button></p>
           }
           {
               state?"":  <p>Dont have account? <button onClick={signUpBtn}  className="bg-[#a1adc0] px-4  rounded text-white">sign up</button></p>
           }

        </div>
    );
};

export default Login;