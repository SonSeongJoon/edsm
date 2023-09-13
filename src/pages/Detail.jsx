import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { expenditure } from '../components/html/Expenditure';
import { ItemOutput } from '../components/html/ItemOutput';
import { ItemModify } from '../components/html/ItemModify'; // 필요한 경우 추가

export default function Detail() {
  const {
    state: {
      product: { id, title, dept, deel, file, date, state, items },
    },
  } = useLocation();
  const locationState = useLocation().state;

  const product = locationState?.product;
  const htmlString = expenditure(product);
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [editableProduct, setEditableProduct] = useState(product);
	const [tempItems, setTempItems] = useState([]);


	function htmlToFile(fileExtension) {
    let source =
      fileExtension === 'doc'
        ? 'data:application/msword;charset=utf-8,' + encodeURIComponent(htmlString)
        : 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlString);

    let fileDownload = document.createElement('a');
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'downloadedFile.' + fileExtension;
    fileDownload.click();
    document.body.removeChild(fileDownload);
  }

  const openEditModal = () => {
    setModalProduct({ ...product }); // 초기화
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
		setEditableProduct((prevProduct) => {
			const newItems = [...prevProduct.items];
			newItems[idx] = updatedItem;
			return {
				...prevProduct,
				items: newItems
			};
		});
	};

	// "저장" 버튼 클릭 시 실행될 함수
	const handleSave = () => {
		setEditableProduct(modalProduct);
		setShowEditModal(false);
	};

	return (
		<div className="max-w-screen-2xl mx-auto border-b border-gray-300 p-5">
			{showEditModal && (
				<div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
					<div className="bg-white p-5 rounded shadow-lg w-[800px] border border-gray-500">
						<div className="flex items-center mb-2">
							<h1 className="font-bold mr-2 mb-1">제&nbsp;&nbsp;&nbsp;&nbsp;목 : </h1>
							<input
								name="title"
								value={modalProduct.title}
								onChange={handleEditChange}
								className="border border-gray-500 p-1 rounded-md shadow-md"
							/>
						</div>
						<div className="flex items-center mb-2">
							<h1 className="font-bold mr-2 mb-1">부서명 : </h1>
							<input
								name="dept"
								value={modalProduct.dept}
								onChange={handleEditChange}
								className="border border-gray-500 p-1 rounded-md shadow-md"
							/>
						</div>
						<div className="flex items-center">
							<h1 className="font-bold mr-2 mb-1">거래처 : </h1>
							<input
								name="deel"
								value={modalProduct.deel}
								onChange={handleEditChange}
								className="border border-gray-500 p-1 rounded-md shadow-md"
							/>
						</div>
						{modalProduct.items.map((item, idx) => (
							<div key={idx} className="flex items-center mt-5">
								<ItemModify item={item} idx={idx + 1} handleItemValue={handleItemValue} />
							</div>
						))}
						<div className="flex w-full justify-center mt-5">
							<button className="border px-2 py-1 rounded-md bg-gray-100 mr-2" onClick={handleSave}>저장</button>
							<button className="border px-2 py-1 rounded-md bg-gray-100" onClick={closeEditModal}>닫기</button>
						</div>
					</div>
				</div>
			)}

			<div className="container border-gray-500">
				<div className="w-full flex justify-between mb-3">
					<div className="flex items-center">
						<h1 className="text-2xl font-bold mr-2">{editableProduct.title}</h1>
						<p className="text-brand text-2xl font-bold mr-2">|</p>
						<p className="text-gray-500 text-lg">{editableProduct.file}</p>
						<button
							className="bg-gray-500 text-white p-1 rounded-md text-sm mx-2"
							onClick={openEditModal}
						>
							수정하기
						</button>
						<button className="bg-gray-500 text-white p-1 rounded-md text-sm">삭제하기</button>
					</div>
					<h1>{editableProduct.date}</h1>
				</div>
				<div className="flex flex-col header">
					<div className="flex">
						<h1 className="font-bold mr-2 mb-1">부서명 : </h1>
						<p>{editableProduct.dept}</p>
					</div>
					<div className="flex">
						<h1 className="font-bold mr-2 mb-1">거래처 : </h1>
						<p>{editableProduct.deel}</p>
					</div>
					{editableProduct.items.map((item, idx) => (
						<div key={idx} className="flex items-center mt-5">
							<ItemOutput item={item} idx={idx + 1} />
						</div>
					))}
				</div>
			</div>
			<div className="mt-2 flex w-full justify-end">
				<button onClick={() => navigate(-1)} className="bg-brand text-white p-1 rounded-md mr-2">뒤로 가기</button>
				<button className="bg-blue-800 text-white p-1 rounded-md" onClick={() => htmlToFile('doc')}>워드 다운로드</button>
			</div>
		</div>
	);
}
