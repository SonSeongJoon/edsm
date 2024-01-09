// ModalExpend.js
import React, { useState } from 'react';
import {HomeItemModify} from "../HomeItemMotify";

const ModalHomeReport = ({ modalProduct, handleEditChange, handleItemValue, handleRemoveItem, handleAddItem }) => {
	const { items } = modalProduct;
	const [formData, setFormData] = useState(modalProduct);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleEditChangeWithState = (e) => {
		handleChange(e);
		handleEditChange(e);
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
					<HomeItemModify
						item={item}
						idx={idx}
						handleItemValue={handleItemValue}
						handleRemoveItem={handleRemoveItem}
					/>
				</div>
			))}
		</div>
	);
};

export default ModalHomeReport;
