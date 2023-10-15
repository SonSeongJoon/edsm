import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { expenditure } from '../components/html/Transhtml/Expenditure';
import {deleteProduct, getAllOneState, getData, updateProduct} from '../api/firebase';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import DetailUserFormat from '../components/DetailUserFormat';
import { useAuthContext } from '../context/AuthContext';
import DetailAdminFormat from '../components/DetailAdminFormat';
import { vacationPlan } from '../components/html/Transhtml/VacationPlan';
import { useQuery } from '@tanstack/react-query';
import {approvalDocument} from "../components/html/Transhtml/approvalDocument";

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

  const { data: allState, isLoading: isLoadingAllState } = useQuery(
     ["allState", id],
     () => getAllOneState(id)
  );



  const { data: product, isLoading: isLoadingProduct } = useQuery(
     ["product", id],
     () => getData(id),
  );


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
    '지출결의서': expenditure,
    '휴가계': vacationPlan,
    '품의서': approvalDocument,
  };

  const htmlString = product && product.file && fileFunctionMap[product.file]
     ? fileFunctionMap[product.file](product)
     : null;

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
    <div className="flex justify-center items-center h-full">
      {product ? (
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
            htmlToFile={htmlToFile}
            isMst={isMst}
            states={states}
            setModalProduct={setModalProduct}
          />
        )
      ) : (
        <p>Loading...</p> // or a loading spinner
      )}
    </div>
  );
}
