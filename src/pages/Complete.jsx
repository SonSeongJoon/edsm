import React from 'react';
import PeperList from "../components/PaperList";

export default function Complete() {
	return (
		<div>
			<PeperList category='products' state='완료' adminData={false}/>
		</div>
	);
}
