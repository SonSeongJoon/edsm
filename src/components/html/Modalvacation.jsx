import React from 'react';

const ModalVacation = ({ modalProduct, handleEditChange }) => {
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
				<h1 className="font-bold mr-1 mb-1">귀속 연도 : </h1>
				<input
					name="AttributionYear"
					value={modalProduct.AttributionYear || ''}
					onChange={handleEditChange}
					className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
				/>
			</div>
			<div className="flex items-center mb-1">
				<h1 className="font-bold mr-1 mb-1">총 휴가일수 : </h1>
				<input
					type="number"
					name="TotalLeaveDays"
					value={modalProduct.TotalLeaveDays || ''}
					onChange={handleEditChange}
					className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
				/>
			</div>
			<div className="flex items-center mb-1">
				<h1 className="font-bold mr-1 mb-1">사용일수 : </h1>
				<input
					type="number"
					name="UsedDays"
					value={modalProduct.UsedDays || ''}
					onChange={handleEditChange}
					className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
				/>
			</div>
			<div className="flex items-center mb-1">
				<h1 className="font-bold mr-1 mb-1">잔여일수 : </h1>
				<input
					type="number"
					name="RemainDays"
					value={modalProduct.RemainDays || ''}
					onChange={handleEditChange}
					className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
				/>
			</div>
			<div className="flex items-center mb-1">
				<h1 className="font-bold mr-1 mb-1">휴가기간 : </h1>
				<input
					name="Period"
					value={modalProduct.Period || ''}
					onChange={handleEditChange}
					className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
				/>
			</div>
			<div className="flex items-center mb-1">
				<h1 className="font-bold mr-1 mb-1">휴가사유 : </h1>
				<textarea
					name="VacationReason"
					value={modalProduct.VacationReason || ''}
					onChange={handleEditChange}
					className="border border-gray-500 p-1 rounded-md shadow-md w-1/2 h-20"
				/>
			</div>
		</div>
	);
};

export default ModalVacation;
