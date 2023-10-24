import { useEffect, useState } from 'react';
import ModalExpend from './html/modal/ModalExpend';
import ModalVacation from './html/modal/Modalvacation';
import ModalApproval from './html/modal/Modalapproval';
import {ModalOvertime} from "./html/modal/ModalOvertime";
import {ModalAlternative} from "./html/modal/ModalAlternative";
import ModalReporterGift from "./html/modal/ModalReporterGift";
import ModalTravelExpenses from "./html/modal/ModalTravelExpenses";
import ModalCustomer from "./html/modal/ModalCustomer";

export function EditModal({
  modalProduct,
  handleEditChange,
  handleItemValue,
  handleSave,
  closeEditModal,
  setModalProduct,
}) {
  const [localModalProduct, setLocalModalProduct] = useState(modalProduct);
  useEffect(() => {
    setModalProduct(localModalProduct);
  }, [localModalProduct, setModalProduct]);

  const handleRemoveItem = (idx) => {
    setLocalModalProduct((prevProduct) => {
      return {
        ...prevProduct,
        items: prevProduct.items.filter((_, index) => index !== idx),
      };
    });
  };

  const handleAddItem = () => {
    setLocalModalProduct((prevProduct) => {
      if (prevProduct.items.length >= 4) {
        alert('아이템은 최대 4개까지 추가할 수 있습니다.');
        return prevProduct;
      }
      const newItem = {};
      return {
        ...prevProduct,
        items: [...prevProduct.items, newItem],
      };
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center text-xs sm:text-sm">
      <div className="bg-white p-2 sm:p-5 rounded shadow-lg w-[360px] sm:w-[800px] max-h-[80vh] sm:max-h-[500px] overflow-y-auto border border-gray-500">
        <h1 className="text-xl sm:text-3xl font-bold mb-3">수정하기</h1>

        {modalProduct.file === '지출결의서' ? (
          <ModalExpend
            modalProduct={modalProduct}
            handleEditChange={handleEditChange}
            handleItemValue={handleItemValue}
            handleRemoveItem={handleRemoveItem}
            handleAddItem={handleAddItem}
          />
        ) : modalProduct.file === '휴가계' ? (
          <ModalVacation
            modalProduct={modalProduct}
            handleEditChange={handleEditChange}
          />
        ) : modalProduct.file === '품의서' ? (
          <ModalApproval
            modalProduct={modalProduct}
            handleEditChange={handleEditChange}
          />
        ) : modalProduct.file === '초과근무사전품의서' ? (
           <ModalOvertime
              modalProduct={modalProduct}
              handleEditChange={handleEditChange}
           />
        ) : modalProduct.file === '대체휴무사용품의서' ? (
           <ModalAlternative
              modalProduct={modalProduct}
              handleEditChange={handleEditChange}
           />
        ) : modalProduct.file === '기자선물품의서' ? (
           <ModalReporterGift
              modalProduct={modalProduct}
              handleEditChange={handleEditChange}
           />
        ) : modalProduct.file === '출장비정산서' ? (
           <ModalTravelExpenses
              modalProduct={modalProduct}
              handleEditChange={handleEditChange}
           />
        ) : modalProduct.file === '고객사실비청구서' ? (
           <ModalCustomer
              modalProduct={modalProduct}
              handleEditChange={handleEditChange}
           />
        ) : null}

        <div className="flex w-full justify-center mt-3">
          <button
            className="border px-1 py-1 rounded-md bg-gray-100 mr-1"
            onClick={handleSave}
          >
            저장
          </button>
          <button
            className="border px-1 py-1 rounded-md bg-gray-100"
            onClick={closeEditModal}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
