import React from 'react';
import PeperList from "../components/PaperList";
import {useAuthContext} from "../context/AuthContext";

export default function MstPage() {
	const admin = useAuthContext();
	const uid = admin.user.uid;
	return (
		<div>
			<PeperList category='mst' state={uid} MstData={true}/>
		</div>
	);
}
