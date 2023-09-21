import React from 'react';
import { ItemOutput } from './ItemOutput';

const ExpenditureShow = ({ product }) => {
  const { title, file, date, dept, deel, items } = product;

  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="sm:text-2xl text-lg font-bold">{title}</h1>
        </div>
      </div>
      <div className='flex items-center mb-3'>
        <p className="text-xm sm:text-md text-gray-500  mr-2">{file}</p>
        <h1 className="text-gray-600 text-xm sm:text-md">{date}</h1>
      </div>
      <div className="flex flex-col header space-y-4 md:space-y-6 lg:space-y-8">
        <div className="flex items-center">
          <h1 className="sm:text-md text-xm font-bold mr-2">부서명 : </h1>
          <p className="text-gray-600 text-sm sm:text-md">{dept}</p>
        </div>
        <div className="flex items-center">
          <h1 className="font-bold mr-2 sm:text-md text-xm">거래처 : </h1>
          <p className="text-gray-600 text-sm sm:text-md">{deel}</p>
        </div>
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center">
            <ItemOutput item={item} idx={idx + 1} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenditureShow;
