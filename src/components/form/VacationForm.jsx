import React, { useEffect } from 'react';

const initVacationForm = {
  file: '휴가계',
  title: '',
  AttributionYear: '',
  TotalLeaveDays: '',
  UsedDays: '',
  RemainDays: '',
  Period: '2023-10-11 ~ 2023-10-13 (3일간)',
  VacationReason: '',
  agree: [],
  agreeName: [],
};

const VacationForm = ({ product, handleChange }) => {
  useEffect(() => {
    const totalLeaveDays = parseInt(product.TotalLeaveDays) || 0;
    const usedDays = parseInt(product.UsedDays) || 0;
    const remainDays = totalLeaveDays - usedDays;

    handleChange({
      target: { name: 'RemainDays', value: remainDays.toString() },
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
              type="number"
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
              type="number"
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
          <div>
            <label
              className="font-bold sm:text-md text-xm mr-2"
              htmlFor='Period'
            >
              휴가기간
            </label>
            <input
              type="text"
              name="Period"
              id="Period"
              value={product.Period || ''}
              className="w-80 px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              onChange={handleChange}
            />
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
