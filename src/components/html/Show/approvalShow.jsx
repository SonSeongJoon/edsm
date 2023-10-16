import React from 'react';

const ApprovalShow = ({ product }) => {
  const { title, content, period, price, note, dept, name, file, corporation } = product;
  const date = new Date()
  .toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  .replace(/. /g, '.');

  return (
     <div>
       <div className="w-full flex justify-between items-center mb-3">
         <h1 className="sm:text-2xl text-md font-bold">{title}</h1>
         <h1 className="text-xm sm:text-md text-gray-500">{corporation}</h1>
       </div>
       <div className="flex items-center mb-3 justify-between mt-2">
         <div className="flex">
           <h1 className="text-xm sm:text-md text-gray-500 mr-2">{dept}</h1>
           <h1 className="text-xm sm:text-md text-gray-500">{name}</h1>
         </div>
         <div className="flex">
           <p className="text-xm sm:text-md text-gray-500  mr-2">{file}</p>
           <h1 className="text-gray-600 text-xm sm:text-md">{date}</h1>
         </div>
       </div>
       <div className="border p-2 rounded-lg border-gray-300">
         <div className="flex flex-col">
           <div className="flex">
             <h1 className="font-bold mr-2 sm:text-md text-xm">항 목 : </h1>
             <p className="text-gray-600 text-sm sm:text-md">{content}</p>
           </div>
           <div className="flex items-center mt-1">
             <h1 className="font-bold mr-2 sm:text-md text-xm">기 간 : </h1>
             <p className="text-gray-600 text-sm sm:text-md">{period}</p>
           </div>
           <div className="flex items-center mt-1">
             <h1 className="font-bold mr-2 sm:text-md text-xm">금 액 : </h1>
             <p className="text-gray-600 text-sm sm:text-md">{price}</p>
           </div>
           <div className="flex items-center mt-1">
             <h1 className="font-bold mr-2 sm:text-md text-xm">비 고 : </h1>
             <p className="text-gray-600 text-sm sm:text-md">{note}</p>
           </div>
         </div>
       </div>
     </div>
  );
};

export default ApprovalShow;
