import React, { useEffect, useState } from 'react';
import moment from 'moment';

const ModalVacation = ({ modalProduct, handleEditChange }) => {
  // 초기 상태 설정에서 modalProduct.daysDifference 값에 따라 isHalfDay 상태 설정
  const [isHalfDay, setIsHalfDay] = useState(
    modalProduct.daysDifference === '0.5',
  );
  const [difference, setDifference] = useState(
    modalProduct.daysDifference || '',
  );

  const calculateDaysDifference = (startDate, endDate) => {
    if (startDate && endDate) {
      const start = moment(startDate);
      const end = moment(endDate);
      return end.diff(start, 'days') + 1;
    }
    return '';
  };

   useEffect(() => {
      const data = calculateDaysDifference(
         modalProduct.startDate,
         modalProduct.endDate
      );
      handleEditChange({
         target: { name: 'daysDifference', value: String(data) },
      });
      setDifference(data);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [modalProduct.startDate, modalProduct.endDate]);



   const toggleHalfDay = () => {
    if (difference === 1) {
      const newDiff = isHalfDay ? '1' : '0.5';
      setIsHalfDay(!isHalfDay);
      handleEditChange({
        target: { name: 'daysDifference', value: newDiff },
      });
    }
  };

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
        <h1 className="font-bold mr-1 mb-1">귀속 연도 : </h1>
        <input
          name="AttributionYear"
          value={modalProduct.AttributionYear || ''}
          onChange={handleEditChange}
          className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
        />
      </div>
      <div className="flex items-center mb-1">
        <h1 className="font-bold mr-1 mb-1">총 휴가일수 : </h1>
        <input
          type="number"
          name="TotalLeaveDays"
          value={modalProduct.TotalLeaveDays || ''}
          onChange={handleEditChange}
          className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
        />
      </div>
      <div className="flex items-center mb-1">
        <h1 className="font-bold mr-1 mb-1">사용일수 : </h1>
        <input
          type="number"
          name="UsedDays"
          value={modalProduct.UsedDays || ''}
          onChange={handleEditChange}
          className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
        />
      </div>
      <div className="flex items-center mb-1">
        <h1 className="font-bold mr-1 mb-1">잔여일수 : </h1>
        <input
          type="number"
          name="RemainDays"
          value={modalProduct.RemainDays || ''}
          onChange={handleEditChange}
          className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
        />
      </div>
      <div className="flex items-center mb-1">
        <h1 className="font-bold mr-1 mb-1">휴가 시작일 : </h1>
        <input
          type="date"
          name="startDate"
          value={modalProduct.startDate || ''}
          onChange={handleEditChange}
          className="border border-gray-500 p-1 rounded-md shadow-md w-3/4"
        />
      </div>
      <div className="flex items-center mb-1">
        <h1 className="font-bold mr-1 mb-1">휴가 종료일 : </h1>
        <input
          type="date"
          name="endDate"
          value={modalProduct.endDate || ''}
          onChange={handleEditChange}
          className="border border-gray-500 p-1 rounded-md shadow-md w-3/4"
        />
      </div>
      <div className="flex items-center mb-1">
        <h1 className="font-bold mr-1 mb-1">휴가기간 : </h1>
        <span>
          {modalProduct.startDate && modalProduct.endDate
            ? `${modalProduct.startDate} ~ ${modalProduct.endDate} (${modalProduct.daysDifference}일간)`
            : ''}
        </span>
        {difference === 1 && (
          <button
            onClick={toggleHalfDay}
            className="ml-2 px-3 py-1 border rounded bg-gray-500 text-white text-xm"
          >
            {isHalfDay ? '반차 취소' : '반차 등록'}
          </button>
        )}
      </div>
      <div className="flex items-center mb-1">
        <h1 className="font-bold mr-1 mb-1">휴가사유 : </h1>
        <textarea
          name="VacationReason"
          value={modalProduct.VacationReason || ''}
          onChange={handleEditChange}
          className="border border-gray-500 p-1 rounded-md shadow-md w-1/2 h-20"
        />
      </div>
    </div>
  );
};

export default ModalVacation;
