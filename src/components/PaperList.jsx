import React, {useEffect, useState} from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAll, getProduct, getReceive } from '../api/firebase';
import { TableComponent } from './TableComponent';

export default function PaperList({ category, state, adminData, MstData }) {
  const [verificationStatus, setVerificationStatus] = useState(
     () => window.localStorage.getItem('verificationStatus') || 'unverified'
  );

  // This effect runs when 'verificationStatus' changes. We store the new value in local storage.
  useEffect(() => {
    window.localStorage.setItem('verificationStatus', verificationStatus);
  }, [verificationStatus]);

  // ... rest of your component

  // Don't forget to handle the change. This function will be triggered by some user action.
  const handleVerificationChange = (newStatus) => {
    setVerificationStatus(newStatus); // This will trigger the effect above after state change
  };


  let queryFunction;
  const queryKey = [category, state, verificationStatus, adminData, MstData];

  if (!adminData && !MstData) {
    queryFunction = () => getProduct(state);
  } else if (adminData && !MstData) {
    queryFunction = () => getReceive(state);
  } else if (MstData) {
    queryFunction = () => getAll(verificationStatus);
  }


  const {
    isLoading,
    error,
    data: products,
  } = useQuery(queryKey, queryFunction);

  const currentItems = products ? products : [];

  return (
    <TableComponent
      isLoading={isLoading}
      error={error}
      currentItems={currentItems}
      isAdmins={adminData}
      isMst={MstData}
      onVerificationChange={handleVerificationChange}
    />
  );
}
