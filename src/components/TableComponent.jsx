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
  const [selectedYear, setSelectedYear] = useState('전체');
  const [selectedMonth, setSelectedMonth] = useState('전체');
  const [selectFilename, setSelectFilename] = useState('전체 구분');
  const [selectState, setSelectState] = useState('전체 상태');

  const [currentDeptMembers, setCurrentDeptMembers] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [deptMembers, setDeptMembers] = useState({});
  const [uniqueYears, setUniqueYears] = useState([]);
  const [uniqueMonths, setUniqueMonths] = useState([]);
  const [uniqueFiles, setUniqueFiles] = useState([]);
  const [uniqueState, setUniqueState] = useState([]);

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
    if (currentItems.length > 0) {
      const years = [
        ...new Set(
          currentItems.map(
            (item) => item.date.split('|')[0].trim().split('.')[0],
          ),
        ),
      ];
      const months = [
        ...new Set(
          currentItems.map(
            (item) => item.date.split('|')[0].trim().split('.')[1],
          ),
        ),
      ];

      const files = [...new Set(currentItems.map((item) => item.file))];
      const states = [...new Set(currentItems.map((item) => item.state))];
      setUniqueYears(['전체', ...years]);
      setUniqueMonths(['전체', ...months]);
      setUniqueFiles(['전체 구분', ...files]);
      setUniqueState(['전체 상태', ...states]);
    }
  }, [currentItems]);

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

    if (selectedYear !== '전체') {
      items = items.filter(
        (item) => item.date.split('|')[0].trim().split('.')[0] === selectedYear,
      );
    }

    if (selectedMonth !== '전체') {
      items = items.filter(
        (item) =>
          item.date.split('|')[0].trim().split('.')[1] === selectedMonth,
      );
    }

    if (selectFilename !== '전체 구분') {
      items = items.filter((item) => item.file === selectFilename);
    }
    if (selectState !== '전체 상태') {
      items = items.filter((item) => item.state === selectState);
    }

    setFilteredItems(items);
  }, [
    selectedName,
    selectedDept,
    selectedYear,
    selectedMonth,
    currentItems,
    deptMembers,
    selectFilename,
    selectState,
  ]);

  return (
    <div className="w-full text-xm sm:text-md">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error...</p>}
      {isMst && (
        <div className="flex mb-3 m-3">
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
            className="border border-gray-500 rounded px-4 py-2 mr-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="전체">전체 이름</option>
            {currentDeptMembers.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-gray-500 rounded px-4 py-2 mr-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}년
              </option>
            ))}
          </select>
          <select
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border border-gray-500 rounded px-4 py-2 mr-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {uniqueMonths.map((month) => (
              <option key={month} value={month}>
                {month}월
              </option>
            ))}
          </select>
        </div>
      )}
      <table className="min-w-full bg-white border-t border-b border-gray-300 divide-y divide-gray-300 ">
        <thead>
          <tr>
            <th className="px-3 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {isAdmins || !isMst ? (
                '읽음표시'
              ) : (
                <select
                  onChange={(e) => setSelectState(e.target.value)}
                  className="bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  {uniqueState.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              )}
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              제목
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <select
                onChange={(e) => setSelectFilename(e.target.value)}
                className="bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                {uniqueFiles.map((file) => (
                  <option key={file} value={file}>
                    {file}
                  </option>
                ))}
              </select>
            </th>
            {isAdmins || isMst ? (
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                작성자
              </th>
            ) : null}

            {isMst ? (
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                부서명
              </th>
            ) : null}
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              날짜
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
