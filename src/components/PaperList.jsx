import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {getProduct} from "../api/firebase";
import PaperRow from "./PaperRow";

export default function PaperList({state}) {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(['products', state], () => getProduct(state));

  return (
     <div className='w-full'>
       {isLoading && <p>Loading...</p>}
       {error && <p>Error...</p>}
       <table className="min-w-full bg-white border-t border-b border-gray-300 divide-y divide-gray-300">
         <thead>
         <tr>
           <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
           <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">구분</th>
           <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">날짜</th>
           <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
         </tr>
         </thead>
         <tbody className="bg-white divide-y divide-gray-300">
         {products && products.map(product => <PaperRow product={product}/>)}
         </tbody>
       </table>
     </div>
  );
}
