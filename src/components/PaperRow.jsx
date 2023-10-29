import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PaperRow({ product, isAdmins, isMst }) {
  const { id, title, file, date, displayName, oneState, state, dept } = product;
  const navigate = useNavigate();
  const location = useLocation();
  const basePath = location.pathname.split('/')[1];
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const displayDate = isSmallScreen ? date.split(' | ')[0] : date;

  const handleClick = () => {
    navigate(`/${basePath}/detail/${id}`, {
      state: { isMst, state },
    });
  };

  return (
    <tr key={product.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-gray-400">
        <span
          className={
            (isAdmins ? oneState : state) === '승인'
              ? 'text-green-600 font-bold'
              : (isAdmins ? oneState : state) === '반려'
              ? 'text-red-500 font-bold'
              : ''
          }
          onClick={handleClick}
        >
          {isAdmins ? oneState : state}
        </span>
      </td>
      <td
        className="px-6 py-4 whitespace-nowrap hover:underline cursor-pointer"
        onClick={handleClick}
      >
        {title}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{file}</td>
      {isAdmins || isMst ? (
        <td className="px-6 py-4 whitespace-nowrap">{displayName}</td>
      ) : null}
      {isMst ? <td className="px-6 py-4 whitespace-nowrap">{dept}</td> : null}
      <td className="px-6 py-4 whitespace-nowrap">{displayDate}</td>
    </tr>
  );
}
