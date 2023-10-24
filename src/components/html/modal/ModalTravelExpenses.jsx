// ModalExpend.js
import React from 'react';
import {ItemModify} from "../ItemModify";

const ModalTravelExpenses = ({ modalProduct, handleEditChange, handleItemValue, handleRemoveItem, handleAddItem }) => {
	const { items, title, deel } = modalProduct;

	return (
		<div>
			<div className="flex items-center mb-1">
				<h1 className="font-bold mr-1 mb-1">
					제&nbsp;&nbsp;&nbsp;&nbsp;목 : {' '}
				</h1>
				<input
					name="title"
					value={title || ''}
					onChange={handleEditChange}
					className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
				/>
			</div>
			<div className="flex items-center">
				<h1 className="font-bold mr-1 mb-1">업체명 : </h1>
				<input
					name="deel"
					value={deel || ''}
					onChange={handleEditChange}
					className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
				/>
			</div>
			{items.map((item, idx) => (
				<div key={item.id || idx} className="flex items-center mt-3">
					<ItemModify
						item={item}
						idx={idx}
						handleItemValue={handleItemValue}
						handleRemoveItem={handleRemoveItem}
					/>
				</div>
			))}
			<button
				className="mt-2 bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
				onClick={handleAddItem}
			>
				아이템 추가
			</button>
		</div>
	);
};

export default ModalTravelExpenses;
