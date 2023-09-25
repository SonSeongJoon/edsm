import React, { useEffect, useState } from 'react';
import PaperRow from './PaperRow';
import { getUsersData } from '../api/firebase';

export const TableComponent = ({
  isLoading,
  error,
  currentItems,
  pageNumbers,
  currentPage,
  handlePageClick,
  isAdmins,
  isMst,
}) => {
  const [selectedDept, setSelectedDept] = useState('전체');
  const [selectedName, setSelectedName] = useState('전체');
  const [currentDeptMembers, setCurrentDeptMembers] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [deptMembers, setDeptMembers] = useState({});

  const transformData = async () => {
    const usersData = await getUsersData();

    const transformedDeptMembers = {};

    for (const userId in usersData) {
      const user = usersData[userId];
      const { department, name } = user;
      if (department) {
        if (!transformedDeptMembers[department]) {
          transformedDeptMembers[department] = [];
        }
        if (name) {
          transformedDeptMembers[department].push(name);
        }
      }
    }
    setDeptMembers(transformedDeptMembers);
  };

  useEffect(() => {
    transformData();
  }, []);

  useEffect(() => {
    let items = [...currentItems];

    if (selectedDept !== '전체') {
      items = items.filter((item) => item.dept === selectedDept);
      setCurrentDeptMembers(deptMembers[selectedDept] || []);
    } else {

      const allMembers = Object.values(deptMembers).flat();
      setCurrentDeptMembers(allMembers);
    }

    if (selectedName !== '전체') {
      items = items.filter((item) => item.displayName === selectedName);
    }

    setFilteredItems(items);
  }, [selectedName, selectedDept, currentItems, deptMembers]);


  return (
    <div className="w-full text-xm sm:text-md">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error...</p>}
      {isMst && (
        <div className="flex mb-3 m-1">
          <select
            onChange={(e) => {
              setSelectedDept(e.target.value);
              setSelectedName('전체');
            }}
            className="border border-gray-500 rounded px-4 py-2 mr-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="전체">전체 부서</option>
            {Object.keys(deptMembers).map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => setSelectedName(e.target.value)}
            className="border border-gray-500 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="전체">전체 이름</option>
            {currentDeptMembers.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      )}
      <table className="min-w-full bg-white border-t border-b border-gray-300 divide-y divide-gray-300 ">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              제목
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              구분
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              날짜
            </th>
            {isMst ? (
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                부서명
              </th>
            ) : null}
            {isAdmins || isMst ? (
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                작성자
              </th>
            ) : null}
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {isAdmins || !isMst ? '읽음표시' : '상태'}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300">
          {filteredItems.map((product) => {
            return (
              <PaperRow
                key={product.id}
                product={product}
                isAdmins={isAdmins}
                isMst={isMst}
              />
            );
          })}
        </tbody>
      </table>
      <div className="w-full flex justify-center mt-3">
        {pageNumbers.map((number) => (
          <button
            className={`mr-5 text-lg font-bold text-center text-brand w-5 hover:underline 
      ${currentPage === number ? 'border border-brand rounded-full' : ''}`}
            key={number}
            onClick={() => handlePageClick(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};
