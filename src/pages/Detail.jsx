import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {expenditure} from '../components/html/Expenditure';
import {ItemOutput} from '../components/html/ItemOutput';
import {deleteProduct, updateProduct} from '../api/firebase';
import {getDatabase, ref, onValue, off} from 'firebase/database';
import {EditModal} from '../components/EditModal';

export default function Detail() {
	const {
		state: {product},
	} = useLocation();
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
			doc : 'data:application/msword;charset=utf-8,',
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
		setModalProduct({...product});
		setShowEditModal(true);
	};

	const closeEditModal = () => {
		setShowEditModal(false);
	};

	const handleEditChange = (e) => {
		const {name, value} = e.target;
		setModalProduct((prev) => ({...prev, [name]: value}));
	};

	const handleItemValue = (idx, updatedItem) => {
		setModalProduct((prevProduct) => {
			const newItems = [...prevProduct.items];
			newItems[idx] = updatedItem;
			return {...prevProduct, items: newItems};
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

	function handleDelete() {
     const isConfirmed = window.confirm('정말 삭제하시겠습니까?');
     if(isConfirmed) {
       deleteProduct(product.id)
       .then(() => {
         alert('삭제되었습니다.')
       }).then(() => navigate(-1));
     }
   }

		const displayProduct = updatedProduct || product;

		return (
			<div className="w-full">
				{showEditModal && (
					<EditModal
						modalProduct={modalProduct}
						handleEditChange={handleEditChange}
						handleItemValue={handleItemValue}
						handleSave={handleSave}
						closeEditModal={closeEditModal}
					/>
				)}
				<div className='p-10'>
					<div className="container mx-auto p-6 md:p-10 lg:p-16 shadow-lg rounded-lg bg-white border border-gray-200">
						<div className="w-full flex justify-between items-center mb-3">
							<div className="flex items-center space-x-2">
								<h1 className="text-2xl font-bold">{displayProduct.title}</h1>
								<p className="text-brand text-2xl font-bold">|</p>
								<p className="text-gray-500 text-lg">{product.file}</p>
							</div>
							<h1 className="text-gray-600">{product.date}</h1>
						</div>
						<div className="flex flex-col header space-y-4 md:space-y-6 lg:space-y-8">
							<div className="flex items-center">
								<h1 className="font-bold mr-2">부서명 : </h1>
								<p className="text-gray-600">{displayProduct.dept}</p>
							</div>
							<div className="flex items-center">
								<h1 className="font-bold mr-2">거래처 : </h1>
								<p className="text-gray-600">{displayProduct.deel}</p>
							</div>
							{displayProduct.items.map((item, idx) => (
								<div key={idx} className="flex items-center">
									<ItemOutput item={item} idx={idx + 1}/>
								</div>
							))}
						</div>
						<div className="mt-3">
							<button
								className="bg-gray-500 text-white px-2 py-1 rounded text-sm mr-2 hover:bg-gray-600"
								onClick={openEditModal}
							>
								수정하기
							</button>
							<button
								className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
								onClick={handleDelete}
							>
								삭제하기
							</button>
						</div>
					</div>
					<div className="container mx-auto mt-10 flex w-full justify-end space-x-2 md:space-x-4 lg:space-x-8">
						<button
							onClick={() => navigate(-1)}
							className="bg-brand text-white px-4 py-2 rounded hover:bg-brand-dark"
						>
							뒤로 가기
						</button>
						<button
							className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900"
							onClick={() => htmlToFile('doc')}
						>
							워드 다운로드
						</button>
					</div>
				</div>


			</div>
		);
	}
