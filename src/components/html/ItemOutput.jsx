export const ItemOutput = ({ item, idx }) => {
	return (
		<table className="w-full border-collapse border border-gray-300 mt-2 text-center text-sm">
			<thead>
			<tr>
				<th className="border border-gray-300 px-2 py-1 w-16">항 목</th>
				<th className="border border-gray-300 px-2 py-1 w-32">내 역</th>
				<th className="border border-gray-300 px-2 py-1 w-24">금 액</th>
				<th className="border border-gray-300 px-2 py-1 w-36">비 고</th>
			</tr>
			</thead>
			<tbody>
			<tr>
				<td className="border border-gray-300 px-2 py-1">{idx}항</td>
				<td className="border border-gray-300 px-2 py-1">{item.title}</td>
				<td className="border border-gray-300 px-2 py-1">{item.amount}</td>
				<td className="border border-gray-300 px-2 py-1">{item.note}</td>
			</tr>
			</tbody>
		</table>
	);
};
