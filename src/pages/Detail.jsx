import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { expenditure } from '../components/html/Expenditure';
import { deleteProduct, updateProduct } from '../api/firebase';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import DetailUserFormat from '../components/DetailUserFormat';
import { useAuthContext } from '../context/AuthContext';
import DetailAdminFormat from '../components/DetailAdminFormat';
import {vacationPlan} from "../components/html/VacationPlan";

export default function Detail() {
  const {
    state: { product, state, isMst , states, },
  } = useLocation();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [showEditModal, setShowEditModal] = useState(false);
  const [modalProduct, setModalProduct] = useState(product);
  const [updatedProduct, setUpdatedProduct] = useState(null);
  const user = useAuthContext();

  useEffect(() => {
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
  }, [product]);

  const htmlString =
     product.file === '지출결의서'
        ? expenditure(product)
        : vacationPlan(product);

  function htmlToFile(fileExtension) {
    const sourceMap = {
      doc: 'data:application/msword;charset=utf-8,',
      html: 'data:text/html;charset=utf-8,',
    };
    const source = sourceMap[fileExtension] || sourceMap['html'];
    const fileDownload = document.createElement('a');
    document.body.appendChild(fileDownload);
    fileDownload.href = source + encodeURIComponent(htmlString);
    fileDownload.download = 'downloadedFile.' + fileExtension;
    fileDownload.click();
    document.body.removeChild(fileDownload);
  }

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
    updateProduct(product, modalProduct)
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
    <div>
      {isAdmin && isReceivePath ? (
        <DetailAdminFormat
          displayProduct={displayProduct}
          product={product}
          navigate={navigate}
        />
      ) : (
        <>
          <DetailUserFormat
            oneState={state}
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
            htmlToFile={htmlToFile}
            isMst={isMst}
            states={states}
            setModalProduct={setModalProduct}
          />
        </>
      )}
    </div>
  );
}
