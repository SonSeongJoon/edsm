import React from 'react';

const CustomerShow = ({ product }) => {
	const {
		title,
		content,
		data,
		charge,
		price,
		dept,
		name,
		file,
		corporation,
	} = product;
	const date = new Date()
	.toLocaleDateString('ko-KR', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	})
	.replace(/. /g, '.');

	return (
		<div>
			<div className="w-full flex justify-between items-center mb-3">
				<h1 className="sm:text-2xl text-md font-bold">{title}</h1>
				<h1 className="text-xxm sm:text-md text-gray-500">{corporation}</h1>
			</div>
			<div className="flex items-center mb-3 justify-between mt-2">
				<div className="flex">
					<h1 className="text-xm sm:text-md text-gray-500 mr-2">{dept}</h1>
					<h1 className="text-xm sm:text-md text-gray-500">{name}</h1>
				</div>
				<div className="flex">
					<p className="text-xm sm:text-md text-gray-500  mr-2">{file}</p>
					<h1 className="text-gray-600 text-xm sm:text-md">{date}</h1>
				</div>
			</div>
			<div className="border p-2 rounded-lg border-gray-300">
				<div className="flex flex-col">
					<div className="flex">
						<h1 className="font-bold mr-2 sm:text-md text-xm">회사명 : </h1>
						<p
							className="text-gray-600 text-sm sm:text-md"
							dangerouslySetInnerHTML={{
								__html: content.replace(/\n/g, '<br />'),
							}}
						></p>
					</div>
					<div className="flex items-center mt-1">
						<h1 className="font-bold mr-2 sm:text-md text-xm">청구내역 : </h1>
						<p className="text-gray-600 text-sm sm:text-md">{data}</p>
					</div>
					<div className="flex items-center mt-1">
						<h1 className="font-bold mr-2 sm:text-md text-xm">사후청산수수료 적용 여부 : </h1>
						<p className="text-gray-600 text-sm sm:text-md">{charge}</p>
					</div>
					<div className="flex items-center mt-1">
						<h1 className="font-bold mr-2 sm:text-md text-xm">청구금액 : </h1>
						<p className="text-gray-600 text-sm sm:text-md">{price}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CustomerShow;
