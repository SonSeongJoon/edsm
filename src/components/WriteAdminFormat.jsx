import React, { useEffect, useState } from 'react';

import { ItemOutput } from './html/ItemOutput';
import {
  getOneState,
  removeAdmit,
  setAdmit,
  setOneState,
} from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
import ReturnText from './ReturnText';

export default function WriteAdminFormat({
  displayProduct,
  product,
  navigate,
}) {
  const user = useAuthContext();
  const uid = user?.user?.uid;
  const [data, setData] = useState('');
  const [isChildSubmitted, setIsChildSubmitted] = useState(false);

  useEffect(() => {
    async function fetchInitialState() {
      const initialState = await getOneState(uid, product.id);
      setData(initialState);
    }

    fetchInitialState();
  }, [uid, product.id]);

  async function handleAdmit() {
    const isData = Boolean(isChildSubmitted);
    const rejectState = data === '반려';
    if (isData && rejectState) {
      alert('사유를 먼저 삭제하세요');
      return 0;
    }

    const updatedState = await setOneState(uid, product.id);
    setData(updatedState);

    if (updatedState === '승인') {
      await setAdmit(product.id, user.user.displayName);
    } else {
      await removeAdmit(product.id, user.user.displayName);
    }
  }

  const handleChildSubmitState = (state) => {
    setIsChildSubmitted(state);
  };

  return (
    <div className="w-full p-10 lg:flex">
      <div className='lg:w-2/3'>
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
        <div className="container mx-auto mt-10 flex w-full justify-end">
          <button
            onClick={() => navigate(-1)}
            className="bg-brand text-white px-4 py-2 rounded hover:bg-brand-dark"
          >
            뒤로 가기
          </button>
          <button
            className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 ml-2"
            onClick={handleAdmit}
          >
            현재 {data} 상태
          </button>
        </div>
      </div>
      <div className='lg:w-1/3'>
        <div className="flex justify-end w-full mt-3 lg:mt-0 lg:ml-3">
          {data === '반려' ? (
            <ReturnText
              product={product}
              onAmit={handleAdmit}
              onChildSubmit={handleChildSubmitState}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}