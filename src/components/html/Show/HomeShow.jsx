import React from 'react';
import {HomeItemOutput} from "../HomeItemOutput";
import {useNavigate} from "react-router-dom";

const HomeShow = ({ product }) => {
	const {
		title,
		file,
		name,
		date,
		dept,
		corporation,
		items,
		workPlace,
		workDate,
		workTime,
		workHow,
	} = product;
	let count_agree = 0;
	for (let key in product.admitMember) {
		if (product.admitMember.hasOwnProperty(key)) {
			count_agree++;
		}
	}
	const count_member = product.agree.length;

	let allstate;
	if (count_member === count_agree) {
		allstate = 1;
	} else {
		allstate = 0;
	}

	console.log(allstate)





	const navigate = useNavigate();
	const handleWriteReportClick = () => {
		// Create a new object without the 'id' property
		const productWithoutId = { ...product };
		delete productWithoutId.id;

		// Navigate to the '/write' route with the modified product data as state
		navigate('/write', { state: { product: productWithoutId } });
	};

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
					<p className="text-xm sm:text-md text-gray-500 mr-2">{file}</p>
					 <h1 className="text-gray-600 text-xm sm:text-md">{date}</h1>
				</div>
			</div>
			<div className="flex flex-col text-sm">
				<div className="font-bold">근무 개요</div>
				<div className="grid grid-cols-2 " >
					<div>
						<div className="mt-2">근무 날짜</div>
						<p className="text-xm sm:text-md text-gray-500">{workDate}</p>
					</div>
					<div>
						<div className="mt-2">근무 장소</div>
						<p className="text-xm sm:text-md text-gray-500">{workPlace}</p>
					</div>
				</div>
				<div className="grid grid-cols-2">
					<div>
						<div className="mt-5">근무 시간</div>
						<p className="text-xm sm:text-md text-gray-500">{workTime}</p>
					</div>
					<div>
						<div>
							<div className="mt-5">근무 방법</div>
							<p className="text-xm sm:text-md text-gray-500">{workHow}</p>
						</div>
					</div>
				</div>
				<div className="flex flex-col font-bold w-full mt-5">
					<div>근무 내용(사전계획)</div>
					{items.map((item, idx) => (
						<div
							key={idx}
							className="flex flex-col sm:flex-row sm:items-center w-full"
						>
							<HomeItemOutput item={item} idx={idx + 1} />
						</div>
					))}
				</div>
				{allstate === 1 ? <div className='flex justify-end mt-3'>
					<button className='border border-red-500 px-2 py-1 rounded text-red-800 font-bold' onClick={handleWriteReportClick}>보고서 작성하기</button>
				</div> : null}
			</div>
		</div>
	);
};

export default HomeShow;
