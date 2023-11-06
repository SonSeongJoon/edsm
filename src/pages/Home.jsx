import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { getPersonalData, getPersonalReceive } from '../api/firebase';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { user } = useAuthContext();
  const isAdmin = user?.isAdmin;
  const userId = user?.uid;
  const navigate = useNavigate();

  const {
    isLoading: isLoadingPersonalData,
    error: errorPersonalData,
    data: personalData,
  } = useQuery(['data'], () => getPersonalData(userId), { enabled: !!userId });

  const {
    isLoading: isLoadingReceivedData,
    error: errorReceivedData,
    data: receivedData,
  } = useQuery(['receivedData'], () => getPersonalReceive(userId), {
    enabled: !!userId,
  });

  if (isLoadingPersonalData || (isAdmin && isLoadingReceivedData)) {
    return (
      <div className="h-full flex justify-center items-center">
        <img src="/seoulir.png" alt="seoulir" className="w-[300px]" />
      </div>
    );
  }

  if (errorPersonalData || (isAdmin && errorReceivedData)) {
    return (
      <div className="h-full flex justify-center items-center">
        <span>Error: {(errorPersonalData || errorReceivedData).message}</span>
      </div>
    );
  }

  const currentItems = personalData ? personalData : [];
  const receivedItems = receivedData ? receivedData : [];

  const getStatusCounts = (items) =>
    items.reduce((acc, state) => {
      acc[state] = (acc[state] || 0) + 1;
      return acc;
    }, {});

  const personalStatusCounts = getStatusCounts(currentItems);
  const receivedStatusCounts = getStatusCounts(receivedItems);
  const statuses = ['대기', '반려', '승인'];

  return (
    <div className="h-full flex flex-col justify-center items-center bg-gray-50 py-10 px-2">
      <h1 className="font-bold text-2xl mb-5 text-gray-700">결재 현황</h1>
      <div className="grid grid-cols-3 gap-4 mb-6 w-full max-w-md sm:px-0 px-3">
        {statuses.map((status) => (
          <div
            key={status}
            className="flex flex-col items-center justify-center bg-white border border-gray-300 rounded-lg p-4 shadow-md cursor-pointer transition transform hover:scale-105"
            onClick={() => {
              if (status === '대기') navigate('/wait');
              if (status === '반려') navigate('/reject');
              if (status === '승인') navigate('/complete');
            }}
          >
            <span className="text-lg font-bold text-indigo-500">{status}</span>
            <span className="text-gray-600">{personalStatusCounts[status] || 0}건</span>
          </div>
        ))}
      </div>
      {isAdmin && (
        <>
          <h1 className="font-bold text-2xl mb-5 text-gray-700">수신함 현황</h1>
          <div className="grid grid-cols-1 gap-4 mb-6 w-full max-w-md">
            <div
              className="flex flex-col items-center justify-center bg-white border border-gray-300 rounded-lg p-4 shadow-md cursor-pointer transition transform hover:scale-105"
              onClick={() => navigate('/receive')}
            >
              <span className="flex text-lg items-end font-bold">
                <span className="text-indigo-500 mr-2">{receivedStatusCounts['대기'] || 0}</span>
                <p className="text-gray-600 text-md font-medium">건의 결재가 남아있습니다.</p>
              </span>
            </div>
          </div>
        </>
      )}
      <span className="text-md mb-5 text-gray-400">카드를 클릭하면 페이지 이동됩니다.</span>
      <img src="/seoulir.png" alt="seoulir" className="w-[200px]" />
    </div>
  );
}
