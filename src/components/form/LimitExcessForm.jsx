import React from 'react';
import moment from 'moment'; // moment 라이브러리를 가져옵니다.

const initLimitExcessForm = {
	file: '한도초과사전승인품의서',
	title: '한도초과사전승인품의서',
	content: '',
	price: '',
	startDate: '',
	agree: [],
	agreeName: [],
};

const LimitExcessForm = ({ product, handleChange }) => {
	const today = moment().format('YYYY-MM-DD');

	return (
		<div className="max-w-screen-lg mx-auto">
			<div className="container border-gray-500">
				<div className="header p-2 sm:flex-col md:flex-row">
					<div className='mb-3'>
						<span className="font-bold ">품의일자(고정) : </span>
						<span>{today}</span>
					</div>
					<div className="font-bold mr-3 mb-2 sm:mb-3 md:mb-0">제목</div>
					<input
						type="text"
						name="title"
						placeholder="제목입력"
						value={product.title || ''}
						className="w-full px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
						onChange={handleChange}
					/>
				</div>
				{/* Additional Info Section */}
				<div className="additional-info mt-5 p-2">
					<div className="mb-3">
						<div className="font-bold">지출날짜</div>
						<div className="flex items-center">
							<input
								type="date"
								name="startDate"
								value={product.startDate || ''}
								className="w-1/2 px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 mr-2"
								onChange={handleChange}
							/>
						</div>
					</div>

					{/* Content Section */}
					<div className="mb-3">
						<div className="font-bold">지출사유</div>
						<textarea
							name="content"
							placeholder="예시) 거래처 직원 식사대접"
							value={product.content || ''}
							className="w-full px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 h-24"
							onChange={handleChange}
						/>
					</div>



					{/* Price Section */}
					<div className="mb-3">
						<div className="font-bold">예상비용</div>
						<input
							name="price"
							type="text"
							placeholder="예시) 약 100,000 원"
							value={product.price || ''}
							className="w-full px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
							onChange={handleChange}

						/>
					</div>
				</div>
			</div>
		</div>
	);
};
export {LimitExcessForm, initLimitExcessForm};
