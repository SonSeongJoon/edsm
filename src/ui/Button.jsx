import React from 'react';

export default function Button({text, onClick}) {
	return (
		<button className='px-4 py-2 bg-brand text-xl font-bold text-white rounded-md' onClick={onClick}>
			{text}
		</button>
	);
}
