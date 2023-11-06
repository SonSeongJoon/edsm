import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAll, getProduct, getReceive } from '../api/firebase';
import { TableComponent } from './TableComponent';
import { useVerificationStatus } from '../context/VerificationStatusProvider';
import { useYearMonthContext } from '../context/YearMonthContext';

export default function PaperList({ category, state, adminData, MstData}) {
  const { verificationStatus, setVerificationStatus } = useVerificationStatus();
  const { yearMonth, setYearMonth } = useYearMonthContext();
  const handleVerificationChange = (newStatus) => {
    setVerificationStatus(newStatus);
  };

  let queryFunction;
  const queryKey = [category, state, verificationStatus, adminData, MstData, yearMonth];

  if (!adminData && !MstData) {
    queryFunction = () => getProduct(state);
  } else if (adminData && !MstData) {
    queryFunction = () => getReceive(state);
  } else if (MstData) {
    queryFunction = () => getAll(verificationStatus, yearMonth);
  }

  const { isLoading, error, data: products } = useQuery(queryKey, queryFunction);
  console.log(products)
  const currentItems = products ? products : [];

  return (
    <TableComponent
      isLoading={isLoading}
      error={error}
      currentItems={currentItems}
      isAdmins={adminData}
      isMst={MstData}
      onVerificationChange={handleVerificationChange}
      onYearMonthChange={setYearMonth}
    />
  );
}
