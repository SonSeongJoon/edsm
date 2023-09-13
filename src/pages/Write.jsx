import React, { useState } from 'react';
import { expenditure } from '../components/html/Expenditure';
import { addNewProduct } from '../api/firebase';
import ExpendForm from '../components/ExpendForm';
import VacationForm from '../components/VacationForm'
const options = ['지출결의서', '휴가계'];
export default function Write() {
  const [product, setProduct] = useState({
    file: '지출결의서',
    title: '',
    dept: '',
    deel: '',
    items: [{ title: '', amount: '', note: '' }],
  });
  const handleSubmit = (e) => {
    addNewProduct(product).then(() => {
      console.log('성공적으로 등록 되었습니다.');
    });
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };
  const updateItemValue = (idx, key, value) => {
    setProduct((prevProduct) => {
      const newItems = [...prevProduct.items];
      newItems[idx][key] = value;
      return {
        ...prevProduct,
        items: newItems,
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
      <div className="flex ml-2">
        <div>
          <div className="font-bold text-xl mr-3 text-brand">품위서 작성하기</div>
          <div className='flex'>
            <p className="font-bold">문서 종류</p>
            <select
               id="select"
               name="file"
               className="ml-3 border border-red-500"
               value={product.file}
               onChange={handleChange}
            >
              {options && options.map((option, index) => <option key={index}>{option}</option>)}
            </select>
          </div>
        </div>
      </div>
      {product.file === '지출결의서' ? (
         <ExpendForm
            product={product}
            handleChange={handleChange}
            addItem={addItem}
            removeItem={removeItem}
            updateItemValue={updateItemValue}
         />
      ) : (
         <VacationForm

         />
      )}
      <div className="mt-2 flex w-full justify-end">
        <button className="bg-brand text-white p-1 rounded-md mr-2" onClick={handleSubmit}>
          등록하기
        </button>
        <button className="bg-blue-800 text-white p-1 rounded-md mr-5" onClick={() => htmlToFile('doc')}>
          워드 다운로드
        </button>
      </div>
    </>
  );
}
