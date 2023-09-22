import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom'; // Import useParams
import { getAll, getProduct, getReceive } from '../api/firebase';
import { TableComponent } from './TableComponent';

export default function PaperList({ category, state, adminData, MstData }) {
  const { pageId } = useParams();
  const currentPage = parseInt(pageId, 10) || 1;
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const location = useLocation();
  const basePath = location.pathname.split('/')[1];

  // queryKey 및 queryFunction 구성 로직
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

  // useQuery 사용하여 데이터 가져오기
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(queryKey, queryFunction);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products
    ? products.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil((products ? products.length : 0) / itemsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }
  const handlePageClick = (pageNumber) => {
    navigate(`/${basePath}/page/${pageNumber}`);
  };

  return (
    <TableComponent
      isLoading={isLoading}
      error={error}
      currentItems={currentItems}
      pageNumbers={pageNumbers}
      currentPage={currentPage}
      handlePageClick={handlePageClick}
      isAdmins={adminData}
      isMst={MstData}
    />
  );
}
