import React from 'react';

const ModalApproval = ({ modalProduct, handleEditChange }) => {
	return (
		<div>
			<div className="flex items-center mb-1">
				<h1 className="font-bold mr-1 mb-1">제목 : </h1>
				<input
					name="title"
					value={modalProduct.title || ''}
					onChange={handleEditChange}
					className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
				/>
			</div>
			<div className="flex items-center mb-1">
				<h1 className="font-bold mr-1 mb-1">상세 내용 : </h1>
				<textarea
					name="detail"
					value={modalProduct.detail || ''}
					onChange={handleEditChange}
					className="border border-gray-500 p-1 rounded-md shadow-md w-1/2 h-20"
				/>
			</div>
		</div>
	);
};

export default ModalApproval;
