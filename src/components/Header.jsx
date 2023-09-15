import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { logout } from '../api/firebase';
import User from './User';
import { useAuthContext } from '../context/AuthContext';

export default function Header() {
  const navigator = useNavigate();
  const { user } = useAuthContext();

  return (
    <div className="flex p-3 border-b border-b-gray-300 justify-between items-center">
      <div className="flex items-end">
        <Link to="/">
          <p className="text-4xl font-bold mr-5 text-brand">SeoulIR</p>
        </Link>

        <p className="text-2xl">전자결재</p>
      </div>
      <div className="flex items-center">
        {user && <User user={user} />}
        {!user && <Button text="Login" onClick={() => navigator(`/login`)} />}
        {user && <Button text="Logout" onClick={logout} />}
        <div className="ml-2">
          {!user && <Button text="Sign" onClick={() => navigator(`/sign`)} />}
        </div>
      </div>
    </div>
  );
}
