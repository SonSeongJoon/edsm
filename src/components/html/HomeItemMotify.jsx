import { useState } from 'react';
// d
export const HomeItemModify = ({
	                           item,
	                           idx,
	                           handleItemValue,
                           }) => {
	const [localItem, setLocalItem] = useState(item);

	const handleInputChange = (e, name) => {
		const updatedItem = { ...localItem, [name]: e.target.value };
		setLocalItem(updatedItem);
		handleItemValue(idx, updatedItem);
	};


	return (
		<>
			<table className="w-full border-collapse border border-gray-300 mt-2 text-center ">
				<thead>
				<tr>
					<th className="border border-gray-300 px-0.5 py-0.5">항 목</th>
					<th className="border border-gray-300 px-0.5 py-0.5">시 간</th>
					<th className="border border-gray-300 px-0.5 py-0.5">내 용</th>
					<th className="border border-gray-300 px-0.5 py-0.5">진행률</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td className="border border-gray-300 px-0.5 py-0.5">
						{idx + 1}항
					</td>
					<td className="border border-gray-300 px-0.5 py-0.5">
						<input
							type="text"
							value={localItem.title || ''}
							onChange={(e) => handleInputChange(e, 'title')}
							className="border border-gray-500 p-0.5 rounded-md shadow-md w-full"
						/>
					</td>
					<td className="border border-gray-300 px-0.5 py-0.5">
						<input
							type="text"
							value={localItem.amount || ''}
							onChange={(e) => handleInputChange(e, 'amount')}
							className="border border-gray-500 p-0.5 rounded-md shadow-md w-full"
						/>
					</td>
					<td className="border border-gray-300 px-0.5 py-0.5">
						<input
							type="text"
							value={localItem.percent || ''}
							onChange={(e) => handleInputChange(e, 'percent')}
							className="border border-gray-500 p-0.5 rounded-md shadow-md w-full"
						/>
					</td>
				</tr>
				</tbody>
			</table>
		</>
	);
};
