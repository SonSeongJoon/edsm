import React from 'react';

const initApprovalForm = {
	file: '품의서',
	title: '',
	detail: '',
	agree: [],
	agreeName: [],
};

const ApprovalForm = ({ product, handleChange }) => {
	return (
		<div className="max-w-screen-2xl mx-auto p-5">
			<div className="container border-gray-500 sm:p-2 md:p-5">
				<div className="header p-2 sm:flex-col md:flex-row">
					<div className="font-bold mr-3 mb-2 sm:mb-3 md:mb-0">제목</div>
					<input
						type="text"
						name="title"
						placeholder="제목입력"
						value={product.title}
						className="w-full px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
						onChange={handleChange}
					/>
				</div>
				<div className="content p-2">
					<div className="font-bold mt-5">상세 내용</div>
					<textarea
						name="detail"
						value={product.detail}
						placeholder="상세 내용을 입력하세요."
						className="w-[400px] h-[200px] px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
						onChange={handleChange}
					/>
				</div>
			</div>
		</div>
	);
};

export { ApprovalForm, initApprovalForm };
