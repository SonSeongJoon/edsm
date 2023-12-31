import React from 'react';

export const VacationShow = ({ product }) => {
  const {
    title,
    file,
    date,
    AttributionYear,
    TotalLeaveDays,
    UsedDays,
    RemainDays,
    dept,
    name,
    corporation,
    Vacations,
  } = product;

  return (
    <div>
      <div className="w-full flex justify-between items-center mb-3">
        <h1 className="sm:text-2xl text-md font-bold">{title}</h1>
        <h1 className="text-xxm sm:text-md text-gray-500">{corporation}</h1>
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
        <div className="flex items-center">
          <h1 className="sm:text-md text-xm font-bold mr-2">귀속연도 : </h1>
          <p className="text-gray-600 text-sm sm:text-md">{AttributionYear}</p>
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8 mt-5">
          <div className="flex items-center">
            <h1 className="font-bold mr-2 sm:text-md text-xm">
              총 연차일수 :{' '}
            </h1>
            <p className="text-gray-600 text-sm sm:text-md">{TotalLeaveDays}</p>
          </div>
          <div className="flex items-center">
            <h1 className="font-bold mr-2 sm:text-md text-xm">기사용일수 : </h1>
            <p className="text-gray-600 text-sm sm:text-md">{UsedDays}</p>
          </div>
          <div className="flex items-center">
            <h1 className="font-bold mr-2 sm:text-md text-xm">잔여일수 : </h1>
            <p className="text-gray-600 text-sm sm:text-md">{RemainDays}</p>
          </div>
        </div>
        <div>
          {Vacations && Vacations.map((vacation, index) =>(
             <div className='shadow-lg border border-gray-400 rounded-lg p-2 m-2'>
               <div key={index}>
                 <div className="flex items-center">
                   <h1 className="font-bold mr-2 sm:text-md text-xm">휴가기간 : </h1>
                   <p className="text-gray-600 text-sm sm:text-md">
                     {`${vacation.startDate} ~ ${vacation.endDate} (${vacation.daysDifference}일간)`}
                   </p>
                 </div>
                 <div className="flex items-center mt-5">
                   <h1 className="font-bold mr-2 sm:text-md text-xm">휴가사유 : </h1>
                   <p className="text-gray-600 text-sm sm:text-md">{vacation.vacationReason}</p>
                 </div>
               </div>
             </div>
          ))}
        </div>

      </div>
    </div>
  );
};
