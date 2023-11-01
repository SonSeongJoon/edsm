import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const list = [
  { key: 0, name: '대시보드', path: 'dashboard' },
  { key: 1, name: '전체', path: 'total' },
  { key: 2, name: '대기', path: 'wait' },
  { key: 3, name: '반려', path: 'reject' },
  { key: 4, name: '완료', path: 'complete' },
  { key: 5, name: '수신함', path: 'receive' },
  { key: 6, name: '경영지원팀', path: 'mst' },
];

export default function Toggle({ toggleSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthContext();
  const handleClick = (path) => {
    navigate(`/${path}`);
  };
   const shouldRenderItem = (item, user) => {
      if (item.name === '수신함' && (!user || !user.isAdmin)) return false;
      if (item.name === '경영지원팀' && (!user || !user.isMst)) return false;
      return true;
   };

  return (
    <div className="w-[200px]">
      <div className="flex items-center">
        <h3 className="text-md sm:text-lg font-bold">Menu</h3>
      </div>
       <ul className="mt-1">
          {list.filter(item => shouldRenderItem(item, user)).map(item => (
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
          ))}
       </ul>
    </div>
  );
}
