import React, { useEffect } from 'react';
import { ItemInput } from '../html/ItemInput';

const initExpendForm = {
  file: '지출결의서',
  title: '',
  dept: '',
  deel: '',
  items: [{ title: '', amount: '', note: '' }],
  agree: [],
  agreeName: [],
  agreeUid: [],
};

const ExpendForm = ({ product, setProduct, handleChange }) => {
  useEffect(() => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      items: [{ title: '', amount: '', note: '' }],
    }));
  }, [product.file, setProduct]);

  const addItem = () => {
    if (product.items.length < 4) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        items: [...prevProduct.items, { title: '', amount: '', note: '' }],
      }));
    } else {
      alert('최대 4개의 항목만 추가할 수 있습니다.');
    }
  };
  const removeItem = (indexToRemove) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      items: prevProduct.items.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const updateItemValue = (idx, key, value) => {
    setProduct((prevProduct) => {
      const newItems = [...prevProduct.items];

      if (key === 'amount') {
        const nonNumericParts = value.split(/[\d,]+/);

        const numbersWithCommas = value.match(/[\d,]+/g);

        let result = value; // 기본적으로 원래 값을 사용합니다.

        if (numbersWithCommas) {
          const formattedNumbers = numbersWithCommas.map((numStr) => {
            const numberWithoutCommas = numStr.replace(/,/g, '');
            return parseInt(numberWithoutCommas).toLocaleString('en-US');
          });

          result = '';
          for (let i = 0; i < nonNumericParts.length; i++) {
            result += nonNumericParts[i];
            if (i < formattedNumbers.length) {
              result += formattedNumbers[i];
            }
          }
        }

        newItems[idx] = { ...newItems[idx], [key]: result }; // 포맷된 값을 사용합니다.
      } else {
        newItems[idx] = { ...newItems[idx], [key]: value }; // 다른 필드는 원래의 로직을 그대로 사용합니다.
      }

      return {
        ...prevProduct,
        items: newItems,
      };
    });
  };




  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="container border-gray-500">
        <div className="header p-2 sm:flex-col md:flex-row">
          <div className="font-bold mr-3 mb-2 sm:mb-3 md:mb-0">제목</div>
          <input
            type="text"
            name="title"
            placeholder="제목입력"
            value={product.title || ''}
            className="w-full px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            onChange={handleChange}
          />
        </div>
        <div className="content p-2">
          <div className="font-bold mt-5">거래처</div>
          <input
            type="text"
            name="deel"
            value={product.deel || ''}
            placeholder="거래처 입력"
            className="w-full px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            onChange={handleChange}
          />
          <div className="mt-5 items-center">
            <div className="font-bold">내역</div>
            {product.items.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center w-full"
              >
                <ItemInput
                  item={item}
                  updateItemValue={updateItemValue}
                  idx={idx}
                />
                <div className="flex space-x-3 mt-5 ml-0 sm:ml-2 items-center">
                  {idx === product.items.length - 1 && (
                    <div className="flex space-x-3 mt-5 ml-0 sm:ml-2 items-center mb-4">
                      <button
                        className="bg-brand px-2 py-1 text-white text-sm rounded-md flex-shrink-0"
                        onClick={() => addItem()}
                      >
                        추가
                      </button>
                      {idx !== 0 && (
                        <button
                          className="bg-brand px-2 py-1 text-white text-sm rounded-md flex-shrink-0"
                          onClick={() => removeItem(idx)}
                        >
                          삭제
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export {ExpendForm, initExpendForm};
