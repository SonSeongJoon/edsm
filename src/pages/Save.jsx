import React, {useEffect, useState} from 'react';
import PeperList from '../components/PaperList';

export default function Save() {
	const [stateFromChild, setStateFromChild] = useState(null);

	useEffect(() => {
		if (stateFromChild !== null) {
			// stateFromChild가 변경될 때마다 실행할 로직
		}
	}, [stateFromChild]);

	return (
		<div>
			<PeperList
				key={stateFromChild}
				category="승인"
				state="승인"
				adminData={false}
				setStateFromChild={setStateFromChild}
			/>
		</div>
	);
}
