import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { expenditure } from '../components/html/Expenditure';
import { ItemOutput } from '../components/html/ItemOutput';
import { updateProduct } from '../api/firebase';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import {EditModal} from "../components/EditModal";

export default function Detail() {
  const { state: { product } } = useLocation();
  const htmlString = expenditure(product);
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [modalProduct, setModalProduct] = useState(product);
  const [updatedProduct, setUpdatedProduct] = useState(null);

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
  }, [product.id]);

  function htmlToFile(fileExtension) {
    const sourceMap = {
      doc: 'data:application/msword;charset=utf-8,',
      html: 'data:text/html;charset=utf-8,'
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
    setModalProduct({ ...product });
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
    setModalProduct((prevProduct) => {
      const newItems = [...prevProduct.items];
      newItems[idx] = updatedItem;
      return { ...prevProduct, items: newItems };
    });
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

  const displayProduct = updatedProduct || product;

  return (
     <div className="max-w-screen-2xl mx-auto border-b border-gray-300 p-5">
       {showEditModal &&  (
          <EditModal
             modalProduct={modalProduct}
             handleEditChange={handleEditChange}
             handleItemValue={handleItemValue}
             handleSave={handleSave}
             closeEditModal={closeEditModal}
          />
       )}
       <div className="container border-gray-500">
         <div className="w-full flex justify-between mb-3">
           <div className="flex items-center">
             <h1 className="text-2xl font-bold mr-2">{displayProduct.title}</h1>
             <p className="text-brand text-2xl font-bold mr-2">|</p>
             <p className="text-gray-500 text-lg">{product.file}</p>
             <button
                className="bg-gray-500 text-white p-1 rounded-md text-sm mx-2"
                onClick={openEditModal}
             >
               수정하기
             </button>
             <button className="bg-gray-500 text-white p-1 rounded-md text-sm">삭제하기</button>
           </div>
           <h1>{product.date}</h1>
         </div>
         <div className="flex flex-col header">
           <div className="flex">
             <h1 className="font-bold mr-2 mb-1">부서명 : </h1>
             <p>{displayProduct.dept}</p>
           </div>
           <div className="flex">
             <h1 className="font-bold mr-2 mb-1">거래처 : </h1>
             <p>{displayProduct.deel}</p>
           </div>
           {displayProduct.items.map((item, idx) => (
              <div key={idx} className="flex items-center mt-5">
                <ItemOutput item={item} idx={idx + 1} />
              </div>
           ))}
         </div>
       </div>
       <div className="mt-2 flex w-full justify-end">
         <button onClick={() => navigate(-1)} className="bg-brand text-white p-1 rounded-md mr-2">
           뒤로 가기
         </button>
         <button className="bg-blue-800 text-white p-1 rounded-md" onClick={() => htmlToFile('doc')}>
           워드 다운로드
         </button>
       </div>
     </div>
  );
}