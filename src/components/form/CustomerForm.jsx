import React from 'react';
import moment from 'moment'; // moment 라이브러리를 가져옵니다.

const initCustomerForm = {
	file: '고객사실비청구서',
	title: '',
	content: '',
	data: '',
	charge: '',
	price: '',
	agree: [],
	agreeName: [],
	agreeUid: [],
};

const CustomerForm = ({ product, handleChange }) => {
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
					<div className="font-bold mb-3">추가 정보</div>

					{/* Content Section */}
					<div className="mb-3">
						<div className="font-bold">회사명</div>
						<input
							type='text'
							name="content"
							placeholder="예시) 피엔에이치테크"
							value={product.content || ''}
							className="w-full px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
							onChange={handleChange}
						/>
					</div>
					<div className="mb-3">
						<div className="font-bold">청구내역</div>
						<input
							type='text'
							name="data"
							placeholder="예시) IPO 실비 및 IR북 인쇄비"
							value={product.data || ''}
							className="w-full px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
							onChange={handleChange}
						/>
					</div>
					<div className="mb-3">
						<div className="font-bold">사후정산수수료 적용 여부</div>
						<input
							type='text'
							name="charge"
							placeholder="예시) 부"
							value={product.charge || ''}
							className="w-full px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
							onChange={handleChange}
						/>
					</div>

					{/* Price Section */}
					<div className="mb-3">
						<div className="font-bold">청구금액</div>
						<input
							name="price"
							type="text"
							placeholder="6,600,000원 (VAT포함)"
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
export {CustomerForm, initCustomerForm};
