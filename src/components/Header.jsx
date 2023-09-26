import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { logout } from '../api/firebase';
import User from './User';
import { useAuthContext } from '../context/AuthContext';
import {FiMenu} from "react-icons/fi";

export default function Header({ toggleSidebar }) {
  const navigator = useNavigate();
  const { user } = useAuthContext();

   const handleLogout = async () => {
      try {
         await logout();
         navigator("/login");
      } catch (error) {
         console.error("Error during logout:", error);
      }
   };

   return (
    <div className="flex p-3 border-b border-b-gray-300 justify-between items-center">
      <div className="flex">
         <button onClick={toggleSidebar} className="mr-4 sm:hidden">
            <FiMenu size={24} />
         </button>
         <div className='flex items-end'>
            <Link to="/">
               <p className="text-lg sm:text-4xl font-bold mr-2 text-brand">SeoulIR</p>
            </Link>

            <p className="text-md sm:text-xl items-end">전자결재</p>
         </div>

      </div>
      <div className="flex items-center">
        {user && <User user={user} />}
        {!user && <Button text="Login" onClick={() => navigator(`/login`)} />}
        {user && <Button text="Logout" onClick={handleLogout} />}
        <div className="ml-2">
          {!user && <Button text="Sign" onClick={() => navigator(`/sign`)} />}
        </div>
      </div>
    </div>
  );
}
