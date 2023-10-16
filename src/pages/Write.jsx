import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { addNewProduct, handleUpload } from '../api/firebase';
import { expenditure } from '../components/html/Transhtml/Expenditure';
import { vacationPlan } from '../components/html/Transhtml/VacationPlan';
import { ExpendForm, initExpendForm } from '../components/form/ExpendForm';
import VacationForm, {
  initVacationForm,
} from '../components/form/VacationForm';
import { htmlToFile } from '../js/convertToWord.js';
import moment from 'moment';
import {
  ApprovalForm,
  initApprovalForm,
} from '../components/form/ApprovalForm';
import { approvalDocument } from '../components/html/Transhtml/approvalDocument';
import {
  initOvertimeForm,
  OvertimeForm,
} from '../components/form/OvertimeForm';

const options = ['지출결의서', '휴가계', '품의서', '초과근무사전품의서'];
const initForms = {
  지출결의서: initExpendForm,
  휴가계: initVacationForm,
  품의서: initApprovalForm,
  초과근무사전품의서: initOvertimeForm,
};
const Forms = {
  지출결의서: ExpendForm,
  휴가계: VacationForm,
  품의서: ApprovalForm,
  초과근무사전품의서: OvertimeForm,
};
const approvers = [
  { name: '서민아 이사', email: 'minah_seo@seoulir.co.kr' },
  { name: '송원식 상무이사', email: 'wssong5790@seoulir.co.kr' },
  { name: '송현길 이사', email: 'lesson201@seoulir.co.kr' },
  { name: '권미경 책임', email: 'seoulir@seoulir.co.kr' },
  { name: '김연재 수석매니저', email: 'sigguruwa@seoulir.co.kr' },
  { name: '김성준 매니저', email: 'brian9292@seoulir.co.kr' },
  { name: '한현석 대표이사', email: 'hshan@seoulir.co.kr' },
  { name: '승인자(테스트용)', email: 'sonsj96@seoulir.co.kr' },
];
export default function Write() {
  const navigator = useNavigate();
  const user = useAuthContext();
  const userName = user.user.displayName;
  const userDept = user.user.dept;
  const userPhoneNum = user.user.phoneNum;
  const userCorporation = user.user.corporation;
  const currentDate = moment().format('YYYY-MM-DD');
  // const [file, setFile] = useState(null); // 파일 상태 관리
  const file = undefined;
  const [product, setProduct] = useState({
    ...initExpendForm,
    date: currentDate,
    dept: userDept,
    name: userName,
    phoneNum: userPhoneNum,
    corporation: userCorporation,
  });

  useEffect(() => {
    setProduct((prevProduct) => ({
      ...(initForms[product.file] || initExpendForm),
      items: initForms[product.file]?.items || [],
      date: prevProduct.date,
      dept: prevProduct.dept,
      name: prevProduct.name,
      phoneNum: prevProduct.phoneNum,
      corporation: prevProduct.corporation,
    }));
  }, [product.file]);

  const handleSubmit = async () => {
    if (product.agree.length === 0) {
      alert('결재요청자를 선택하세요.');
      return;
    }
    let downloadURL;

    if (file) {
      try {
        downloadURL = await handleUpload(file); // Pass the selected file as an argument
      } catch (error) {
        console.error('Error uploading file:', error);
        return;
      }
    }
    try {
      await addNewProduct(
        product,
        userName,
        userDept,
        userPhoneNum,
        userCorporation,
        downloadURL,
      );

      alert('등록 되었습니다.');
      setProduct(initForms[product.file] || initExpendForm);
      navigator(`/wait`);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleAgreeChange = (e) => {
    const { name, checked } = e.target;
    const approver = approvers.find((approver) => approver.name === name);

    setProduct((prevProduct) => {
      if (checked) {
        return {
          ...prevProduct,
          agree: [...prevProduct.agree, approver.email],
          agreeName: [...prevProduct.agreeName, approver.name],
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

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  }, []);

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
        } else if (product.file === '휴가계') {
          const htmlString = vacationPlan(product);
          htmlToFile(htmlString, 'doc');
        } else if (product.file === '품의서') {
          const htmlString = approvalDocument(product);
          htmlToFile(htmlString, 'doc');
        } else if (product.file === '초과근무사전품의서') {
          // const htmlString =
        }
      },
      text: '워드 다운로드',
      className: 'bg-blue-800 hover:bg-blue-900 focus:ring-blue-300',
    },
  ];

  return (
    <>
      <div className="flex flex-col lg:flex-row max-w-screen-2xl mx-auto p-4 items-start mb-8 space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Left Side */}
        <div className="w-full lg:w-3/4 flex-2">
          <div className="font-semibold text-2xl md:text-3xl text-brand mb-4">
            품의서 작성하기
          </div>
          <div className="flex items-center mb-4">
            <p className="text-base md:text-lg mr-3">* 양식 선택</p>
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
        </div>
        {/* Right Side */}
        <div className="w-full lg:w-1/4 flex-1 bg-gray-100 p-2 md:p-4 rounded">
          <div className="font-bold text-lg md:text-xl mb-3">
            결재 승인 요청
          </div>
          {approvers.map((approver) => (
            <label
              key={approver.name}
              className="flex items-center space-x-2 mt-2 hover:bg-gray-200 p-2 rounded transition duration-150 ease-in-out cursor-pointer"
            >
              <input
                type="checkbox"
                name={approver.name}
                onChange={handleAgreeChange}
                className="form-checkbox text-brand border-gray-300 rounded focus:border-brand focus:ring focus:ring-offset-0 focus:ring-brand focus:ring-opacity-50"
                checked={product.agree.includes(approver.email)}
              />
              <span className="text-sm md:text-base text-gray-700">
                {approver.name}
              </span>
            </label>
          ))}
          {/*<p className='mt-5 text-xm text-gray-500'>*/}
          {/*  등록할 파일이 없다면 바로 "등록하기" 클릭*/}
          {/*</p>*/}
          {/*<input*/}
          {/*   className=""*/}
          {/*   type="file"*/}
          {/*   onChange={(e) => setFile(e.target.files[0])}*/}
          {/*/>*/}
          <div className="flex">
            <div className="mt-5 flex flex-col lg:flex-row w-full justify-center space-y-2 lg:space-y-0 lg:space-x-2">
              {buttons.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={btn.onClick}
                  className={`${btn.className} text-white px-2 md:px-4 py-1 md:py-2 rounded focus:outline-none focus:ring transition duration-150 ease-in-out shadow-md`}
                >
                  {btn.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
