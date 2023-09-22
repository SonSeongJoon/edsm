import React, { useEffect, useState } from 'react';
import {
  getOneState,
  removeAdmit,
  setAdmit,
  setOneState,
} from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
import ReturnText from './ReturnText';
import ExpenditureShow from "./html/ExpenditureShow";

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
      <div className="w-full">
        <div className="container mx-auto p-6 md:p-10 lg:p-16 shadow-lg rounded-lg bg-white border border-gray-200">
          <p className="flex items-center mb-3 sm:text-md text-sm">
            현재 해당 결재를 &nbsp;
            <span
              className={` text-white py-1 px-1.5 rounded-md ${
                data === '승인'
                  ? 'bg-emerald-600'
                  : data === '대기'
                  ? 'bg-gray-600'
                  : 'bg-red-800'
              }`}
            >
              {data}
            </span>
            &nbsp;하신 상태입니다!
          </p>
          <ExpenditureShow product={displayProduct} />
        </div>
        <div className="container mx-auto mt-10 flex w-full justify-end">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded hover:bg-brand-dark border bg-gray-200 border-gray-300"
          >
            뒤로 가기
          </button>
          <button
            className={`
        ${
          data === '승인'
            ? 'bg-emerald-600 hover:bg-emerald-700'
            : data === '대기'
            ? 'bg-gray-600 hover:bg-gray-700'
            : 'bg-red-800 hover:bg-red-900'
        } 
        text-white px-4 py-2 rounded ml-2
    `}
            onClick={handleAdmit}
          >
            현재 {data} 상태
          </button>
        </div>
      </div>
      <div className={`${data === '반려' ? 'lg:w-1/3' : null}`}>
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