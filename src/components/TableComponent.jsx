import React from 'react';
import PaperRow from './PaperRow';
export const TableComponent = ({ isLoading, error, currentItems, pageNumbers, currentPage, handlePageClick, isAmdins }) => {

	return (
		<div className="w-full">
			{isLoading && <p>Loading...</p>}
			{error && <p>Error...</p>}
			<table className="min-w-full bg-white border-t border-b border-gray-300 divide-y divide-gray-300">
				<thead>
				<tr>
					<th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
						제목
					</th>
					<th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
						구분
					</th>
					<th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
						날짜
					</th>
					<th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
						{isAmdins ? "읽음표시" : "상태" }
					</th>
				</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-300">
				{currentItems.map((product) => (
					<PaperRow key={product.id} product={product} />
				))}
				</tbody>
			</table>
			<div className='w-full flex justify-center mt-3'>
				{pageNumbers.map((number) => (
					<button
						className={`mr-5 text-lg font-bold text-center text-brand w-5 hover:underline 
      ${currentPage === number ? 'border border-brand rounded-full' : ''}`}
						key={number}
						onClick={() => handlePageClick(number)}
					>
						{number}
					</button>
				))}
			</div>
		</div>
	);
}
