import React from 'react';

const ModalCustomer = ({ modalProduct, handleEditChange }) => {
  return (
    <div>
      <div className="flex items-center mb-1">
        <h1 className="font-bold mr-1 mb-1">제목 : </h1>
        <input
          name="title"
          value={modalProduct.title || ''}
          onChange={handleEditChange}
          className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
        />
      </div>
      <div className="flex items-center mb-1">
        <h1 className="font-bold mr-1 mb-1">회사명 : </h1>
        <input
          type="text"
          name="content"
          value={modalProduct.content || ''}
          onChange={handleEditChange}
          className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
        />
      </div>
      <div className="flex items-center mb-1">
        <h1 className="font-bold mr-1 mb-1">청구내역 : </h1>
        <input
          name="note"
          value={modalProduct.data || ''}
          onChange={handleEditChange}
          className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
        />
      </div>
      <div className="flex items-center mb-1">
        <h1 className="font-bold mr-1 mb-1">사후정산수수료 적용 여부 : </h1>
        <input
          name="note"
          value={modalProduct.charge || ''}
          onChange={handleEditChange}
          className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
        />
      </div>
      <div className="flex items-center mb-1">
        <h1 className="font-bold mr-1 mb-1">청구금액 : </h1>
        <input
          name="price"
          value={modalProduct.price || ''}
          onChange={handleEditChange}
          className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
        />
      </div>
    </div>
  );
};

export default ModalCustomer;
