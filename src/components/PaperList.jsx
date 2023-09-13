import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {useLocation, useNavigate, useParams} from 'react-router-dom';  // Import useParams
import { getProduct } from '../api/firebase';
import PaperRow from './PaperRow';

export default function PaperList({ state }) {
  const { pageId } = useParams();  // Destructure pageId from the params
  const currentPage = parseInt(pageId, 10) || 1;
  const itemsPerPage = 10;
  const navigate = useNavigate();  // Initialize useNavigate
  const location = useLocation();
  const basePath = location.pathname.split('/')[1];


  const {
    isLoading,
    error,
    data: products,
  } = useQuery(['products', state], () => getProduct(state));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products ? products.slice(indexOfFirstItem, indexOfLastItem) : [];

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil((products ? products.length : 0) / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const handlePageClick = (pageNumber) => {
    navigate(`/${basePath}/page/${pageNumber}`);
  };

  return (
     <div className="w-full">
       {isLoading && <p>Loading...</p>}
       {error && <p>Error...</p>}
       <table className="min-w-full bg-white border-t border-b border-gray-300 divide-y divide-gray-300">
         <thead>
         <tr>
           <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
             제목
           </th>
           <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
             구분
           </th>
           <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
             날짜
           </th>
           <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
             상태
           </th>
         </tr>
         </thead>
         <tbody className="bg-white divide-y divide-gray-300">
         {currentItems.map((product) => (
            <PaperRow key={product.id} product={product} />
         ))}
         </tbody>
       </table>
       <div className='w-full flex justify-center mt-3'>
         {pageNumbers.map((number) => (
            <button
               className={`mr-5 text-lg font-bold text-center text-brand w-5 hover:underline 
      ${currentPage === number ? 'border border-brand rounded-full' : ''}`}
               key={number}
               onClick={() => handlePageClick(number)}
            >
              {number}
            </button>
         ))}
       </div>
     </div>
  );
}
