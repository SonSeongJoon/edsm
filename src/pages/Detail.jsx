import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { expenditure } from '../components/html/Transhtml/Expenditure';
import {
  deleteProduct,
  getAllOneState,
  getData,
  updateProduct,
} from '../api/firebase';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import DetailUserFormat from '../components/DetailUserFormat';
import { useAuthContext } from '../context/AuthContext';
import DetailAdminFormat from '../components/DetailAdminFormat';
import { vacationPlan } from '../components/html/Transhtml/VacationPlan';
import { useQuery } from '@tanstack/react-query';
import { approvalDocument } from '../components/html/Transhtml/approvalDocument';
import { ReporterGift } from '../components/html/Transhtml/ReporterGift';
import {Overtime} from "../components/html/Transhtml/Overtime";
import {Customer} from "../components/html/Transhtml/Customer";
import {TravelExpenses} from "../components/html/Transhtml/TravelExpenses";
import {Alternative} from "../components/html/Transhtml/Alternative";

export default function Detail() {
  const location = useLocation();
  const { isMst } = location.state || {};
  const navigate = useNavigate();
  const { id } = useParams();
  const [states, setStates] = useState([]);

  const currentPath = location.pathname;
  const [showEditModal, setShowEditModal] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState(null);
  const user = useAuthContext();

  const {
    data: allState,
    isLoading: isLoadingAllState,
    isError: isErrorAllState,
    error: errorAllState,
  } = useQuery(['allState', id], () => getAllOneState(id));

  const {
    data: product,
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
    error: errorProduct,
  } = useQuery(['product', id], () => getData(id));

  useEffect(() => {
    if (product) {
      const db = getDatabase();
      const productRef = ref(db, `products/${product.id}`);

      const handleDataChange = (snapshot) => {
        const updatedData = snapshot.val();
        setUpdatedProduct(updatedData);
      };

      onValue(productRef, handleDataChange);

      return () => {
        off(productRef, 'value', handleDataChange);
      };
    }
  }, [product]);

  useEffect(() => {
    if (allState && product) {
      const filteredStates = allState
        .filter((stateItem) => stateItem.id === product.id)
        .map((stateItem) => ({
          name: stateItem.name,
          state: stateItem.state,
        }));
      setStates(filteredStates);
    }
  }, [allState, product]);

  if (isLoadingAllState || isLoadingProduct) {
    return <p>Loading...</p>;
  }

  const fileFunctionMap = {
    지출결의서: expenditure,
    휴가계: vacationPlan,
    품의서: approvalDocument,
    기자선물품의서: ReporterGift,
    초과근무사전품의서: Overtime,
    고객사실비청구서: Customer,
    출장비정산서: TravelExpenses,
    대체휴무사용품의서: Alternative,
  };0

  const htmlString =
    product && product.file && fileFunctionMap[product.file]
      ? fileFunctionMap[product.file](product)
      : null;

  const openEditModal = () => {
    if (updatedProduct) {
      setModalProduct(updatedProduct);
    } else {
      setModalProduct(product);
    }
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setModalProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemValue = (idx, updatedItem) => {
    console.log('Before Update:', modalProduct);
    setModalProduct((prevProduct) => {
      const newItems = [...prevProduct.items];
      newItems[idx] = updatedItem;
      return { ...prevProduct, items: newItems };
    });
    console.log('After Update:', modalProduct);
  };

  function handleSave() {
    const userName = product.name;
    const productID = product.id;
    updateProduct(product, userName, productID, modalProduct)
      .then(() => {
        setShowEditModal(false);
      })
      .catch((error) => {
        console.error('Failed to update product:', error);
      });
  }

  function handleDelete() {
    const isConfirmed = window.confirm('정말 삭제하시겠습니까?');
    if (isConfirmed) {
      deleteProduct(product.id)
        .then(() => {
          alert('삭제되었습니다.');
        })
        .then(() => navigate(-1));
    }
  }

  const displayProduct = updatedProduct || product;
  const isAdmin = user?.user?.isAdmin;
  const isReceivePath = currentPath.includes('/receive');
  return (
    <div className="relative">
      <div className="flex justify-center items-center h-full mt-5 border-b border-gray-200">
        {' '}
        {/* 하단 테두리 추가 */}
        {isErrorProduct || isErrorAllState ? (
          <p>삭제된 데이터입니다.</p>
        ) : isErrorProduct ? (
          <p>{errorProduct.message}</p>
        ) : isErrorAllState ? (
          <p>{errorAllState.message}</p>
        ) : product ? (
          isAdmin && isReceivePath ? (
            <DetailAdminFormat
              displayProduct={displayProduct}
              product={product}
              navigate={navigate}
              states={states}
            />
          ) : (
            <DetailUserFormat
              showEditModal={showEditModal}
              modalProduct={modalProduct}
              handleEditChange={handleEditChange}
              handleItemValue={handleItemValue}
              handleSave={handleSave}
              closeEditModal={closeEditModal}
              displayProduct={displayProduct}
              product={product}
              openEditModal={openEditModal}
              handleDelete={handleDelete}
              navigate={navigate}
              htmlString={htmlString}
              isMst={isMst}
              states={states}
              setModalProduct={setModalProduct}
            />
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
