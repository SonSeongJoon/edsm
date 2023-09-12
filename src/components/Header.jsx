import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { login, logout, onUserStateChange } from '../api/firebase';
import { set } from 'firebase/database';
import User from "./User";

export default function Header() {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange(setUser);
    }, []);

  return (
    <div className="flex p-3 border-b border-b-gray-300 justify-between items-center">
      <div className="flex items-end">
        <Link to="/">
          <p className="text-4xl font-bold mr-5 text-brand">SeoulIR</p>
        </Link>

        <p className="text-2xl">전자결재</p>
      </div>
      <div className='flex items-center'>
        {user && <User user={user}/>}
        {!user && <Button text="Login" onClick={login} />}
        {user && <Button text="Logout" onClick={logout} />}
      </div>
    </div>
  );
}
