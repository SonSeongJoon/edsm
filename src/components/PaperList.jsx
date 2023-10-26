import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAll, getProduct, getReceive } from '../api/firebase';
import { TableComponent } from './TableComponent';

export default function PaperList({ category, state, adminData, MstData }) {

  let queryKey;
  let queryFunction;
  if (!adminData && !MstData) {
    queryKey = [category, state];
    queryFunction = () => getProduct(state);
  } else if (adminData && !MstData) {
    queryKey = [category, state];
    queryFunction = () => getReceive(state);
  } else if (MstData) {
    queryKey = [category, state];
    queryFunction = () => getAll();
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
     />
  );
}
