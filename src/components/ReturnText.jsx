import React, { useState } from 'react';

export default function ReturnText() {
	const [reason, setReason] = useState('');

	const handleChange = (e) => {
		setReason(e.target.value);
	}

	return (
		<div className="p-4">
			<h1 className="text-xl font-bold mb-4">반려 사유 입력</h1>
			<div className="mb-2">
				<input
					type="text"
					id="reason"
					name="reason"
					value={reason}
					onChange={handleChange}
					placeholder="반려 사유를 입력하세요"
					className="mt-1 p-2 w-full border rounded-md"
				/>
			</div>
		</div>
	);
}
