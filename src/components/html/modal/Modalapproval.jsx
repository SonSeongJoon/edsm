import React from 'react';

const ModalApproval = ({ modalProduct, handleEditChange }) => {
	return (
		<div>
			<div className="flex items-center mb-1">
				<h1 className="font-bold mr-1 mb-1">제 목 : </h1>
				<input
					name="title"
					value={modalProduct.title || ''}
					onChange={handleEditChange}
					className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
				/>
			</div>
			<div className="flex items-center mb-1">
				<h1 className="font-bold mr-1 mb-1">기 간 : </h1>
				<input
					name="period"
					value={modalProduct.period || ''}
					onChange={handleEditChange}
					className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
				/>
			</div>
			<div className="flex items-center mb-1">
				<h1 className="font-bold mr-1 mb-1">금 액 : </h1>
				<input
					name="price"
					value={modalProduct.price || ''}
					onChange={handleEditChange}
					className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
				/>
			</div>
			<div className="flex items-center mb-1">
				<h1 className="font-bold mr-1 mb-1">비고 : </h1>
				<input
					name="note"
					value={modalProduct.note || ''}
					onChange={handleEditChange}
					className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
				/>
			</div>
		</div>
	);
};

export default ModalApproval;
