import React from 'react';

const ModalLimitExcess = ({ modalProduct, handleEditChange }) => {
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
				<h1 className="font-bold mr-1 mb-1">지출사유 : </h1>
				<textarea
					name="content"
					value={modalProduct.content || ''}
					onChange={handleEditChange}
					className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
				/>
			</div>
			<div className="flex items-center mb-1">
				<h1 className="font-bold mr-1 mb-1">지출날짜 : </h1>
				<input
					type="date"
					name="startDate"
					value={modalProduct.startDate || ''}
					onChange={handleEditChange}
					className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
				/>
			</div>
			<div className="flex items-center mb-1">
				<h1 className="font-bold mr-1 mb-1">예상비용 : </h1>
				<input
					name="price"
					value={modalProduct.price || ''}
					onChange={handleEditChange}
					className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
				/>
			</div>
		</div>
	);
};

export default ModalLimitExcess;
