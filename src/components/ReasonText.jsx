import React, {useEffect, useState} from 'react';
import {getRejectReason} from "../api/firebase";

export default function ReasonText({fileId}) {
	const [reasonText, setReasonText] = useState(null);

	useEffect(() => {
		const fetchReason = async () => {
			const result = await getRejectReason(fileId);
			setReasonText(result);
		};

		fetchReason();
	}, [fileId]);

	return (
		<div className="space-y-4 mt-3">
			{reasonText && Object.entries(reasonText).map(([key, value]) => (
				<div key={key} className="p-4 border rounded-md shadow-sm bg-white">
					<h5 className="font-semibold mb-2">{key}</h5>
					<p>{value}</p>
				</div>
			))}
		</div>
	);
}



