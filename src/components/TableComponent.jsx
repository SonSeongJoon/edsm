import React, { useCallback, useEffect, useState } from 'react';
import PaperRow from './PaperRow';
import { getUsersData } from '../api/firebase';
import { useVerificationStatus } from '../context/VerificationStatusProvider';
import moment from 'moment';

// Function to save selected year and month to localStorage
const saveSelectedYearMonthToLocalStorage = (year, month) => {
  localStorage.setItem('selectedYear', year);
  localStorage.setItem('selectedMonth', month);
}

// Function to load selected year and month from localStorage
const loadSelectedYearMonthFromLocalStorage = () => {
  const year = localStorage.getItem('selectedYear') || ''; // Default to an empty string if not found
  let month = localStorage.getItem('selectedMonth') || ''; // Default to an empty string if not found


  return { year, month };
}


export const TableComponent = ({ isLoading, error, currentItems, isAdmins, isMst, onYearMonthChange }) => {
  const [selectedDept, setSelectedDept] = useState('전체');
  const [selectedName, setSelectedName] = useState('전체');
  // Load selected year and month from localStorage when component mounts
  const initialYearMonth = loadSelectedYearMonthFromLocalStorage();
  const [selectedYear, setSelectedYear] = useState(initialYearMonth.year || moment().format('YY'));
  const [selectedMonth, setSelectedMonth] = useState(initialYearMonth.month || moment().format('MM'));

  const [selectFilename, setSelectFilename] = useState('전체 구분');
  const [selectState, setSelectState] = useState('전체 상태');
  const [selectCheck, setSelectCheck] = useState('확인여부');

  const [currentDeptMembers, setCurrentDeptMembers] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [deptMembers, setDeptMembers] = useState({});
  const [uniqueFiles, setUniqueFiles] = useState([]);
  const [uniqueState, setUniqueState] = useState([]);
  const [uniqueCheck, setUniqueCheck] = useState([]);
  const { verificationStatus, setVerificationStatus } = useVerificationStatus();
  const currentDate = moment().format('YYYY년 MM월');


  const currentYear = moment().year(); // 현재 연도를 얻기
  const startYear = 2023; // 서비스 시작 연도
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => (startYear + i).toString().slice(-2));

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
      const files = [...new Set(currentItems.map((item) => item.file))];
      const states = [...new Set(currentItems.map((item) => item.state))];
      const checks = [...new Set(currentItems.map((item) => item.mstCheck))];
      setUniqueFiles(['전체 구분', ...files]);
      setUniqueState(['전체 상태', ...states]);
      setUniqueCheck(['확인여부', ...checks]);
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

    if (selectFilename !== '전체 구분') {
      items = items.filter((item) => item.file === selectFilename);
    }
    if (selectState !== '전체 상태') {
      items = items.filter((item) => item.state === selectState);
    }
    if (selectCheck !== '확인여부') {
      items = items.filter((item) => item.mstCheck === selectCheck);
    }

    setFilteredItems(items);
  }, [selectedName, selectedDept, selectedYear, currentItems, deptMembers, selectFilename, selectState, selectCheck]);

  const handleRadioChange = useCallback(
    (event) => {
      setVerificationStatus(event.target.value);
    },
    [setVerificationStatus],
  );

  useEffect(() => {
    const yearMonth = `${selectedYear}${selectedMonth.padStart(2, '0')}`
    onYearMonthChange(yearMonth);

    saveSelectedYearMonthToLocalStorage(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth, onYearMonthChange]);


  return (
    <div className="w-full text-xm sm:text-md bg-white">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error...</p>}
      {isMst && (
        <div className="lg:flex lg:justify-between">
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
            {verificationStatus === 'all' && (
              <>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="border border-gray-500 rounded px-4 py-2 mr-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year} 년
                    </option>
                  ))}
                </select>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="border border-gray-500 rounded px-4 py-2 mr-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month}>
                      {month} 월
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>
          <div className="flex items-center space-x-3 sm:mr-5 ml-3 py-1.5">
            <label className="flex">
              <input
                className="mr-1"
                type="radio"
                name="verificationStatus"
                value="unverified"
                checked={verificationStatus === 'unverified'}
                onChange={handleRadioChange}
              />
              미확인
            </label>
            <label className="flex">
              <input
                className="mr-1"
                type="radio"
                name="verificationStatus"
                value="verified"
                checked={verificationStatus === 'verified'}
                onChange={handleRadioChange}
              />
              확인(최근)
            </label>
            <label className="flex text-gray-500 text-xm">
              <input
                className="mr-1"
                type="radio"
                name="verificationStatus"
                value="all"
                checked={verificationStatus === 'all'}
                onChange={handleRadioChange}
              />
              전체
            </label>
          </div>
        </div>
      )}
      {!isMst && (
         <div className='m-2'>
                <select
                   value={selectedYear}
                   onChange={(e) => setSelectedYear(e.target.value)}
                   className="border border-gray-500 rounded px-4 py-2 mr-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  {years.map((year) => (
                     <option key={year} value={year}>
                       {year} 년
                     </option>
                  ))}
                </select>
                <select
                   value={selectedMonth}
                   onChange={(e) => setSelectedMonth(e.target.value)}
                   className="border border-gray-500 rounded px-4 py-2 mr-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                     <option key={month} value={month}>
                       {month} 월
                     </option>
                  ))}
                </select>
         </div>
      )}
      <div className='m-2 text-xm sm:text-md'>
        <div className='flex'>
          현재 날짜는 &nbsp;<p className='text-red-600 font-bold'>{currentDate}</p>&nbsp;입니다.
        </div>
        <div className='flex'>
          지금 보시는 데이터는 <p className='text-blue-600 font-bold'>&nbsp;20{selectedYear}년 {selectedMonth}월자 데이터</p>입니다.
        </div>
      </div>



      <table className="min-w-full bg-white border-t border-b border-gray-300 divide-y divide-gray-300 ">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <select
                onChange={(e) => setSelectState(e.target.value)}
                className="bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400 border-dotted border-gray-300 border-2"
              >
                {uniqueState.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              제목
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <select
                onChange={(e) => setSelectFilename(e.target.value)}
                className="bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400 border-dotted border-gray-300 border-2"
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
            {isMst ? (
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <select
                  onChange={(e) => setSelectCheck(e.target.value)}
                  className="bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400 border-dotted border-gray-300 border-2"
                >
                  {uniqueCheck.map((check) => (
                    <option key={check} value={check}>
                      {check}
                    </option>
                  ))}
                </select>
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300">
          {filteredItems.length > 0 ? (
            filteredItems.map((product) => (
              <PaperRow key={product.id} product={product} isAdmins={isAdmins} isMst={isMst} />
            ))
          ) : (
            <tr>
              <td colSpan="100%" className="text-center py-3">
                자료가 없습니다
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
