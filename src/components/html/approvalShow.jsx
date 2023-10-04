import React from 'react';

const ApprovalShow = ({ product }) => {
	const { title, file, date, dept, detail, name } = product;

	return (
		<div>
			<div className="w-full flex justify-between items-center">
				<div className="flex items-center space-x-2">
					<h1 className="sm:text-2xl text-md font-bold">{title}</h1>
				</div>
			</div>
			<div className="flex items-center mb-3 justify-between">
				<div className='flex'>
					<p className="text-xm sm:text-md text-gray-500  mr-2">{file}</p>
					<h1 className="text-gray-600 text-xm sm:text-md">{date}</h1>
				</div>
				<div className="flex">
					<h1 className="text-xm sm:text-md text-gray-500 mr-2">{dept}</h1>
					<h1 className="text-xm sm:text-md text-gray-500">{name}</h1>
				</div>
			</div>
			<div className="flex flex-col header space-y-4 md:space-y-6 lg:space-y-8">
				<div className="flex items-center">
					<h1 className="font-bold mr-2 sm:text-md text-xm">상세 내용 : </h1>
					<p className="text-gray-600 text-sm sm:text-md">{detail}</p>
				</div>
			</div>
		</div>
	);
};

export default ApprovalShow;
