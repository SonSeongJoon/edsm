import React, {useEffect, useState} from 'react';
import moment from 'moment';
const year = moment().format('YYYY')

const initVacationForm = {
  file: '휴가계',
  title: '',
  AttributionYear: year,
  TotalLeaveDays: '',
  UsedDays: '',
  RemainDays: '',
  startDate: '',
  endDate: '',
  VacationReason: '',
  daysDifference: '',
  agree: [],
  agreeName: [],
};

const VacationForm = ({ product, handleChange }) => {
  const [daysDifference, setDaysDifference] = useState('');

  useEffect(() => {
    if (product.startDate && product.endDate) {
      const start = moment(product.startDate);
      const end = moment(product.endDate);
      const diff = end.diff(start, 'days') + 1; // +1 to include the start date
      setDaysDifference(diff);
    }
  }, [product.startDate, product.endDate]);

  useEffect(() => {
    const totalLeaveDays = parseFloat(product.TotalLeaveDays) || 0.0;
    const usedDays = parseFloat(product.UsedDays) || 0.0;
    const remainDays = totalLeaveDays - usedDays;

    handleChange({
      target: { name: 'RemainDays', value: remainDays.toFixed(1) },
    });
  }, [handleChange, product.TotalLeaveDays, product.UsedDays]);

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="container bg-white p-2">
        <div className="mb-3">
          <label
            className="block sm:text-md text-xm font-bold mb-2"
            htmlFor="title"
          >
            제목:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="제목 입력"
            value={product.title || ''}
            className="w-[250px] px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
          <div>
            <label
              className="block sm:text-md text-xm font-bold mb-2"
              htmlFor="AttributionYear"
            >
              귀속연도:
            </label>
            <input
              type="number"
              name="AttributionYear"
              id="AttributionYear"
              placeholder="귀속연도 입력"
              value={product.AttributionYear || ''}
              className="w-[250px] px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex space-x-2 sm:space-x-2">
          <div>
            <label
              className="font-bold sm:text-md text-xm mr-2"
              htmlFor="TotalLeaveDays"
            >
              총 연차일수
            </label>
            <input
              type="text"
              pattern="\d*\.?\d*" // allows numbers and a single decimal point
              name="TotalLeaveDays"
              id="TotalLeaveDays"
              value={product.TotalLeaveDays || ''}
              className="w-20 px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              className="font-bold sm:text-md text-xm mr-2"
              htmlFor="UsedDays"
            >
              기사용일수
            </label>
            <input
               type="text"
               pattern="\d*\.?\d*" // allows numbers and a single decimal point
              name="UsedDays"
              id="UsedDays"
              value={product.UsedDays || ''}
              className="w-20 px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              className="font-bold sm:text-md text-xm mr-2"
              htmlFor="RemainDays"
            >
              잔여일수
            </label>
            <input
              type="text"
              name="RemainDays"
              id="RemainDays"
              value={product.RemainDays || ''}
              readOnly={true}
              className="w-20 px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-5">
          <div className="flex space-x-2 sm:space-x-2">
            <div>
              <label
                 className="font-bold sm:text-md text-xm mr-2"
                 htmlFor='startDate'
              >
                시작 날짜
              </label>
              <input
                 type="date"
                 name="startDate"
                 id="startDate"
                 value={product.startDate || ''}
                 className="px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                 onChange={handleChange}
              />
            </div>
            <div>
              <label
                 className="font-bold sm:text-md text-xm mr-2"
                 htmlFor='endDate'
              >
                종료 날짜
              </label>
              <input
                 type="date"
                 name="endDate"
                 id="endDate"
                 value={product.endDate || ''}
                 className="px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 mr-3"
                 onChange={handleChange}
              />
              {daysDifference && (
                 <span className='font-bold text-green-600'>[ {daysDifference}일간 ]</span>
              )}
            </div>
          </div>
          <div className='mt-2'>
            <label
              className="block sm:text-md text-xm font-bold mb-2"
              htmlFor="VacationReason"
            >
              휴가사유:
            </label>
            <textarea
              name="VacationReason"
              id="VacationReason"
              placeholder="휴가사유 입력"
              value={product.VacationReason || ''}
              className="w-full h-14 px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacationForm;
export {initVacationForm};
