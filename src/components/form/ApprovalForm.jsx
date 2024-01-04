import React from 'react';
import moment from 'moment'; // moment 라이브러리를 가져옵니다.

const initApprovalForm = {
  file: '품의서',
  title: '',
  content: '',
  period: '2023-00-00 ~ 2023-00-00 (00일간)',
  price: '',
  note: '',
  startDate: '',
  endDate: '',
  agree: [],
  agreeName: [],
  agreeUid: [],
  memo: '',
};

const ApprovalForm = ({ product, handleChange }) => {
  const today = moment().format('YYYY-MM-DD');

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="container border-gray-500">
        <div className="header p-2 sm:flex-col md:flex-row">
          <div className='mb-3'>
            <span className="font-bold ">품의일자(고정) : </span>
            <span>{today}</span>
          </div>
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
        {/* Additional Info Section */}
        <div className="additional-info mt-5 p-2">
          <div className="font-bold mb-3">추가 정보</div>

          {/* Content Section */}
          <div className="mb-3">
            <div className="font-bold">항목</div>
            <textarea
              name="content"
              placeholder="예시) 체온계 2개 (기업행사용)"
              value={product.content || ''}
              className="w-full px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 h-24"
              onChange={handleChange}
            />
          </div>

          {/* Period Section */}
          <div className="mb-3">
            <div className="font-bold">기간</div>
            <div className="flex items-center">
              <input
                 type="date"
                 name="startDate"
                 value={product.startDate || ''}
                 className="w-1/2 px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 mr-2"
                 onChange={handleChange}
              />
              ~
              <input
                 type="date"
                 name="endDate"
                 value={product.endDate || ''}
                 className="w-1/2 px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ml-2"
                 onChange={handleChange}
              />
            </div>
          </div>

          {/* Price Section */}
          <div className="mb-3">
            <div className="font-bold">금액</div>
            <input
              name="price"
              type="text"
              placeholder="260,000원 (각 130,000원)"
              value={product.price || ''}
              className="w-full px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              onChange={handleChange}

            />
          </div>

          {/* Note Section */}
          <div className='mb-3'>
            <div className="font-bold">비고</div>
            <input
              name="note"
              value={product.note || ''}
              placeholder="예시) 법인카드 사용"
              className="w-full px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="font-bold">Note</div>
            <textarea
               name="memo"
               value={product.memo || ''}
               placeholder="부연설명"
               className="w-full px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
               onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export {ApprovalForm, initApprovalForm};
