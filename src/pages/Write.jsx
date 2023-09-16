import React, { useState } from 'react';
import { expenditure } from '../components/html/Expenditure';
import { addNewProduct } from '../api/firebase';
import ExpendForm from '../components/ExpendForm';
import VacationForm from '../components/VacationForm';
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../context/AuthContext";

const options = ['지출결의서', '휴가계'];
const approvers = [
  { name: '서민아 이사', email: 'minah_seo@seoulir.co.kr' },
  { name: '송원식 상무이사', email: 'wssong5790@seoulir.co.kr' },
  { name: '송현길 이사', email: 'lesson201@seoulir.co.kr' },
  { name: '권미경 책임', email: 'seoulir@seoulir.co.kr' },
  { name: '김연재 수석매니저', email: 'sigguruwa@seoulir.co.kr' },
  { name: '김성준 매니저', email: 'brian9292@seoulir.co.kr' },
  { name: '한현석 대표이사', email: 'hshan@seoulir.co.kr' },
];
export default function Write() {
  const navigator = useNavigate();
  const init = {
    file: '지출결의서',
    title: '',
    dept: '',
    deel: '',
    items: [{ title: '', amount: '', note: '' }],
    agree: [],
  };

  const user = useAuthContext();
  const userName = user.user.displayName
  const [product, setProduct] = useState(init);
  const handleSubmit = (e) => {
    addNewProduct(product, userName).then(() => {
      alert('등록 되었습니다.');
      setProduct(init);
      navigator(`/wait`)
    });
  };

  const handleAgreeChange = (e) => {
    const { name, checked } = e.target;

    const emailOfApprover = approvers.find((approver) => approver.name === name).email;
    setProduct((prevProduct) => {
      if (checked) {
        return {
          ...prevProduct,
          agree: [...prevProduct.agree, emailOfApprover],
        };
      } else {
        return {
          ...prevProduct,
          agree: prevProduct.agree.filter((email) => email !== emailOfApprover),
        };
      }
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
      <div className="flex flex-col md:flex-row max-w-screen-2xl mx-auto ml-2 items-start mb-5">
        {/* Left Side */}
        <div className="flex-2 md:mr-10 mb-5 md:mb-0">
          <div className="font-bold text-3xl mr-3 mt-5 text-brand">품위서 작성하기</div>
          <div className="flex items-center mt-3">
            <p className="text-lg mr-3">* 양식 선택</p>
            <select
              id="select"
              name="file"
              className="ml-3 border border-red-500 p-2 rounded focus:outline-none focus:border-brand"
              value={product.file}
              onChange={handleChange}>
              {options && options.map((option, index) => <option key={index}>{option}</option>)}
            </select>
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
            <VacationForm />
          )}

          <div className="mt-5 flex flex-col md:flex-row w-full justify-center space-y-4 md:space-y-0 md:space-x-4">
            <button
              onClick={handleSubmit}
              className="bg-brand text-white px-4 py-2 rounded hover:bg-brand-dark focus:outline-none focus:ring focus:ring-brand-lighter transition duration-150 ease-in-out shadow-md">
              등록하기
            </button>
            <button
              onClick={() => htmlToFile('doc')}
              className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300 transition duration-150 ease-in-out shadow-md">
              워드 다운로드
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1">
          <div className="mt-5 mb-5">
            <div className="font-bold text-xl">결재 승인 요청</div>
            {approvers.map((approver) => (
              <label key={approver.name} className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  name={approver.name}
                  onChange={handleAgreeChange}
                  className="form-checkbox"
                  checked={product.agree.includes(approver.email)}
                />
                <span>{approver.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
