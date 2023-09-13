import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

const list = [
	{ name: '전체', path: 'total' },
	{ name: '대기', path: 'wait' },
	{ name: '완료', path: 'complete' }
];

export default function Toggle() {
	const navigate = useNavigate();
	const location = useLocation();

	const handleClick = (path) => {
		navigate(`/${path}`)
	}

	return (
		<div className='w-[200px]'>
			<div className='flex items-center'>
				<h3 className='text-xl font-bold'>결재 문서</h3>
			</div>
			<ul className='mt-1'>
				{list.map((item) =>
					<li
						className={`py-2 px-1 text-lg rounded-lg cursor-pointer 
                            ${location.pathname.includes(item.path) ? 'bg-brand opacity-60 text-white' : 'hover:bg-brand hover:bg-opacity-20 hover:text-black'}`}
						onClick={() => handleClick(item.path)}
					>
						{item.name}
					</li>
				)}
			</ul>
		</div>
	);
}
