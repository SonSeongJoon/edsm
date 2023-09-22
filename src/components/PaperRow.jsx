import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PaperRow({ product, isAdmins, isMst }) {
  const { id, title, file, date, displayName, oneState, state } = product;
  console.log(state)
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
      state: { product, isMst, oneState},
    });
  };

  function determineState(states) {
    if (!states || states.length === 0) return '대기';

    if (states.includes('대기')) return '대기';
    if (states.includes('반려')) return '반려';
    if (states.every((value) => value === '승인')) return '승인';

    return '알 수 없음';
  }

  return (
    <tr key={product.id} className="cursor-pointer hover:bg-gray-50">
      <td
        className="px-6 py-4 whitespace-nowrap hover:underline"
        onClick={handleClick}
      >
        {title}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{file}</td>
      <td className="px-6 py-4 whitespace-nowrap">{displayDate}</td>
      {isAdmins ? (
        <td className="px-6 py-4 whitespace-nowrap">{displayName}</td>
      ) : null}

      <td className="px-6 py-4 whitespace-nowrap">
        {isAdmins ? oneState : state}
      </td>
    </tr>
  );
}
