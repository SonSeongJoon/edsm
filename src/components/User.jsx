import React from 'react';

export default function User({user: {photoURL, displayName}}) {
	return (
		<div className='flex items-center mr-4'>
			<img className='w-10 h-10 rounded-full mr-2 border-4 border-brand' src={photoURL} alt={displayName}/>
			<span className='hidden md:block'>{displayName}</span>
		</div>
	);
}
