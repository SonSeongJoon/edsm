import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function PaperList() {
	const { isLoading, error, data: papers } = useQuery(['papers'], async () => {
		const response = await axios.get(`/data/peper.json`);
		return response.data;
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div>
			<table className="w-10/12 text-lg border-b mx-auto">
				<thead>
				<tr className="border-b text-left">
					<th>문서번호</th>
					<th>제목</th>
					<th>기안자</th>
					<th>기안일</th>
					<th>구분</th>
					<th>상태</th>
				</tr>
				</thead>
				<tbody>
				{papers.map((paper) => (
					<tr key={paper.docNumber}>
						<td>{paper.docNumber}</td>
						<td>{paper.title}</td>
						<td>{paper.author}</td>
						<td>{paper.date}</td>
						<td>{paper.type}</td>
						<td>{paper.status}</td>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	);
}
