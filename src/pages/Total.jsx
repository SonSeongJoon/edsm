import React from 'react';
import PeperList from "../components/PaperList";

export default function Total() {

	return (
		<div>
			<PeperList key='products' adminData={false}/>
		</div>
	);
}
