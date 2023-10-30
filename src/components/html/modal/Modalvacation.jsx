import React, { useState } from 'react';
import moment from 'moment';

const ModalVacation = ({ modalProduct, handleEditChange }) => {
  const [vacations, setVacations] = useState(modalProduct?.Vacations);

  const handleVacationChange = (index, field, value) => {
    const newVacations = [...vacations];
    newVacations[index][field] = value;

    if (field === 'startDate' || field === 'endDate') {
      const startDate =
        field === 'startDate' ? value : newVacations[index].startDate;
      const endDate = field === 'endDate' ? value : newVacations[index].endDate;

      if (startDate && endDate) {
        const start = moment(startDate);
        const end = moment(endDate);
        const diff = end.diff(start, 'days') + 1;
        newVacations[index].daysDifference = diff.toString();
      }
    }

    setVacations(newVacations);
    handleEditChange({ target: { name: 'Vacations', value: newVacations } });
  };

  const toggleHalfDay = (index) => {
    const newVacations = [...vacations];
    if (
      newVacations[index].daysDifference === '1' ||
      newVacations[index].daysDifference === '0.5'
    ) {
      const newDiff = newVacations[index].isHalfDay ? '1' : '0.5';
      newVacations[index].isHalfDay = !newVacations[index].isHalfDay;
      newVacations[index].daysDifference = newDiff;
      setVacations(newVacations);
      handleEditChange({ target: { name: 'Vacations', value: newVacations } });
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
      <div>
        {modalProduct?.Vacations &&
          modalProduct.Vacations.map((vacations, index) => (
            <>
              <div className="flex items-center mb-1">
                <h1 className="font-bold mr-1 mb-1">휴가 시작일 : </h1>
                <input
                  type="date"
                  name="startDate"
                  value={vacations.startDate || ''}
                  onChange={(e) =>
                    handleVacationChange(index, 'startDate', e.target.value)
                  }
                  className="border border-gray-500 p-1 rounded-md shadow-md w-3/4"
                />
              </div>
              <div className="flex items-center mb-1">
                <h1 className="font-bold mr-1 mb-1">휴가 종료일 : </h1>
                <input
                  type="date"
                  name="endDate"
                  value={vacations.endDate || ''}
                  onChange={(e) =>
                    handleVacationChange(index, 'endDate', e.target.value)
                  }
                  className="border border-gray-500 p-1 rounded-md shadow-md w-3/4"
                />
              </div>
              <div className="flex items-center mb-1">
                <h1 className="font-bold mr-1 mb-1">휴가기간 : </h1>
                <span>
                  {vacations.startDate && vacations.endDate
                    ? `${vacations.startDate} ~ ${vacations.endDate} (${vacations.daysDifference}일간)`
                    : ''}
                </span>
                {(vacations.daysDifference === '1' ||
                  vacations.daysDifference === '0.5') && (
                  <button
                    onClick={() => toggleHalfDay(index)}
                    className="ml-2 px-2 py-1 border rounded bg-gray-500 text-white text-xm"
                  >
                    {vacations.isHalfDay ? '취소' : '반차'}
                  </button>
                )}
              </div>
              <div className="flex items-center mb-1">
                <h1 className="font-bold mr-1 mb-1">휴가사유 : </h1>
                <textarea
                  name="VacationReason"
                  value={vacations.vacationReason || ''}
                  onChange={(e) =>
                    handleVacationChange(
                      index,
                      'vacationReason',
                      e.target.value,
                    )
                  }
                  className="border border-gray-500 p-1 rounded-md shadow-md w-1/2 h-20"
                />
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default ModalVacation;
