import { ItemModify } from './html/ItemModify';
import { useEffect, useState } from 'react';

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
    // localModalProduct 상태가 변경될 때마다 modalProduct 상태를 업데이트합니다.
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
        return prevProduct; // 아이템 개수가 4개 이상이면 상태를 변경하지 않습니다.
      }
      const newItem = {}; // 새로운 아이템의 초기 상태를 정의합니다.
      return {
        ...prevProduct,
        items: [...prevProduct.items, newItem],
      };
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center sm:text-md text-xm">
      <div className="bg-white p-5 rounded shadow-lg w-[800px] border border-gray-500 max-h-[500px] overflow-y-auto">
        <h1 className="text-3xl font-bold mb-5">수정하기</h1>
        <div className="flex items-center mb-2">
          <h1 className="font-bold mr-2 mb-1">
            제&nbsp;&nbsp;&nbsp;&nbsp;목 :{' '}
          </h1>
          <input
            name="title"
            value={modalProduct.title || ''} // undefined 또는 null인 경우 빈 문자열을 사용합니다.
            onChange={handleEditChange}
            className="border border-gray-500 p-1 rounded-md shadow-md"
          />
        </div>
        <div className="flex items-center mb-2">
          <h1 className="font-bold mr-2 mb-1">부서명 : </h1>
          <input
            name="dept"
            value={modalProduct.dept || ''} // undefined 또는 null인 경우 빈 문자열을 사용합니다.
            onChange={handleEditChange}
            className="border border-gray-500 p-1 rounded-md shadow-md"
          />
        </div>
        <div className="flex items-center">
          <h1 className="font-bold mr-2 mb-1">거래처 : </h1>
          <input
            name="deel"
            value={modalProduct.deel || ''} // undefined 또는 null인 경우 빈 문자열을 사용합니다.
            onChange={handleEditChange}
            className="border border-gray-500 p-1 rounded-md shadow-md"
          />
        </div>
        {localModalProduct.items.map((item, idx) => (
          <div key={item.id || idx} className="flex items-center mt-5 z-100">
            <ItemModify
              item={item}
              idx={idx}
              handleItemValue={handleItemValue}
              handleRemoveItem={handleRemoveItem}
            />
          </div>
        ))}
        <button
          className="mt-3 bg-green-500 text-white px-2 py-1 rounded text-sm hover:bg-green-600"
          onClick={handleAddItem}
        >
          아이템 추가
        </button>

        <div className="flex w-full justify-center mt-5">
          <button
            className="border px-2 py-1 rounded-md bg-gray-100 mr-2"
            onClick={handleSave}
          >
            저장
          </button>
          <button
            className="border px-2 py-1 rounded-md bg-gray-100"
            onClick={closeEditModal}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
