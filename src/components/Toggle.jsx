import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {useAuthContext} from "../context/AuthContext";

const list = [
  { key: 1, name: '전체', path: 'total' },
  { key: 2, name: '대기', path: 'wait' },
  { key: 3, name: '완료', path: 'complete' },
  { key: 4, name: '수신함', path: 'receive' },
];

export default function Toggle({toggleSidebar}) {
  const navigate = useNavigate();
  const location = useLocation();
  const {user} = useAuthContext();
  const handleClick = (path) => {
    navigate(`/${path}`);
  };

   return (
      <div className="w-[200px]">
         <div className="flex items-center">
            <h3 className="text-md sm:text-lg font-bold">결재 문서</h3>
         </div>
         <ul className="mt-1">
            {list.map((item) => {
               if (item.name === '수신함' && (!user || !user.isAdmin)) {
                  return null;
               }
               return (
                  <li
                     key={item.key}
                     className={`py-2 px-1 text-sm sm:text-md rounded-lg cursor-pointer 
                          ${
                        location.pathname.includes(item.path)
                           ? 'bg-brand opacity-60 text-white'
                           : 'hover:bg-brand hover:bg-opacity-20 hover:text-black'
                     }`}
                     onClick={() => {
                        handleClick(item.path);
                        toggleSidebar();
                     }}
                  >
                     {item.name}
                  </li>
               );
            })}
         </ul>
      </div>
   );
}
