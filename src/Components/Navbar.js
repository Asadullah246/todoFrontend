import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../Firebase.init';

const Navbar = () => {
    const [user] = useAuthState(auth);
    const signOut=e=>{
        e.preventDefault();
        auth.signOut()
    }
    return (
        <nav className=" lg:px-32 sm:px-4 py-2.5 rounded  w-screen">
  <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link  to="/" className=" text-xl font-semibold  text-blue-700">TODO</Link>
   
    <div className="">
      <ul className="flex  mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
        <li>
          {!user && <Link to="/login" className="block py-2 pr-4 pl-3 text-base rounded md:bg-transparent text-blue-700 md:p-0 " aria-current="page">Login</Link>}
        </li>
        <li>
          {user && <button onClick={signOut} className="block py-2 pr-4 pl-3 text-blue-700  rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white text-base" aria-current="page">sign out</button>}
        </li>
      
      </ul>
    </div>
  </div>
</nav>
    );
};

export default Navbar;