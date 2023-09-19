import React from 'react';

export default function Button({text, onClick}) {
	return (
		<button className='px-3 py-1 bg-brand text-sm sm:text-lg font-bold text-white rounded-md' onClick={onClick}>
			{text}
		</button>
	);
}
