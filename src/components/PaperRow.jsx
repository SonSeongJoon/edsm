import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {getAllOneState} from "../api/firebase";

export default function PaperRow({ product, isAdmins, isMst }) {
  const { id, title, file, date, displayName, oneState, state ,dept} = product;
  const navigate = useNavigate();
  const location = useLocation();
  const basePath = location.pathname.split('/')[1];
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);

   const [states, setStates] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         const allState = await getAllOneState();
         const filteredStates = allState
         .filter((stateItem) => stateItem.id === product.id)
         .map((stateItem) => stateItem.state);
         setStates(filteredStates);
      };

      fetchData();
   }, [product.id]);

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
      state: { product, isMst, oneState, state, states},
    });
  };

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
      {isMst ? (
        <td className="px-6 py-4 whitespace-nowrap">{dept}</td>
      ) : null}
       {isAdmins || isMst? (
          <td className="px-6 py-4 whitespace-nowrap">{displayName}</td>
       ) : null}
      <td className="px-6 py-4 whitespace-nowrap">
        {isAdmins ? oneState : state}
      </td>
    </tr>
  );
}
