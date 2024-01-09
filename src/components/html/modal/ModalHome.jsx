// ModalExpend.js
import React, { useState } from 'react';
import { ItemModify } from '../ItemModify';

const ModalHome = ({ modalProduct, handleEditChange, handleItemValue, handleRemoveItem, handleAddItem }) => {
	const { items } = modalProduct;
	const [formData, setFormData] = useState(modalProduct); // formData 상태 추가

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleEditChangeWithState = (e) => {
		handleChange(e);
		handleEditChange(e); // 부모 컴포넌트로 변경된 값을 전달
	};

	return (
		<div>
			<div className="flex items-center mb-1">
				<h1 className="font-bold mr-1 mb-1">제&nbsp;&nbsp;&nbsp;&nbsp;목 : </h1>
				<input
					name="title"
					value={formData.title || ''}
					onChange={handleEditChangeWithState}
					className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
				/>
			</div>
			<div className="flex items-center mt-3">
				<h1 className="font-bold mr-1 mb-1">근무 장소 : </h1>
				<input
					name="workPlace"
					value={formData.workPlace || ''}
					onChange={handleChange}
					className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
				/>
			</div>
			<div className="flex items-center mt-3">
				<h1 className="font-bold mr-1 mb-1">근무 날짜 : </h1>
				<input
					name="workDate"
					type="date"
					value={formData.workDate || ''}
					onChange={handleChange}
					className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
				/>
			</div>
			<div className="flex items-center mt-3">
				<h1 className="font-bold mr-1 mb-1">근무 시간 : </h1>
				<input
					name="workTime"
					type="time"
					value={formData.workTime || ''}
					onChange={handleChange}
					className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
				/>
			</div>
			<div className="flex items-center mt-3">
				<h1 className="font-bold mr-1 mb-1">근무 방법 : </h1>
				<input
					name="workHow"
					value={formData.workHow || ''}
					onChange={handleChange}
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

export default ModalHome;
