import React from 'react';

const initOvertimeForm = {
	file: '초과근무사전품의서',
	title: '',
	name: '',
	period: '23년 09월 25일 17:30~20:40 (총 2시간40분- 저녁시간 제외)',
	overReason: '',
	useWhen: '',
	agree: [],
	agreeName: [],
	agreeUid: [],
};

const OvertimeForm = ({ product, handleChange }) => {
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
						<div className="font-bold">근무자</div>
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
						<div className="font-bold">초과근무 예정 일시</div>
						<textarea
							name="period"
							value={product.period || ''}
							className="w-full px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
							onChange={handleChange}
						/>
					</div>

					{/* Price Section */}
					<div className="mb-3">
						<div className="font-bold">사 유</div>
						<input
							name="overReason"
							type="text"
							value={product.overReason || ''}
							placeholder='개인별 매출 기여도 정리'
							className="w-full px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
							onChange={handleChange}
						/>
					</div>

					{/* Note Section */}
					<div>
						<div className="font-bold">대체휴무 예정 일자</div>
						<input
							name="useWhen"
							value={product.useWhen || ''}
							type="text"
							placeholder='23년 10월 셋째주 사용예정'
							className="w-full px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
							onChange={handleChange}
						/>
					</div>
					<div className='mt-2'>
						<ul>
							<li>* 초과 근무는 1일 4시간 이내로 제한합니다. (4시간 이상은 금지)</li>
							<li>* 초과근무의 최소 시간은 1시간입니다. (식사 시간 제외)</li>
							<li>* 사전 품의 없이 초과근무를 하지 않습니다. (결재자 부재의 경우 사후 결재)</li>
							<li>* 경영지원팀에서는 초과근무 시간을 기록하고 대체휴무 사용 여부를 확인합니다.</li>
							<li>* 대체휴무는 초과 근무일로부터 한 달 이내 사용합니다.</li>
							<li>* 초과근무 시 지문인식 필수입니다.</li>

						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
export {OvertimeForm, initOvertimeForm};
