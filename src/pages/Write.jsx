import React, { useState } from 'react';
import { expenditure } from '../components/html/Expenditure';
import { ItemInput } from '../components/html/ItemInput';

const options = ['지출결의서', '휴가계'];
export default function Write() {
  const [product, setProduct] = useState({
    file: '지출결의서',
    title: '',
    dept: '',
    deel: '',
    items: [{ title: '', amount: '', note: '' }]
  });

  const addItem = () => {
    if (product.items.length < 4) {
      setProduct(prevProduct => ({
        ...prevProduct,
        items: [...prevProduct.items, {title: '', amount: '', note: ''}]
      }));
    } else {
      alert('최대 4개의 항목만 추가할 수 있습니다.');
    }
  };
  const removeItem = (indexToRemove) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      items: prevProduct.items.filter((_, idx) => idx !== indexToRemove)
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };
  const updateItemValue = (idx, key, value) => {
    setProduct(prevProduct => {
      const newItems = [...prevProduct.items];
      newItems[idx][key] = value;
      return {
        ...prevProduct,
        items: newItems
      };
    });
  };

  const htmlString = expenditure(product);

  function htmlToFile(fileExtension) {
    let source =
      fileExtension === 'doc'
        ? 'data:application/msword;charset=utf-8,' + encodeURIComponent(htmlString)
        : 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlString);

    let fileDownload = document.createElement('a');
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'downloadedFile.' + fileExtension;
    fileDownload.click();
    document.body.removeChild(fileDownload);
  }

  return (
    <>
      <div className="max-w-screen-2xl mx-auto border-b border-gray-300 p-5">
        <div className="font-semibold text-xl mb-10">품위서 작성하기</div>
        <div className="container border-b border-gray-500">
          <div className="flex header p-2">
            <div className="flex mb-5">
              <div className="font-bold mr-3">제목</div>
              <input
                type="text"
                name="title"
                placeholder="제목입력"
                value={product.title}
                className="border-b border-black w-[300px]"
                onChange={handleChange}
              />
              <div className="flex ml-2">
                <p className="font-bold">문서 종류</p>
                <select
                  id="select"
                  name="file"
                  className="ml-3 border border-gray-400"
                  value={product.file}
                  onChange={handleChange}
                >
                  {options && options.map((option, index) => <option key={index}>{option}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="content p-2">
            <div className="font-bold">부서명</div>
            <input
              type="text"
              name="dept"
              placeholder="부서명 입력"
              value={product.dept}
              className="border-b border-black"
              onChange={handleChange}
            />
            <div className="font-bold mt-5">거래처</div>
            <input
              type="text"
              name="deel"
              value={product.deel}
              placeholder="거래처 입력"
              className="border-b border-black mb-5"
              onChange={handleChange}
            />
            <div className="mt-5">
              <div className="font-bold">내역</div>
              {product.items.map((item, idx) => (
                <div key={idx} className="flex items-center">
                  <ItemInput item={item} updateItemValue={updateItemValue} idx={idx} />
                  {idx === product.items.length - 1 && (
                    <button
                      className="bg-brand px-2 py-1 text-white text-sm rounded-md mr-1 mt-3"
                      onClick={() => addItem()}
                    >
                      항목 추가
                    </button>
                  )}
                  {idx !== 0 && idx === product.items.length - 1 && (
                    <button
                      className="bg-brand px-2 py-1 text-white text-sm rounded-md mt-3"
                      onClick={() => removeItem(idx)}
                    >
                      삭제
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='mt-2 flex w-full justify-end'>
          <button className="bg-brand text-white p-1 rounded-md mr-2">등록하기</button>
          <button className="bg-blue-800 text-white p-1 rounded-md" onClick={() => htmlToFile('doc')}>
            워드 다운로드
          </button>
        </div>

      </div>
    </>
  );
}
