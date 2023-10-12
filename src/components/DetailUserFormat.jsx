import React, { useEffect, useState } from 'react';

import { EditModal } from './EditModal';
import ReasonText from './ReasonText';
import ExpenditureShow from './html/ExpenditureShow';
import { getRejectReasonProduct } from '../api/firebase';
import { VacationShow } from './html/VacationShow';
import ApprovalShow from './html/approvalShow';

export default function DetailUserFormat({
  showEditModal,
  modalProduct,
  handleEditChange,
  handleItemValue,
  handleSave,
  closeEditModal,
  displayProduct,
  product,
  openEditModal,
  navigate,
  htmlToFile,
  oneState,
  isMst,
  states,
  setModalProduct,
}) {
  const [reasonText, setReasonText] = useState(null);

  useEffect(() => {
    const fetchReason = async () => {
      const result = await getRejectReasonProduct(product.id);
      setReasonText(result);
    };

    fetchReason();
  }, [product.id]);
  const allApproved = states?.every((stateItem) => stateItem.state === '승인');


  return (
    <div className="w-full xl:flex">
      {showEditModal && (
        <EditModal
          modalProduct={modalProduct}
          handleEditChange={handleEditChange}
          handleItemValue={handleItemValue}
          handleSave={handleSave}
          closeEditModal={closeEditModal}
          setModalProduct={setModalProduct}
        />
      )}
      <div className={`py-3 px-3 ${reasonText ? 'xl:w-4/6' : 'w-full'}`}>
        <div className="container mx-auto p-5 md:p-5 lg:p-8 shadow-lg rounded-lg bg-white border border-gray-200">
          <p className="text-sm text-brand font-bold">[{oneState}]</p>
          {displayProduct.file === '지출결의서' ? (
            <ExpenditureShow product={displayProduct} />
          ) : displayProduct.file === '휴가계' ? (
            <VacationShow product={displayProduct} />
          ) : displayProduct.file === '품의서' ? (
            <ApprovalShow product={displayProduct} />
          ) : null}
          <div className="mt-5 mb-3 text-sm">
            <span className="font-bold">수신자:</span>
            {states?.map((stateItem, index) => (
               <span key={index} className="ml-2">
            {stateItem.name}{' '}
                 <span
                    className={`font-bold ${
                       stateItem.state === '승인'
                          ? 'text-green-600'
                          : stateItem.state === '반려'
                             ? 'text-red-600'
                             : 'text-gray-600'
                    }`}
                 >
                ({stateItem.state})
            </span>
                 {index !== states.length - 1 && ','}
        </span>
            ))}
          </div>

          <div className="mt-3">
	          {(!isMst && !allApproved) ? (
		          <button
			          className="bg-gray-500 text-white px-2 py-1 rounded text-sm mr-2 hover:bg-gray-600"
			          onClick={openEditModal}
		          >
			          수정하기
		          </button>
	          ) : null}
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
      {reasonText ? (
        <div className="xl:w-2/6 xl:py-3 xl:pr-3 xl:pl-0 px-3">
          <ReasonText reasonText={reasonText}/>
        </div>
      ) : null}
    </div>
  );
}