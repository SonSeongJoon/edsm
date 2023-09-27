import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { addNewProduct } from '../api/firebase';
import { expenditure } from '../components/html/Expenditure';
import { vacationPlan} from '../components/html/VacationPlan'
import { ExpendForm, initExpendForm } from '../components/ExpendForm';
import VacationForm, { initVacationForm } from '../components/VacationForm';
import { htmlToFile } from '../js/convertToWord.js';
import moment from 'moment';
import {ApprovalForm, initApprovalForm} from "../components/ApprovalForm";
import {approvalDocument} from "../components/html/approval";


const options = ['지출결의서', '휴가계', '품의서'];
const initForms = {
  지출결의서: initExpendForm,
  휴가계: initVacationForm,
  품의서: initApprovalForm,
};
const Forms = {
  지출결의서: ExpendForm,
  휴가계: VacationForm,
  품의서: ApprovalForm,
};
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
  const user = useAuthContext();
  const userName = user.user.displayName;
  const userDept = user.user.dept;
  const currentDate = moment().format('YYYY-MM-DD');

  const [product, setProduct] = useState({
    ...initExpendForm,
    date: currentDate,
    dept: userDept,
    name: userName,
  });

  useEffect(() => {
    setProduct(prevProduct => ({
      ...initForms[product.file] || initExpendForm,
      items: initForms[product.file]?.items || [],
      date: prevProduct.date,
      dept: prevProduct.dept,
      name: prevProduct.name,
    }));
  }, [product.file]);



  const handleSubmit = () => {
    if (product.agree.length === 0) {
      alert('결재요청자를 선택하세요.');
      return;
    }

    addNewProduct(product, userName, userDept).then(() => {
      alert('등록 되었습니다.');
      setProduct(initForms[product.file] || initExpendForm);
      navigator(`/wait`);
    });
  };


  const handleAgreeChange = (e) => {
    const { name, checked } = e.target;
    const approver = approvers.find((approver) => approver.name === name);

    setProduct((prevProduct) => {
      if (checked) {
        return {
          ...prevProduct,
          agree: [...prevProduct.agree, approver.email],
          agreeName: [...prevProduct.agreeName, approver.name], // 이름 추가
        };
      } else {
        return {
          ...prevProduct,
          agree: prevProduct.agree.filter((email) => email !== approver.email),
          agreeName: prevProduct.agreeName.filter(
            (approverName) => approverName !== approver.name,
          ),
        };
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const FormComponent = Forms[product.file] || ExpendForm;
  const buttons = [
    {
      onClick: handleSubmit,
      text: '등록하기',
      className: 'bg-brand hover:bg-brand-dark focus:ring-brand-lighter',
    },
    {
      onClick: () => {
        if (product.file === '지출결의서') {
          const htmlString = expenditure(product);
          htmlToFile(htmlString, 'doc');
        } else if (product.file === '휴가계'){
          const htmlString = vacationPlan(product);
          htmlToFile(htmlString, 'doc');
        } else if (product.file === '품의서') {
          const htmlString = approvalDocument(product);
          htmlToFile(htmlString, 'doc')
        }
      },
      text: '워드 다운로드',
      className: 'bg-blue-800 hover:bg-blue-900 focus:ring-blue-300',
    },
  ];


  return (
    <>
      <div className="flex flex-col xl:flex-row max-w-screen-2xl mx-auto ml-2 items-start mb-5">
        {/* Left Side */}
        <div className="flex-2 md:mr-10 mb-5 md:mb-0">
          <div className="font-bold text-3xl mr-3 mt-5 text-brand">
            품위서 작성하기
          </div>
          <div className="flex items-center mt-3">
            <p className="text-lg mr-3">* 양식 선택</p>
            <select
              id="select"
              name="file"
              className="ml-3 border border-red-500 p-2 rounded focus:outline-none focus:border-brand"
              value={product.file}
              onChange={handleChange}
            >
              {options &&
                options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
          </div>
          <FormComponent
            product={product}
            setProduct={setProduct}
            handleChange={handleChange}
            userDept={userDept}
          />
          <div className="mt-5 flex flex-col md:flex-row w-full justify-center space-y-4 md:space-y-0 md:space-x-4">
            {buttons.map((btn, idx) => (
              <button
                key={idx}
                onClick={btn.onClick}
                className={`${btn.className} text-white px-4 py-2 rounded focus:outline-none focus:ring transition duration-150 ease-in-out shadow-md`}
              >
                {btn.text}
              </button>
            ))}
          </div>
        </div>
        {/* Right Side */}
        <div className="flex-1">
          <div className="mt-5 mb-5">
            <div className="font-bold text-xl">결재 승인 요청</div>
            {approvers.map((approver) => (
              <label
                key={approver.name}
                className="flex items-center space-x-2 mt-2"
              >
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
