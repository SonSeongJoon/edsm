import React from 'react';

const initAlternativeForm = {
	file: '대체휴무사용품의서',
	title: '',
	name: '',
	whatDate: '23년 00월 00일 00시~00시 (00시간)',
	whenDate: '23년 00월 00일 00시~00시 (00시간)',
	agree: [],
	agreeName: [],
};

const AlternativeForm = ({ product, handleChange }) => {
	return (
		<div className="max-w-screen-2xl mx-auto p-2">
			<div className="container border-gray-500 sm:p-2 md:p-2">
				<div className="header p-2 sm:flex-col md:flex-row">
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
					{/* Content Section */}
					<div className="mb-3">
						<div className="font-bold">휴무자</div>
						<input
							type="text"
							name="name"
							value={product.name || ''}
							className="w-full px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
							onChange={handleChange}
						/>
					</div>

					{/* Period Section */}
					<div className="mb-3">
						<div className="font-bold">초과근무 일시</div>
						<textarea
							name="period"
							value={product.whatDate || ''}
							className="w-full px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
							onChange={handleChange}
						/>
					</div>

					{/* Price Section */}
					<div className="mb-3">
						<div className="font-bold">대체휴무 일시</div>
						<input
							name="overReason"
							type="text"
							value={product.whenDate || ''}
							placeholder='개인별 매출 기여도 정리'
							className="w-full px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
							onChange={handleChange}
						/>
					</div>
					<div className='mt-2'>
						<ul>
							<li>* 대체휴무는 초과 근무일로부터 한 달 이내 사용합니다.</li>
							<li>* 초과근무의 최소 시간은 1시간입니다.</li>
							<li>* 대체휴무 시 지문인식 필수입니다.</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
export {AlternativeForm, initAlternativeForm};
