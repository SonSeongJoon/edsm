import React from 'react';

export const ModalAlternative = ({ modalProduct, handleEditChange }) => {
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
				<h1 className="font-bold mr-1 mb-1">초과근무 일시 1 : </h1>
				{/* Year (날짜) input */}
				<input
					type="date"
					name="whatYear"
					value={modalProduct.whatYear || ''}
					onChange={handleEditChange}
					className="border border-gray-500 p-1 rounded-md shadow-md w-1/2 mr-2"
				/>
				{/* Time (텍스트) input */}
				<input
					type="text"
					name="whatTime"
					value={modalProduct.whatTime || ''}
					onChange={handleEditChange}
					className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
				/>
			</div>
			<div className="flex items-center mb-1">
				<h1 className="font-bold mr-1 mb-1">초과근무 일시 2 : </h1>
				{/* Year (날짜) input */}
				<input
					type="date"
					name="whatYear2"
					value={modalProduct.whatYear2 || ''}
					onChange={handleEditChange}
					className="border border-gray-500 p-1 rounded-md shadow-md w-1/2 mr-2"
				/>
				{/* Time (텍스트) input */}
				<input
					type="text"
					name="whatTime2"
					value={modalProduct.whatTime2 || ''}
					onChange={handleEditChange}
					className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
				/>
			</div>
			<div className="flex items-center mb-1">
				<h1 className="font-bold mr-1 mb-1">초과근무 일시 3 : </h1>
				{/* Year (날짜) input */}
				<input
					type="date"
					name="whatYear3"
					value={modalProduct.whatYear3 || ''}
					onChange={handleEditChange}
					className="border border-gray-500 p-1 rounded-md shadow-md w-1/2 mr-2"
				/>
				{/* Time (텍스트) input */}
				<input
					type="text"
					name="whatTime3"
					value={modalProduct.whatTime3 || ''}
					onChange={handleEditChange}
					className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
				/>
			</div>
			<div className="flex items-center mb-1">
				<h1 className="font-bold mr-1 mb-1">대체휴무 일시 : </h1>
				{/* Year (날짜) input */}
				<input
					type="date"
					name="whenYear"
					value={modalProduct.whenYear || ''}
					onChange={handleEditChange}
					className="border border-gray-500 p-1 rounded-md shadow-md w-1/2 mr-2"
				/>
				{/* Time (텍스트) input */}
				<input
					type="text"
					name="whenTime"
					value={modalProduct.whenTime || ''}
					onChange={handleEditChange}
					className="border border-gray-500 p-1 rounded-md shadow-md w-1/2"
				/>
			</div>
		</div>
	);
};
