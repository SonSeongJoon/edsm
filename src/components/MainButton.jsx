import React from 'react';

export default function MainButton({onclick}) {
	return (
		<button className='bg-brand w-[200px] text-xl font-md text-white rounded-md p-3 text-center' onClick={onclick}>
			+ 작 성 하 기
		</button>
	);
}
