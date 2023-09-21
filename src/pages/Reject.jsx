import React from 'react';
import PeperList from "../components/PaperList";

export default function Reject() {
	return (
		<div>
			<PeperList category='반려' state='반려' adminData={false}/>
		</div>
	);
}
