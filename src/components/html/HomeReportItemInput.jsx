export const HomeReportItemInput = ({ item, updateItemValue, idx }) => {

	return (
		<>
			<div className="mr-2">
				<p className="ml-1">시 간</p>
				<input
					type="text"
					placeholder="예시) 8:30~11:00"
					className="lg:w-[200px] md:w-[200px] px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
					value={item.title || ''}
					onChange={(e) => updateItemValue(idx, 'title', e.target.value)}
				/>
			</div>
			<div className="mr-2">
				<p className="ml-1">내 용</p>
				<input
					type="text"
					placeholder="예시) A사 IPO 기사간담회 보도자료 작성"
					className="lg:w-[350px] md:w-[200px] px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
					value={item.amount || ''}
					onChange={(e) => updateItemValue(idx, 'amount', e.target.value)}
				/>
			</div>
			<div className="mr-2">
				<p className="ml-1 text-red-700 font-bold">진행률</p>
				<input
					type="text"
					className="lg:w-[70px] md:w-[200px] px-2 sm:px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
					value={item.percent || '%'}
					onChange={(e) => updateItemValue(idx, 'percent', e.target.value)}
				/>
			</div>
		</>
	);
};


