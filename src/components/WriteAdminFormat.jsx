import React, { useEffect, useState } from 'react';

import { ItemOutput } from './html/ItemOutput';
import { getOneState, setOneState } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
import ReturnText from "./ReturnText";

export default function WriteAdminFormat({
  displayProduct,
  product,
  navigate,
}) {
  const user = useAuthContext();
  const uid = user?.user?.uid;
  const [data, setData] = useState("");

  useEffect(() => {
    async function fetchInitialState() {
      const initialState = await getOneState(uid, product.id);
      setData(initialState);
    }
    fetchInitialState();
  }, [uid, product.id]);

  async function handleAdmit() {
    const updatedState = await setOneState(uid, product.id);
    setData(updatedState);
  }

  return (
    <div className="w-full">
      <div className="p-10">
        <div className="container mx-auto p-6 md:p-10 lg:p-16 shadow-lg rounded-lg bg-white border border-gray-200">
          <div className="w-full flex justify-between items-center mb-3">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold">{displayProduct.title}</h1>
              <p className="text-brand text-2xl font-bold">|</p>
              <p className="text-gray-500 text-lg">{product.file}</p>
            </div>
            <h1 className="text-gray-600">{product.date}</h1>
          </div>
          <div className="flex flex-col header space-y-4 md:space-y-6 lg:space-y-8">
            <div className="flex items-center">
              <h1 className="font-bold mr-2">부서명 : </h1>
              <p className="text-gray-600">{displayProduct.dept}</p>
            </div>
            <div className="flex items-center">
              <h1 className="font-bold mr-2">거래처 : </h1>
              <p className="text-gray-600">{displayProduct.deel}</p>
            </div>
            {displayProduct.items.map((item, idx) => (
              <div key={idx} className="flex items-center">
                <ItemOutput item={item} idx={idx + 1} />
              </div>
            ))}
          </div>
        </div>
        <div className="container mx-auto mt-10 flex w-full justify-end space-x-2 md:space-x-4 lg:space-x-8">
          <button
            onClick={() => navigate(-1)}
            className="bg-brand text-white px-4 py-2 rounded hover:bg-brand-dark"
          >
            뒤로 가기
          </button>
          <button
            className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900"
            onClick={handleAdmit}
          >
           현재 {data} 상태
          </button>
        </div>
        {data === '반려' ? <ReturnText/> : null}
      </div>
    </div>
  );
}