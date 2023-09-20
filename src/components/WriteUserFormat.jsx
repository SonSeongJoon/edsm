import React from 'react';

import { EditModal } from './EditModal';
import { ItemOutput } from './html/ItemOutput';
import ReasonText from './ReasonText'; // 경로는 실제로 해당 컴포넌트가 위치한 곳으로 수정해야 합니다.

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
}) {
  return (
    <div className="w-full">
      {showEditModal && (
        <EditModal
          modalProduct={modalProduct}
          handleEditChange={handleEditChange}
          handleItemValue={handleItemValue}
          handleSave={handleSave}
          closeEditModal={closeEditModal}
        />
      )}
      <div className="p-10">
        <div className="container mx-auto p-6 md:p-10 lg:p-16 shadow-lg rounded-lg bg-white border border-gray-200">
          <p className='text-sm text-brand font-bold'>[{oneState}]</p>
          <div className="w-full flex justify-between items-center mb-3">

            <div className="flex items-center space-x-2">
              <h1 className="sm:text-2xl font-bold text-md">
                {displayProduct.title}
              </h1>
              <p className="text-brand sm:text-2xl font-bold text-lg">|</p>
              <p className="text-gray-500 text-xm sm:text-lg">{product.file}</p>
            </div>
            <h1 className="text-gray-600 text-xm sm:text-md">{product.date}</h1>
          </div>
          <div className="flex flex-col header space-y-4 md:space-y-6 lg:space-y-8">
            <div className="flex items-center">
              <h1 className="font-bold mr-2 sm:text-md text-xm">부서명 : </h1>
              <p className="text-gray-600">{displayProduct.dept}</p>
            </div>
            <div className="flex items-center">
              <h1 className="font-bold mr-2 sm:text-md text-xm">거래처 : </h1>
              <p className="text-gray-600">{displayProduct.deel}</p>
            </div>
            {displayProduct.items.map((item, idx) => (
              <div key={idx} className="flex items-center">
                <ItemOutput item={item} idx={idx + 1} />
              </div>
            ))}
          </div>
          <div className="mt-3">
            <button
              className="bg-gray-500 text-white px-2 py-1 rounded text-sm mr-2 hover:bg-gray-600"
              onClick={openEditModal}
            >
              수정하기
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
              onClick={handleDelete}
            >
              삭제하기
            </button>
          </div>
        </div>
        <div className="container mx-auto mt-10 flex w-full justify-end space-x-2 md:space-x-4 lg:space-x-8">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded hover:bg-brand-dark border bg-gray-200 border-gray-300"
          >
            뒤로 가기
          </button>
          <button
            className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900"
            onClick={() => htmlToFile('doc')}
          >
            워드 다운로드
          </button>
        </div>
        <div className="w-full border-b">
          <ReasonText fileId={product.id} />
        </div>
      </div>
    </div>
  );
}