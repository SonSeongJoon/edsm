import React from 'react';
import PeperList from "../components/PaperList";

export default function Wait() {
	return (
		<div>
			<PeperList category='대기' state='대기' adminData={false}/>
		</div>
	);
}
