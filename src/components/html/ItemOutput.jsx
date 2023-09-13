export const ItemOutput = ({ item, idx }) => {
	return (
		<table className="w-1/2 border-collapse border border-gray-300 mt-2 text-center">
			<thead>
			<tr>
				<th className="border border-gray-300 px-4 py-2 w-20">항 목</th>
				<th className="border border-gray-300 px-4 py-2 w-40">내 역</th>
				<th className="border border-gray-300 px-4 py-2 w-32">금 액</th>
				<th className="border border-gray-300 px-4 py-2 w-48">비 고</th>
			</tr>
			</thead>
			<tbody>
			<tr>
				<td className="border border-gray-300 px-4 py-2">{idx}항</td>
				<td className="border border-gray-300 px-4 py-2">{item.title}</td>
				<td className="border border-gray-300 px-4 py-2">{item.amount}</td>
				<td className="border border-gray-300 px-4 py-2">{item.note}</td>
			</tr>
			</tbody>
		</table>
	);
};
