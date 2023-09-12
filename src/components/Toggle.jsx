import React from 'react';
import {useNavigate} from "react-router-dom";

const list = [
	{ name: '전체', path: 'total' },
	{ name: '대기', path: 'wait' },
	{ name: '완료', path: 'complete' }
];

export default function Toggle() {
	const navigate = useNavigate();

	const handleClick = (path) => {
		navigate(`/${path}`)
	}

	return (
		<div className='w-[200px]'>
			<div className='flex items-center'>
				<h3 className='text-2xl font-bold'>결재 문서</h3>
			</div>
			<ul className='mt-1'>
				{list.map((item) =>
					<li
						className='py-2 text-xl hover:bg-brand hover:opacity-60 rounded-lg hover:text-white cursor-pointer'
						onClick={() => handleClick(item.path)}
					>
						> {item.name}
					</li>
				)}
			</ul>
		</div>
	);
}
