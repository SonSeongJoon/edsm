import React, {useEffect, useState} from 'react';

import { EditModal } from './EditModal';
import ReasonText from './ReasonText';
import ExpenditureShow from './html/ExpenditureShow';
import {getRejectReasonProduct} from "../api/firebase"; // 경로는 실제로 해당 컴포넌트가 위치한 곳으로 수정해야 합니다.

export default function WriteUserFormat({
  showEditModal,
  modalProduct,
  handleEditChange,
  handleItemValue,
  handleSave,
  closeEditModal,
  displayProduct,
  product,
  openEditModal,
  handleDelete,
  navigate,
  htmlToFile,
  oneState,
  isMst,
  states,
}) {
  const [reasonText, setReasonText] = useState(null);

  useEffect(() => {
    const fetchReason = async () => {
      const result = await getRejectReasonProduct(product.id);
      setReasonText(result);
    };

    fetchReason();
  }, [product.id]);

  return (
    <div className="w-full xl:flex">
      {showEditModal && (
        <EditModal
          modalProduct={modalProduct}
          handleEditChange={handleEditChange}
          handleItemValue={handleItemValue}
          handleSave={handleSave}
          closeEditModal={closeEditModal}
        />
      )}
      <div className={`py-3 px-3 ${reasonText ? 'xl:w-4/6' : 'w-full'}`}>
        <div className="container mx-auto p-6 md:p-10 lg:p-16 shadow-lg rounded-lg bg-white border border-gray-200">
          <p className="text-sm text-brand font-bold">[{oneState}]</p>
          <ExpenditureShow product={displayProduct} />
          <div className="mt-5 mb-3 text-sm">
            <span className="font-bold">수신자:</span>
            {displayProduct.agreeName.map((name, index) => (
              <span key={index} className="ml-2">
                {name} <span className="font-bold">({states[index]})</span>
                {index !== displayProduct.agreeName.length - 1 && ','}
              </span>
            ))}
          </div>

          <div className="mt-3">
            {!isMst ? (
              <button
                className="bg-gray-500 text-white px-2 py-1 rounded text-sm mr-2 hover:bg-gray-600"
                onClick={openEditModal}
              >
                수정하기
              </button>
            ) : null}
            {/*<button*/}
            {/*  className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"*/}
            {/*  onClick={handleDelete}*/}
            {/*>*/}
            {/*  삭제하기*/}
            {/*</button>*/}
          </div>
        </div>
        <div className="container mx-auto mt-5 flex w-full justify-end">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded hover:bg-brand-dark border bg-gray-200 border-gray-300"
          >
            뒤로 가기
          </button>
          <button
            className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 ml-3"
            onClick={() => htmlToFile('doc')}
          >
            워드 다운로드
          </button>
        </div>

      </div>
      {reasonText ? <div className="xl:w-2/6 xl:py-3 xl:pr-3 xl:pl-0 px-3">
        <ReasonText reasonText={reasonText} />
      </div> : null}

    </div>
  );
}